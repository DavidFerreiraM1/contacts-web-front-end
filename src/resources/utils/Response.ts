
class Response <T> {
  constructor(
     public success: boolean, public data: T | null, public msg: string[],
  ) {
    this.success = success;
    this.msg = msg;
    this.data = data;
  }
}

export default Response;
