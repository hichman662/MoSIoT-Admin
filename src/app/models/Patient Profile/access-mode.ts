import { AdaptationType } from "./adaptation-type";
import { AdaptationDetail } from "./adaptation-detail";
import { AdaptationRequest } from "./adaptation-request";

export interface AccessMode {
    id:                number;
    typeAccessMode:    number;
    description:       string;
    name:              string;
    adaptationType?:    AdaptationType[];
    adaptationDetail?:  AdaptationDetail[];
    adaptationRequest?: AdaptationRequest[];
}
