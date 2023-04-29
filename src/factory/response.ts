export class ResponseClass {
  constructor() {}

  sendResponse(message: string);
  sendResponse(message: string, data: any);
  sendResponse(message: string, date: any, statusCode: number);
  sendResponse(message: string, data?: any, statusCode?: number) {
    if (!data && !statusCode) return { message };
    if (!data) return { message, statusCode };
    if (!statusCode)
      return {
        message,
        data: {
          length: data.length,
          data,
        },
      };
    return {
      message,
      data: {
        length: data.length,
        data,
      },
      statusCode,
    };
  }
}
