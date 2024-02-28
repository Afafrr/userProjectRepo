import {
  FormControl,
  InputLabel,
  Input,
  Typography,
  Box,
  Button,
  Alert,
} from "@mui/material";
import { useState, useContext } from "react";
import { postAuth } from "../authRepository/authRequest";
import { UserError } from "../../errorPage/userError";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../authProvider/AuthProvider";

//eve.holt@reqres.in
//pistol
type Error = {
  state: boolean;
  mess: string;
};

export const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("pistol");
  const [error, setError] = useState<Error>({ state: false, mess: "" });
  const [success, setSuccess] = useState(false);
  const { setAuth } = useContext(AuthContext);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const json = {
    email: email,
    password: password,
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError({ state: false, mess: "" });

    postAuth("login", json)
      .then((res) => {
        setSuccess(true);
        console.log(res);
      })
      .catch((err) => {
        setError({ state: true, mess: err.response?.data.error });
        throw new Error(err);
      });
  };

  return (
    <>
      <Typography variant="h4" margin={3} textAlign="left">
        Login
      </Typography>
      <Box
        display="flex"
        className="register-wrapper"
        sx={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <form
          className="register-form"
          style={{
            alignSelf: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: "50px",
            margin: "10px",
            gap: "20px",
          }}
          onSubmit={formSubmit}
        >
          <FormControl>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <Input id="email" onChange={handleEmail} />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" onChange={handlePassword} />
          </FormControl>
          <Button type="submit" variant="outlined">
            Login
          </Button>
        </form>
        {error.state && <UserError message={error.mess} />}
        {success && (
          <>
            <Alert variant="filled" severity="success">
              You are logged in!
            </Alert>
            {/* <Navigate to="/users" /> */}
          </>
        )}
      </Box>
    </>
  );
};
