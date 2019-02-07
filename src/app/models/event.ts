export interface IEvent {
    _id: string;
    day: string;
    name: string;
    created: string;
}

export type EventAction = 'ADD' | 'UPDATE' | 'DELETE';

export const DaysOfTheWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
