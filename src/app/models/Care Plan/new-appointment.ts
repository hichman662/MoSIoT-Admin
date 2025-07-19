export interface NewAppointment {
    id:               number;
    isVirtual:        boolean;
    description:      string;
    direction:        string;
    reasonCode:       string;
    careActivity_oid: number;
}
