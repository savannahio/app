import {
  AuthApi,
  PermissionsApi,
  RolesApi,
  UsersApi,
  Configuration,
  AccessTokensApi,
} from "api-ts-axios";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { routes } from "@routes";
import { storageUtil } from "@utils";
import { cookieUtil } from "@utils/cookieUtil";

const BASE_PATH = process.env.REACT_APP_API_URL as string

const config = new Configuration({ basePath: BASE_PATH });

const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const client = axios.create(axiosConfig);
client.interceptors.request.use(
  (conf: AxiosRequestConfig): AxiosRequestConfig => conf,
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);
client.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosError> => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== routes.auth.login.path
    ) {
      await terminateSession();
    }
    return Promise.reject(error.response);
  }
);

export const terminateSession = async () => {
  await authApi.logout();
  storageUtil.removeUser();
  cookieUtil.removeSession();
  cookieUtil.removeXSRF();
};

export const accessTokenApi: AccessTokensApi = new AccessTokensApi(config, BASE_PATH, client);
export const authApi: AuthApi = new AuthApi(config, BASE_PATH, client);
export const permissionsApi: PermissionsApi = new PermissionsApi(config, BASE_PATH, client);
export const rolesApi: RolesApi = new RolesApi(config, BASE_PATH, client);
export const usersApi: UsersApi = new UsersApi(config, BASE_PATH, client);
