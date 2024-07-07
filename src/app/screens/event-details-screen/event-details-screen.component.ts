import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReplaySubject, takeUntil } from "rxjs";
import { iCartItem } from "src/app/logic/models/iCartItem";
import { iDateSelected } from "src/app/logic/models/iDateSelected";
import { iEventDetail } from "src/app/logic/models/iEventDetail";
import { iSession } from "src/app/logic/models/iSession";
import { EventsService } from "src/app/logic/services/events.service";
import { ShoppingCartService } from "src/app/logic/services/shopping-cart.service";

@Component({
  selector: 'app-event-details-screen',
  templateUrl: './event-details-screen.component.html',
  styleUrls: ['./event-details-screen.component.scss']
})
export class EventDetailsScreenComponent implements OnInit {

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * General vars for component
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  id: string = '';
  eventDetail!: iEventDetail;
  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);
  cart: iCartItem[] = [];

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  constructor(
    private _eventsService: EventsService,
    private _shoppingCartService: ShoppingCartService,
    private _route: ActivatedRoute,
  ) {
    this.subscribeToShoppingCart();
  }

  ngOnInit(): void {
    this.id = this._route.snapshot.params["id"];
    this.getEventDetail();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PRIVATE METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  private subscribeToShoppingCart(): void {
    this._shoppingCartService.cart$.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (response: any) => {
        if ((response)) {
          this.cart = response;
          console.log(this.cart);
        }
      }
    });
  }

  private getEventDetail(): void {
    this._eventsService.getEventDetail(this.id).subscribe((response: any) => {
      if (!response)
        return
      this.eventDetail = response;
      this.eventDetail['sessions'] = this.eventDetail.sessions?.sort((a: iSession, b: iSession) => {
        return parseInt(a.date) - parseInt(b.date);
      });
    });
  }

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  public getSessionsInCartByDate(sessionDate: string): number {
    var eventIndex = this.cart?.findIndex((item: iCartItem) => item.event.id == this.eventDetail.event.id);
    var dateIndex = this.cart?.[eventIndex]?.datesSelected.findIndex((item: iDateSelected) => item.date == sessionDate);
    return this.cart?.[eventIndex]?.datesSelected?.[dateIndex]?.quantity || 0;
  }

  public addSessionItemToCart(session: iSession) {
    if (parseInt(session.availability) <= this.getSessionsInCartByDate(session.date)) {
      alert("No hay más entradas disponibles para comprar.");
      return;
    }

    var eventIndex = this.cart?.findIndex((item: iCartItem) => item.event.id == this.eventDetail.event.id);
    var dateIndex = this.cart?.[eventIndex]?.datesSelected.findIndex((item: iDateSelected) => item.date == session.date);
    if (eventIndex >= 0) {
      if (dateIndex >= 0)
        this.cart[eventIndex].datesSelected[dateIndex].quantity++;
      else
        this.cart[eventIndex].datesSelected.push({ date: session.date, quantity: 1 });
      this._shoppingCartService.cart = this.cart;
    } else {
      this.cart.push({ event: this.eventDetail.event, datesSelected: [{ date: session.date, quantity: 1 }] });
      this._shoppingCartService.cart = this.cart;
    }
  }

  public removeSessionItemFromCart(session: iSession) {
    if (this.getSessionsInCartByDate(session.date) == 0)
      return;

    var eventIndex = this.cart?.findIndex((item: iCartItem) => item.event.id == this.eventDetail.event.id);
    var dateIndex = this.cart?.[eventIndex]?.datesSelected.findIndex((item: iDateSelected) => item.date == session.date);

    if (this.cart[eventIndex].datesSelected[dateIndex].quantity > 0)
      this.cart[eventIndex].datesSelected[dateIndex].quantity--;

    if (this.cart[eventIndex].datesSelected[dateIndex].quantity <= 0)
      this.cart[eventIndex].datesSelected.splice(dateIndex, 1);

    if (this.cart[eventIndex].datesSelected.length <= 0)
      this.cart.splice(eventIndex, 1);

    this._shoppingCartService.cart = this.cart;
  }
  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC VALIDATIONS METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
}