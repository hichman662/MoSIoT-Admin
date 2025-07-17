import { Telemetry } from "../Device Template/telemetry";

export interface Measure {
    Id:                 number;
    Name:               string;
    Description:        string;
    LOINCcode:          string;
    TelemetriesMeasure: Telemetry[];
}
