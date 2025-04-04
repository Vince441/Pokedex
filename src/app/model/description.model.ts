import { DescriptionDetail } from "./description-details.model";

export interface Description {
    id: number;
    name: string;
    flavor_text_entries: DescriptionDetail[];
}