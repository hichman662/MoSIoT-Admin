import { AccessMode } from "./access-mode";
import { Condition } from "./condition";
import { Disability } from "./disability";

export interface PatientProfile {
    Id:                number;
    PreferredLanguage: number;
    Region:            string;
    HazardAvoidance:   number;
    Name:              string;
    Description:       string;
    AccessMode:        AccessMode[];
    Condition:         Condition[];
    Disabilities:      Disability[];
}
