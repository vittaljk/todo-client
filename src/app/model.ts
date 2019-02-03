export type dayOfTheWeek =
    'Monday' |
    'Tuesday' |
    'Wednesday' |
    'Thursday' |
    'Friday' |
    'Saturday' |
    'Sunday';

export interface EventData {
    day: dayOfTheWeek;
    events: Array<string>;
}
