import { AccessMode } from "./access-mode";
import { Condition } from "./condition";
import { Disability } from "./disability";

export interface PatientProfile {
    id:                number;
    preferredLanguage: number;
    region:            string;
    hazardAvoidance:   number;
    name:              string;
    description:       string;
    accessMode:        AccessMode[];
    condition:         Condition[];
    disabilities:      Disability[];
}
