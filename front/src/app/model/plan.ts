import {User} from "./user";
import {PlanState} from "./plan-state.enum";

export class Plan {
    id: number;
    name: string;
    description: string;
    planDetails: string;
    planCharacteristics: string;
    planThreats: string;
    planActions: string;
    planActionRelatedThreats: string;
    version: string;
    author: User;
    collaborators: Array<User>;
    state: PlanState;
    privacySetting: string;
    archived: boolean;
    date: Date;

    constructor() {}
}
