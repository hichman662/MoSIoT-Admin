export interface Command {
    id:            number;
    name:          string;
    isSynchronous: boolean;
    type:          number;
    description:   string;
}
