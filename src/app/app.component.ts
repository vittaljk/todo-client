import { Component } from '@angular/core';
import { EventData } from './model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    events: Array<EventData> = [
        {
            day: 'Monday',
            events: ['Event 1', 'Event 2', 'Event 3', 'Event 4']
        },
        {
            day: 'Tuesday',
            events: ['Event 1', 'Event 2', 'Event 3']
        },
        {
            day: 'Wednesday',
            events: ['Event 1', 'Event 2']
        },
        {
            day: 'Thursday',
            events: ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5']
        },
        {
            day: 'Friday',
            events: ['Event 1', 'Event 2', 'Event 3']
        },
        {
            day: 'Saturday',
            events: ['Event 1']
        },
        {
            day: 'Sunday',
            events: ['Event 1']
        },
    ];
}
