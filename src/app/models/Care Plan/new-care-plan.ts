export interface NewCarePlan {
    PatientProfile_oid?: number;
    Status:             number;
    Intent:             number;
    Title:              string;
    Modified:           Date;
    DurationDays:       number;
    Name:               string;
    Description:        string;
}
