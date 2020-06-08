export class ApiResponse {
  status;
  message;
  result;

  constructor(status, message, result) {
      this.status = status;
      this.message = message;
      this.result = result;
  }
}