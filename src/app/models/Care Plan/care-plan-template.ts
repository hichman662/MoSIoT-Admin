import { Condition } from "../Patient Profile/condition";
import { PatientProfile } from "../Patient Profile/patient-profile";
import { CareActivity } from "./care-activity";
import { Goal } from "./goal";

export interface CarePlanTemplate {
    Id:                 number;
    Status:             number;
    Intent:             number;
    Title:              string;
    Modified:           Date;
    DurationDays:       number;
    Name:               string;
    Description:        string;
    CareActivities?:    CareActivity[];
    Goals?:             Goal[];
    Patient?:           PatientProfile;
    AddressConditions?: Condition[];
}
