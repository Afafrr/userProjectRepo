import { Alert } from "@mui/material";

export const UserError = ({ message }: { message: string }) => {
  return (
    <Alert variant="filled" severity="error" sx={{ marginTop: "15px" }}>
      {message}
    </Alert>
  );
};
