import {User} from "./user";

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
    hasChild: boolean;
    collaborators: Array<User>;
    state: any;
    privacySetting: string;
    archived: boolean;
    date: Date;
    custom: boolean;
    fileName: string;

    constructor() {}
}
