import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { log } from "util";

function Authentication() {
  const { loginUserDetails } = useSelector(
    (store) => store?.loginUserDetailsReducer
  );
  console.log("login", loginUserDetails?.googleId ? "true" : "fasle");
  // return <Outlet />;
  return false ? <Outlet /> : <Navigate to="/login" replace />;

  // return loginUserDetails ? <Outlet /> : <Navigate to="/login"  />;
}
export default Authentication;
