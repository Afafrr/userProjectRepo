import { Register } from "./auth/register/Register";
import { Login } from "./auth/login/Login";
import { Users } from "./users/Users";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";

export const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Users />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="users" element={<Users />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
