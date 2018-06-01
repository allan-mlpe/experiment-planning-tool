export class User {
  id: number;
  name: string;
  email: string;
  profileLink: string;
  workArea: string;
  institution: string;

  admin: boolean;
  collaborator: boolean;
  available: boolean;

  token: string;
}
