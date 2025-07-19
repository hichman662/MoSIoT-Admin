export interface NewCarePlan {
    patientProfile_oid?: number;
    status:             number;
    intent:             number;
    title:              string;
    modified:           Date;
    durationDays:       number;
    name:               string;
    description:        string;
}
