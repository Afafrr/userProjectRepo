import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { CircularProgress } from "@mui/material";
import { getUsers } from "../auth/userRepository/getUsers";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export const Users = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res);
        setIsLoading(false);
      })
      .catch((err) => {
        throw new Error(err.message);
      });

    // axios
    //   .get("https://reqres.in/api/users")
    //   .then((res) => {
    //     setUsers(res.data.data);
    //     console.log(res.data.data);

    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     throw new Error(err.message);
    //   });
  }, []);

  return (
    <div className="users-page">
      <Typography variant="h5" margin={1} textAlign="left">
        Users
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Container
            sx={{ overflow: "auto", paddingLeft: { xs: "5px", md: "16px" } }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Last name</TableCell>
                  <TableCell sx={{ maxWidth: "auto" }}>e-mail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user: User) => (
                  <TableRow key={user.id} sx={{ padding: "0px" }}>
                    <TableCell
                      align="center"
                      width="auto"
                      sx={{
                        maxWidth: "100px",
                        minWidth: "40px",
                        padding: { xs: "5px", sm: "10px", md: "16px" },
                      }}
                      className="user-img"
                    >
                      <img
                        src={user.avatar}
                        alt={`${
                          (user.first_name, user.last_name)
                        }'s avatar image`}
                        style={{ width: "100%" }}
                        className="avatar-img"
                      />
                    </TableCell>
                    <TableCell>{user.first_name} </TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell sx={{ maxWidth: "auto" }}>
                      {user.email}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Container>
          {/* <TablePagination count={5}, onPageChange /> */}
        </>
      )}
    </div>
  );
};
