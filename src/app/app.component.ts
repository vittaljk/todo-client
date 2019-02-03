import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { DaysOfTheWeek } from './model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    daysOfTheWeek = DaysOfTheWeek;
    events;

    constructor(private eventService: EventService) { }

    ngOnInit(): void {
        this.eventService.getEvents()
            .subscribe(events => {
                this.events = events;
            });
    }

    addEventToDay(day): void {
        const event = {
            name: 'event',
            day
        };
        this.eventService.addEvent(event)
            .subscribe(
                res => console.log('data', res),
                err => console.log('error', err)
            );
    }

    updateEvent(id: string, day: string, eventObj): void {
        eventObj.stopPropagation();
        const event = {
            name: 'updated event',
            day,
            id
        };
        this.eventService.updateEvent(event)
            .subscribe(
                res => console.log(res),
                err => console.log(err)
            );
    }

    deleteEvent(id: string, eventObj): void {
        eventObj.stopPropagation();
        this.eventService.deleteEvent(id)
            .subscribe(
                res => console.log(res),
                err => console.log(err)
            );
    }
}
