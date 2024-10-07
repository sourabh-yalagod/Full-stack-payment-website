class ApiError extends Error {
  constructor(statusCode = 500, message = "Internl Server Error") {
    super(message);
    this.statusCode = statusCode;
  }
}
export default ApiError;
