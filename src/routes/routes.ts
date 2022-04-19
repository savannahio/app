
export const routes = {
  api: {
    horizon: {
      path: process.env.REACT_APP_API_HORIZON_URL as string,
      name: "Horizon"
    },
    telescope: {
      path: process.env.REACT_APP_API_TELESCOPE_URL as string,
      name: "Telescope"
    },
    documentation: {
      path: process.env.REACT_APP_API_DOCUMENTATION_URL as string,
      name: "API Docs"
    }
  },
  home: {
    path: "/",
    name: 'Home'
  },
  register: {
    path: "/register",
    name: 'Sign Up'
  },
  users: {
    index: {
      path: "/users",
      name: 'Users'
    },
    edit: {
      path: "/users/:id",
      name: 'Edit User'
    },
  },
  auth: {
    accessTokens: {
      path: "/auth/access_tokens",
      name: 'Tokens'
    },
    login: {
      path: "/auth/login",
      name: 'Login'
    },
    resetPassword: {
      path: "/auth/reset_password",
      name: 'Reset Password'
    },
    profile: {
      path: "/auth/profile",
      name: 'Profile'
    },
  },
  notFound: {
    path: "*",
    name: 'Not Found'
  },
};
