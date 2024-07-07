import { ReactNode } from "react";
import {
  Logout,
  TUser,
  getCurrenToken,
  getCurrenUser,
} from "../redux/features/user/UserSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";

const PrivetRoute = ({
  children,
  role,
}: {
  children: any;
  role: string | undefined;
}) => {
  const token = useAppSelector(getCurrenToken);
  const dispatch = useAppDispatch();
  let user;

  if (token) {
    user = verifyToken(token);
  }
  if (role !== undefined && role !== (user as TUser)?.role) {
    dispatch(Logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default PrivetRoute;
