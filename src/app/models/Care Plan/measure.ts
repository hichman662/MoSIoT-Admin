import { Telemetry } from "../Device Template/telemetry";

export interface Measure {
    id:                 number;
    name:               string;
    description:        string;
    lOINCcode:          string;
    telemetriesMeasure: Telemetry[];
}
