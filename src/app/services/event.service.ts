import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    baseUrl = 'http://localhost:8080/api/events';

    constructor(private http: HttpClient) { }

    getEvents() {
        return this.http.get(this.baseUrl);
    }

    addEvent({ name, day }) {
        return this.http.post(this.baseUrl, {
            name,
            day
        }, {});
    }

    updateEvent({ name, day, id }) {
        return this.http.put(
            `${this.baseUrl}/${id}`,
            { name, day }
        );
    }

    deleteEvent(id) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
