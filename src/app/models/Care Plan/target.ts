import { Measure } from "./measure";

export interface Target {
    Id:           number;
    DesiredValue: string;
    Description:  string;
    DueDate:      Date;
    Measure?:     Measure;
}
