import {User} from "./user";

export class Plan {
    id: number;
    name: string;
    description: string;
    planDetails: string;
    version: string;
    author: User;
    collaborators: Array<User>;
    state: string;
    privacySetting: string;
    archived: boolean;
    date: Date;

    lastModification: string;
    threatList: Array<any> = null;
    actionList: Array<any> = null;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;

        const auxDate = new Date();
        this.lastModification = `${auxDate.getMonth()+1}/${auxDate.getDate()}/${auxDate.getFullYear()}`;
    }

    public setThreatList(threatList: Array<any>): void {
        this.threatList = threatList;
    }

    public getThreatList(): Array<any> {
        return this.threatList;
    }

    public setActionList(actionList: Array<any>): void {
        this.actionList = actionList;
    }

    public getActionList(): Array<any> {
        return this.actionList;
    }
}
