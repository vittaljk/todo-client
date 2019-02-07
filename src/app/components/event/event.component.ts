import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IEvent } from 'src/app/models/event';


@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    @Input() event: IEvent;
    @Output() deleteEventEmitter = new EventEmitter();
    @Output() editEventEmitter = new EventEmitter<IEvent>();

    constructor() { }

    ngOnInit() { }

    deleteEventHandler(): void {
        this.deleteEventEmitter.emit(this.event._id);
    }

    editEventHandler(): void {
        this.editEventEmitter.emit(this.event);
    }
}
