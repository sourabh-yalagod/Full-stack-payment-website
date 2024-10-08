import { jwtDecode } from "jwt-decode";
export const userAuth = () => {
  const token = localStorage.getItem("token");
  let userId = null;
  if (!token) {
    return null;
  }
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp / 1000 > new Date().valueOf() / 1000000) {
    userId = decodedToken?.id;
  }

  return userId;
};
