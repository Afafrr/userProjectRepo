import {
  FormControl,
  InputLabel,
  Input,
  Typography,
  Box,
  Button,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { postAuth } from "../authRepository/authRequest";
import { UserError } from "../../errorPage/userError";
import { Navigate } from "react-router-dom";

//eve.holt@reqres.in
//pistol
type Error = {
  state: boolean;
  mess: string;
};

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Error>({ state: false, mess: "" });
  const [success, setSuccess] = useState(false);

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

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({ state: false, mess: "" });
    setSuccess(false);

    postAuth("register", json)
      .then((res) => {
        setSuccess(true);

        console.log(res);
      })
      .catch((err) => {
        setError({ state: true, mess: err.response.data.error });
        throw new Error(err);
      });
  };
  return (
    <>
      <Typography variant="h4" margin={3} textAlign="left">
        Register
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
            Register
          </Button>
        </form>

        {error.state && <UserError message={error.mess} />}
        {success && (
          <>
            <Alert variant="filled" severity="success">
              You are logged in!
            </Alert>
            <Navigate to="/login" />
          </>
        )}
      </Box>
    </>
  );
};
