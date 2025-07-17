export interface NewCareActivity {
    CarePlanTemplate_oid: number;
    Periodicity:          number;
    Description:          string;
    Duration:             number;
    Location:             string;
    OutcomeCode:          string;
    TypeActivity:         number;
    ActivityCode:         string;
    Name:                 string;
}
