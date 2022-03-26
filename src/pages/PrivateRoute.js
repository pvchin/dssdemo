import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../context/auth_context";

const PrivateRoute = ({ components: RouteCompenent, ...rest }) => {
  const { currentUser } = useAuthContext();
  return (
    <div>
      {/* <Route>
        {...rest}
        render=
        {(routeProps) =>
          !!currentUser ? (
            <RouteCompenent {...routeProps} />
          ) : (
            <Redirect to="/login" />
          )
        }
      </Route> */}
    </div>
  );
};
export default PrivateRoute;
