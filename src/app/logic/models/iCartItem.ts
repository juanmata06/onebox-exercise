import { iDateSelected } from "./iDateSelected";
import { iEvent } from "./iEvent";

export interface iCartItem {
  event: iEvent;
  datesSelected: iDateSelected[];
}