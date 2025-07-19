export interface NewGoal {
    carePlanTemplate_oid: number;
    priority:             number;
    status:               number;
    condition_oid:        number;
    description:          string;
    category:             number;
    outcomeCode:          string;
    name:                 string;
}
