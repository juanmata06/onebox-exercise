import { Component, OnInit } from "@angular/core";
import { ReplaySubject, takeUntil } from "rxjs";
import { iCartItem } from "src/app/logic/models/iCartItem";
import { iDateSelected } from "src/app/logic/models/iDateSelected";
import { ShoppingCartService } from "src/app/logic/services/shopping-cart.service";

@Component({
  selector: 'app-shopping-cart-view',
  templateUrl: './shopping-cart-view.component.html',
  styleUrls: ['./shopping-cart-view.component.scss']
})
export class ShoppingCartViewComponent implements OnInit {

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * General vars for component
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  private _unsubscribeAll: ReplaySubject<boolean> = new ReplaySubject(1);
  cart: iCartItem[] = [];

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  constructor(
    private _shoppingCartService: ShoppingCartService
  ) {
    this.subscribeToShoppingCart();
  }

  ngOnInit(): void { }

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
        }
      }
    });
  }

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */

  public deleteDateItems(id: string, date: string): void {
    var eventIndex = this.cart?.findIndex((item: iCartItem) => item.event.id == id);
    var dateIndex = this.cart?.[eventIndex]?.datesSelected.findIndex((item: iDateSelected) => item.date == date);

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
