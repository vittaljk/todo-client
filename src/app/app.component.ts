import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventService } from './event.service';
import { DaysOfTheWeek } from './model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    // reference to input element to set focus on update
    @ViewChild('eventInput') el: ElementRef;
    // array of days in a week
    daysOfTheWeek = DaysOfTheWeek;
    // form to capture event data for update and add operations
    eventForm: FormGroup;
    // to store event from backend
    event: object;
    // to indicate selected day of the week, by default its current day
    selectedDay = DaysOfTheWeek[new Date().getDay()];
    // operation performed, its used while submitting add and update data
    action = 'ADD';
    // to capture selected event to perform update operation
    selectedEvent: string;
    // to handle ui spinner
    showSpinner = false;

    constructor(
        private eventService: EventService,
        private snackBar: MatSnackBar
    ) {
        this.eventForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit(): void {
        this.initializeEvents();
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
     * updateEventHandler
     * @param id
     * @param day
     * @param eventObj
     * @param name
     * listens to edit icon click on each event and sets actionm selected event and selected day
     */

    updateEventHandler(id: string, day: string, eventObj, name): void {
        eventObj.stopPropagation();
        this.eventForm.controls['name'].patchValue(name);
        this.el.nativeElement.focus();
        this.action = 'UPDATE';
        this.selectedEvent = id;
        this.selectedDay = day;
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
                    res => {
                        this.showToast(res['message']);
                        this.initializeEvents();
                        this.eventForm.reset();
                        this.showSpinner = false;
                    },
                    () => {
                        this.showToast('Something went wrong');
                        this.showSpinner = false;
                    }
                );
        } else {
            this.showToast('Event name is required to add');
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
                day: this.selectDay,
                id: this.selectedEvent
            };
            this.showSpinner = true;
            this.eventService.updateEvent(event)
                .subscribe(
                    res => {
                        this.showToast(res['message']);
                        this.initializeEvents();
                        this.eventForm.reset();
                        this.showSpinner = false;
                    },
                    () => {
                        this.showToast('Something went wrong');
                        this.showSpinner = false;
                    }
                );
        } else {
            this.showToast('Event name is required to update');
        }
    }

    /**
     * deleteEvent
     * @param id
     * @param eventObj
     * this methods calls deleteEvent from event service
     */
    deleteEvent(id: string, eventObj): void {
        eventObj.stopPropagation();
        this.showSpinner = true;
        this.eventService.deleteEvent(id)
            .subscribe(
                res => {
                    this.showToast(res['message']);
                    this.initializeEvents();
                    this.showSpinner = false;
                },
                () => {
                    this.showToast('Something went wrong');
                    this.showSpinner = false;
                }
            );
    }

    /**
     * showToast
     * @param message
     * @param horizontalPosition
     * @param verticalPosition
     * @param duration
     * this method is used to show warning messages
     */
    showToast(
        message: string,
        horizontalPosition: MatSnackBarHorizontalPosition = 'center',
        verticalPosition: MatSnackBarVerticalPosition = 'bottom',
        duration = 5000) {
        this.snackBar.open(message, null, { duration, horizontalPosition, verticalPosition });
    }
}
