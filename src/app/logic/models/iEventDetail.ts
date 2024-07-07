import { iEvent } from "./iEvent";
import { iSession } from "./iSession";

export interface iEventDetail {
  event: iEvent;
  sessions: iSession[];
}