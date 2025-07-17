import { Sensor } from "./sensor";
import { State } from "./state";
import { Event } from "./event";
import { Location } from "./location";

export interface Telemetry {
    Id:        number;
    Frecuency: number;
    Schema:    number;
    Unit:      number;
    Name:      string;
    Type:      number;
    Sensor?:    Sensor;
    State?:     State;
    Location?:  Location;
    Event_?:    Event;
}
