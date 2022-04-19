import React, { ReactNode, useMemo, createContext } from "react";
import { ApiRequest, AuthPermissions, Observer } from "@types";
import { AuthUser, CreateUserRequest, LoginRequest, User } from "api-ts-axios";
import { getAuthPermissions, getUniqueUserPermissions, metaUtil, storageUtil } from "@utils";
import { authApi, terminateSession, usersApi } from "@api/project";

export interface AuthState {
  user: AuthUser | undefined
  permissions: AuthPermissions
  me: Observer
  login: ApiRequest<LoginRequest>
  register: ApiRequest<CreateUserRequest>
  logout: Observer
}

const authUser = storageUtil.getUser();
const permissionsIS = authUser ? getUniqueUserPermissions(authUser) : [];

export const authIS: AuthState = {
  user: authUser,
  permissions: getAuthPermissions(permissionsIS),
  login: {
    request: {
      email: '',
      password: ''
    },
    ui: metaUtil.initial
  },
  me: {
    ui: authUser ? metaUtil.loaded : metaUtil.initial
  },
  register: {
    ui: metaUtil.initial,
    request: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  logout: {
    ui: metaUtil.initial
  }
}

export type AuthContextType = {
  user: AuthUser | undefined
  permissions: AuthPermissions
  me: Observer
  login: ApiRequest<LoginRequest>
  logout: Observer
  register: ApiRequest<CreateUserRequest>
  setAuthUser: (request?: AuthUser|User) => void
  setRegisterRequest: (request: CreateUserRequest) => void
  setLoginRequest: (request: LoginRequest) => void
  logoutUser: () => void
  getAuthUser: () => void
  loginUser: (request: LoginRequest) => void
  registerUser: (request: CreateUserRequest) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

interface Props {
  children?: ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = React.useState<AuthState>(authIS)

  const logoutUser = async () => {
    setAuth({...auth, logout: {ui: metaUtil.loading}})
    await terminateSession();
    setAuth({...auth, user: undefined, logout: {ui: metaUtil.loaded}})
  }

  const getAuthUser = async () => {
    await setAuth({...auth, me: { ...auth.me, ui: metaUtil.loading } })
    const {data} = await usersApi.getMe()
    setAuthUser(data)
  }

  const setAuthUser = (request?: AuthUser|User) => {
    const data = !request ? request : {...auth.user, ...request} as AuthUser
    const uniquePermissions = data ? getUniqueUserPermissions(data) : [];
    setAuth({...auth, user: data, permissions: getAuthPermissions(uniquePermissions)})
    if (data) {
      storageUtil.setUser(data)
    }
  }

  const setRegisterRequest = (request: CreateUserRequest) => {
    setAuth({...auth, register: {...auth.register, request}})
  }

  const setLoginRequest = (request: LoginRequest) => {
    setAuth({...auth, login: {...auth.login, request}})
  }
  const loginUser = async (request: LoginRequest) => {
    await setAuth({...auth, login: {request, ui: metaUtil.loading}})
    await authApi.getAuthCookie();
    await authApi.login({LoginRequest: request})
    await setAuth({...auth, login: {request, ui: metaUtil.loaded}})
  }

  const registerUser = async (request: CreateUserRequest) => {
    setAuth({...auth, register: {request,ui: metaUtil.loading}})
    await authApi.getAuthCookie();
    try {
      await usersApi.createUser({CreateUserRequest: request})
      setAuth({...auth, register: {...auth.register,ui: metaUtil.loaded}})
    } catch (error) {
      setAuth({...auth, register: {...auth.register, ui: metaUtil.rejected}})
    }
  }

  const authProviderValue = useMemo(() => ({ user: auth.user, permissions: auth.permissions, me: auth.me, login: auth.login, register: auth.register, logout: auth.logout, setAuthUser, logoutUser, setLoginRequest, setRegisterRequest, getAuthUser, loginUser, registerUser }), [auth.user, auth.permissions, auth.me, auth.login, auth.register, auth.logout])
  return <AuthContext.Provider value={authProviderValue}>{children}</AuthContext.Provider>
}
