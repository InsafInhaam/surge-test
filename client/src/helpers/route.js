import { isAuthenticated } from "../helpers/auth";

export const redirectRoute = () => {
  if (isAuthenticated() && isAuthenticated().accountType === 1) {
    navigate("/admin/dashboard");
  } else if (isAuthenticated() && isAuthenticated().accountType === 0) {
    navigate("/user/dashboard");
  } else {
    navigate("/");
  }
};
