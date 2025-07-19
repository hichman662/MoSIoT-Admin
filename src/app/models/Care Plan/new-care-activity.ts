export interface NewCareActivity {
    carePlanTemplate_oid: number;
    periodicity:          number;
    description:          string;
    duration:             number;
    location:             string;
    outcomeCode:          string;
    typeActivity:         number;
    activityCode:         string;
    name:                 string;
}
