export const prepareHeaders = (headers) => {
  headers.set("Content-Type", "application/x-www-form-urlencoded");
  return headers;
};
