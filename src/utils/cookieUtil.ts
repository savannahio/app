import Cookies from "js-cookie";

const XSRF_KEY = process.env.REACT_APP_XSRF_KEY as string
const SESSION_TOKEN = process.env.REACT_APP_SESSION_TOKEN as string

interface CookieUtil {
  hasXSRF: () => boolean;
  removeXSRF: () => void;
  hasSession: () => boolean;
  removeSession: () => void;
}

export const cookieUtil: CookieUtil = {
  hasXSRF: (): boolean => {
    const cookie = Cookies.get(XSRF_KEY);
    return cookie !== undefined;
  },
  removeXSRF: (): void => {
    const cookie = Cookies.get(XSRF_KEY);
    if (cookie !== undefined) {
      Cookies.remove(XSRF_KEY);
    }
  },
  hasSession: (): boolean => {
    const cookie = Cookies.get(SESSION_TOKEN);
    return cookie !== undefined;
  },
  removeSession: (): void => {
    const cookie = Cookies.get(SESSION_TOKEN);
    if (cookie !== undefined) {
      Cookies.remove(SESSION_TOKEN);
    }
  },
};
