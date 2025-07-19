export interface NewMedication {
    careActivity_oid: number;
    productReference: number;
    name:             string;
    manufacturer:     string;
    description:      string;
    dosage:           string;
    form:             number;
    medicationCode:   string;
}
