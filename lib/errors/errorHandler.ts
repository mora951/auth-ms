function makeError(message: string, status: number) {
  const error = new Error();
  error.message = message;

  return { ...error, status };
}

export { makeError };
