import { UI } from "../types";

interface MetaUtil {
  initial: UI;
  loading: UI;
  loaded: UI;
  rejected: UI;
}

export const metaUtil: MetaUtil = {
  initial: {
    loading: false,
    loaded: false,
  },
  loading: {
    loading: true,
    loaded: false,
  },
  loaded: {
    loading: false,
    loaded: true,
  },
  rejected: {
    loading: false,
    loaded: false,
  },
};
