import { StateDevice } from "./state-device";
export interface State {
    id:     number;
    name:   string;
    states: StateDevice[];
}
