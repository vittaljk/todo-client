import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    daysOfTheWeek = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];

    events: any;

    constructor(private eventService: EventService) { }

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

    ngOnInit(): void {
        this.eventService.getEvents()
            .subscribe(events => {
                this.events = events;
            });
    }
}
