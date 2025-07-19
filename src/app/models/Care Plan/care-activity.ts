import { Appointment } from "./appointment";
import { Medication } from "./medication";
import { NutritionOrder } from "./nutrition-order";

export interface CareActivity {
    id:              number;
    periodicity:     number;
    description:     string;
    duration:        number;
    location:        string;
    typeActivity:    number;
    name:            string;
    medications?:     Medication;
    nutritionOrders?: NutritionOrder;
    appointments?:    Appointment;
}
