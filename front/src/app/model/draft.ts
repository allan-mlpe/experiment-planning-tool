import {User} from "./user";

export class Draft {
  id: number;
  name: string;
  description: string;
  characteristics: string;
  threats: string;
  actions: string;
  actionRelatedThreats: string;
  author: User;
  draftType;

  constructor() {}
}
