import { jwtDecode } from "jwt-decode";
export const userAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const decodedToken = jwtDecode(token);
  const userId = decodedToken?.id;
  
  return userId;
};
