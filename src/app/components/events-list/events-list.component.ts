import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { DaysOfTheWeek, EventAction, IEvent } from 'src/app/models/event';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'underscore';

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
    // to handle ui spinner
    showSpinner = false;

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
     * selectDay
     * @param day
     * sets selected day and action
     */
    selectDay(day): void {
        this.selectedDay = day;
        this.action = 'ADD';
        this.el.nativeElement.focus();
    }

    /**
     * initializeEvents
     * loads events trough eventService
     */
    initializeEvents(): void {
        this.showSpinner = true;
        this.eventService.getEvents()
            .subscribe(
                event => {
                    this.event = event;
                    this.showSpinner = false;
                },
                () => this.showSpinner = false
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
            this.showSpinner = true;
            this.eventService.addEvent(event)
                .subscribe(
                    (resEvent: IEvent) => {
                        if (resEvent) {
                            this.event[this.selectedDay].push(resEvent);
                        }
                        this.eventForm.reset();
                        this.showSpinner = false;
                    },
                    () => {  this.showSpinner = false; }
                );
        } else {
            console.log('Event name is required to add');
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
            this.showSpinner = true;
            this.eventService.updateEvent(event)
                .subscribe(
                    res => {
                        const updateAt = _.findIndex(this.event[event.day], { _id: event.id });
                        (this.event[event.day][updateAt] as IEvent).name = event.name;
                        this.eventForm.reset();
                        this.showSpinner = false;
                    },
                    () => {
                        this.showSpinner = false;
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
    deleteEventHandler(event: IEvent): void {
        this.showSpinner = true;
        this.eventService.deleteEvent(event._id)
            .subscribe(
                res => {
                    const deleteAt = _.findIndex(this.event[event.day], event._id);
                    this.event[event.day].splice(deleteAt, 1);
                    this.showSpinner = false;
                },
                () => { this.showSpinner = false; }
            );
    }
}
