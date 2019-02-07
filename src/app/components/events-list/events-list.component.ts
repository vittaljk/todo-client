import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { DaysOfTheWeek, EventAction, IEvent } from 'src/app/models/event';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    // actions type
    action: EventAction = 'ADD';
    // to indicate selected day of the week, by default its current day
    selectedDay = DaysOfTheWeek[new Date().getDay()];
    // to capture selected event to perform update operation
    selectedEvent: string;
    // form to capture event data for update and add operations
    eventForm: FormGroup;
    // reference to input element to set focus on update
    @ViewChild('eventInput') el: ElementRef;

    constructor(private eventService: EventService) {
        this.eventForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
        });
    }

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
                },
            );
    }

    /**
     * updateEvent
     * @param event
     * this methods updates event  calling event service deleteEvent method
     */
    updateEventHandler(event: IEvent): void {
        this.eventForm.controls['name'].patchValue(event.name);
        this.el.nativeElement.focus();
        this.action = 'UPDATE';
        this.selectedEvent = event._id;
        this.selectedDay = event.day;
    }

    /**
     * handleFormSubmit
     * handler for form submit
     */
    handleFormSubmit(): void {
        switch (this.action) {
            case 'ADD':
                this.addEventToDay();
                break;

            case 'UPDATE':
                this.updateEvent();
                break;

            default:
                break;
        }
    }

        /**
     * addEventToDay
     * this methods calls addEvent from event service
     */
    addEventToDay(): void {
        if (this.eventForm.valid) {
            const event = {
                name: this.eventForm.value.name.trim(),
                day: this.selectedDay
            };
            this.eventService.addEvent(event)
                .subscribe(
                    res => {
                        this.initializeEvents();
                        this.eventForm.reset();
                    },
                    () => { }
                );
        } else {
            console.log('Event name is required to add')
        }
    }

    /**
     * updateEvent
     * this methods calls updateEvent from event service
     */
    updateEvent(): void {
        if (this.eventForm.valid) {
            const event = {
                name: this.eventForm.value.name,
                day: this.selectedDay,
                id: this.selectedEvent
            };
            this.eventService.updateEvent(event)
                .subscribe(
                    res => {
                        this.initializeEvents();
                        this.eventForm.reset();
                    },
                    () => {
                        console.log('Something went wrong');
                    }
                );
        } else {
            console.log('Event name is required to update');
        }
    }

    /**
     * deleteEvent
     * @param id
     * this methods calls deleteEvent calling event service deleteEvent method
     */
    deleteEventHandler(id: string): void {
        this.eventService.deleteEvent(id)
            .subscribe(
                res => {
                    this.initializeEvents();
                },
                () => { }
            );
    }
}