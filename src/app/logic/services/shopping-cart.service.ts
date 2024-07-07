import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {

  constructor() { }

  private _cart: BehaviorSubject<any> = new BehaviorSubject<any>(undefined!);

  set cart(value: any) {
    this._cart.next(value);
  }

  get cart$(): Observable<any> {
    return this._cart.asObservable();
  }
}