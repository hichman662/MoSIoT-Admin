import { Target } from "./target";

export interface Goal {
    Id:          number;
    Priority:    number;
    Status:      number;
    Description: string;
    Category:    number;
    OutcomeCode: string;
    Name:        string;
    Targets?:    Target[];
}
