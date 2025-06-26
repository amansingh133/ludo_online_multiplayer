export const config = {
  NAME: "Luri",
  BASE_URL: "https://p1.funnearn.com/",
  TYPE_OF_USER: 3749,
  VERSION: "1",
  TYPE: 2,
  CLINT_API_URL: "api/lagos/",
  TOKEN: null,

  get TOKEN() {
    // return localStorage.getItem("token");
    return null;
  },
};
