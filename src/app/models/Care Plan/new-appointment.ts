export interface NewAppointment {
    Id:               number;
    IsVirtual:        boolean;
    Description:      string;
    Direction:        string;
    ReasonCode:       string;
    CareActivity_oid: number;
}
