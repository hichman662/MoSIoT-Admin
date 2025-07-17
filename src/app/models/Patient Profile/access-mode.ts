import { AdaptationType } from "./adaptation-type";
import { AdaptationDetail } from "./adaptation-detail";
import { AdaptationRequest } from "./adaptation-request";

export interface AccessMode {
    Id:                number;
    TypeAccessMode:    number;
    Description:       string;
    Name:              string;
    AdaptationType?:    AdaptationType[];
    AdaptationDetail?:  AdaptationDetail[];
    AdaptationRequest?: AdaptationRequest[];
}
