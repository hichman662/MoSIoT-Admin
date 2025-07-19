import { Condition } from "../Patient Profile/condition";
import { PatientProfile } from "../Patient Profile/patient-profile";
import { CareActivity } from "./care-activity";
import { Goal } from "./goal";

export interface CarePlanTemplate {
    id:                 number;
    status:             number;
    intent:             number;
    title:              string;
    modified:           Date;
    durationDays:       number;
    name:               string;
    description:        string;
    careActivities?:    CareActivity[];
    goals?:             Goal[];
    patient?:           PatientProfile;
    addressConditions?: Condition[];
}
