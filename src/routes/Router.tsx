import React from "react";
import { useRoutes } from "react-router-dom";
import PrivateRoute from "@routes/PrivateRoute";
import Users from "@pages/Users";
import UserRegistration from "@pages/Users/UserRegistration";
import AccessTokens from "@pages/AccessTokens";
import Home from "@pages/Home";
import Login from "@pages/Login";
import NotFound from "@pages/NotFound";
import ResetPassword from "@pages/ResetPassword";
import { RouteObject } from "react-router/lib/router";
import { routes } from "@routes/routes";
import { AuthUser } from "project-ts";
import UpdateAuthUser from "@pages/Auth/UpdateAuthUser";
import UserAddEdit from "@pages/Users/UserAddEdit";

interface Props {
  user?: AuthUser
}

const Router: React.FC<Props> = ({ user }) => {
  const publicRoutes: Array<RouteObject> = [
    {
      path: routes.home.path,
      element: <Home />
    },
    {
      path: routes.auth.login.path,
      element: <Login />
    },
    {
      path: routes.register.path,
      element: <UserRegistration />
    },
  ]

  const privateRoutes: Array<RouteObject> = !user ? [] : [
    {
      path: routes.auth.resetPassword.path,
      element: <PrivateRoute user={user}><ResetPassword /></PrivateRoute>
    },
    {
      path: routes.auth.profile.path,
      element: <PrivateRoute user={user}><UpdateAuthUser /></PrivateRoute>
    },
    {
      path: routes.auth.accessTokens.path,
      element: <PrivateRoute user={user}><AccessTokens /></PrivateRoute>
    },
  ]
  if (user) {
    privateRoutes.push({
      path: routes.users.index.path,
      element: <PrivateRoute user={user}><Users /></PrivateRoute>
    })
  }
  if (user) {
    privateRoutes.push({
      path: routes.users.edit.path,
      element: <PrivateRoute user={user}><UserAddEdit /></PrivateRoute>
    })
  }


  const notFound: RouteObject = {
    path: routes.notFound.path,
    element: <NotFound />
  }
  return useRoutes([...publicRoutes, ...privateRoutes, notFound]);
}

export default Router