import { Sensor } from "./sensor";
import { State } from "./state";
import { Event } from "./event";
import { Location } from "./location";

export interface Telemetry {
    id:        number;
    frecuency: number;
    schema:    number;
    unit:      number;
    name:      string;
    type:      number;
    sensor?:    Sensor;
    state?:     State;
    location?:  Location;
    event_?:    Event;
}
