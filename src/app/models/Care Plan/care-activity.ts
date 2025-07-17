import { Appointment } from "./appointment";
import { Medication } from "./medication";
import { NutritionOrder } from "./nutrition-order";

export interface CareActivity {
    Id:              number;
    Periodicity:     number;
    Description:     string;
    Duration:        number;
    Location:        string;
    TypeActivity:    number;
    Name:            string;
    Medications?:     Medication;
    NutritionOrders?: NutritionOrder;
    Appointments?:    Appointment;
}
