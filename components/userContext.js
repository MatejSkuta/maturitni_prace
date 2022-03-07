import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  setUser: (user) => {},
});

export default UserContext;
