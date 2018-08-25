import {User} from "./user";

export class Plan {
    id: number;
    name: string;
    description: string;
    details: string;
    characteristics: string;
    threats: string;
    actions: string;
    actionRelatedThreats: string;
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
    customThreats: string;

    constructor() {}
}
