import { StateDevice } from "./state-device";
export interface State {
    Id:     number;
    Name:   string;
    States: StateDevice[];
}
