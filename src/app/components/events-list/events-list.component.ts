import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { DaysOfTheWeek } from 'src/app/models/model';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
    // to store event from backend
    event: object;
    // array of days in a week
    daysOfTheWeek = DaysOfTheWeek;

    constructor( private eventService: EventService) { }

    ngOnInit() {
        /**
         * load events initially
         */
        this.initializeEvents();
    }

    /**
     * initializeEvents
     * loads events trough eventService
     */
    initializeEvents(): void {
        this.eventService.getEvents()
            .subscribe(
                event => {
                    this.event = event;
                    console.log('inside list component', this.event);
                },
            );
    }
}
