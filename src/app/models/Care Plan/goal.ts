import { Target } from "./target";

export interface Goal {
    id:          number;
    priority:    number;
    status:      number;
    description: string;
    category:    number;
    outcomeCode: string;
    name:        string;
    targets?:    Target[];
}
