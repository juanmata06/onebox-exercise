import { Component, OnInit } from "@angular/core";
import { iEvent } from "src/app/logic/models/iEvent";
import { EventsService } from "src/app/logic/services/events.service";

@Component({
  selector: 'app-billboard-screen',
  templateUrl: './billboard-screen.component.html',
  styleUrls: ['./billboard-screen.component.scss']
})
export class BillboardScreenComponent implements OnInit {

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * GENERAL VARS FOR COMPONENT
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  events: iEvent[] = [];

  /**
   * -----------------------------------------------------------------------------------------------------------------------------
   * LYFECYCLE METHODS
   * -----------------------------------------------------------------------------------------------------------------------------
   */
  constructor(
    private _eventsService: EventsService
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PRIVATE METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
  private getEvents(): iEvent[] {
    this._eventsService.getEvents().subscribe((response: iEvent[]) => {
      if (!response)
        return
      console.log(response);
      
      this.events = response.sort((a: any, b: any) => {
        return a.endDate - b.endDate;
      });
    });
    return [];
  }
  
  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */

  /**
  * ------------------------------------------------------------------------------------------------------------------------------
  * PUBLIC VALIDATIONS METHODS
  * ------------------------------------------------------------------------------------------------------------------------------
  */
}
