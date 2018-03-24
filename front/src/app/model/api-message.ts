export class ApiMessage {
  status: number;
  message: string;
  statusText: string;

  constructor(status: number, message: string, statusText: string) {
    this.status = status;
    this.message = message;
    this.statusText = statusText;
  }
}
