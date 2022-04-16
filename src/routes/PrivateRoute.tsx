import React from "react";
import { Navigate, useLocation } from "react-router";
import { AuthUser } from "project-ts";
import { routes } from "@routes/routes";

export type Props = {
  user?: AuthUser;
  children?: React.ReactElement
}

const PrivateRoute = ({user, children}: Props) => {
  const location = useLocation()

  if (!user) {
    return <Navigate to={routes.auth.login.path} state={{ from: location }} />
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default PrivateRoute