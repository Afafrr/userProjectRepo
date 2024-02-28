import { ReactNode, createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState("");
  console.log(auth);
  const auth2 = "QpwL5tke4Pnpja7X4";
  // const decoded = jwtDecode(auth2);
  // console.log(decoded);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
