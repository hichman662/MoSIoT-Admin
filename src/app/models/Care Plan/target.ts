import { Measure } from "./measure";

export interface Target {
    id:           number;
    desiredValue: string;
    description:  string;
    dueDate:      Date;
    measure?:     Measure;
}
