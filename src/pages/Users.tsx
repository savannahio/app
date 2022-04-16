import React, { useEffect, useReducer } from "react";
import { Link } from 'react-router-dom'
import { initialState, reducer, getUsers } from "@hooks/useUsers";
import UserOrderBySelector from "@components/selectors/UserOrderBySelector";
import { DirectionParam, UserOrderBy } from "project-ts";
import DirectionSelector from "@components/selectors/DirectionSelector";
import PerPageSelector from "@components/selectors/PerPageSelector";
import { PaginationTypes } from "@types";
import { routes } from "@routes";

const Users: React.FC<{}> = () => {
  const [{ request, data, ui }, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getUsers(request, dispatch);
  }, []);

  const setOrderBy = async (payload: UserOrderBy) => {
    dispatch({ type: PaginationTypes.setOrderBy, payload });
    await getUsers(request, dispatch);
  };
  const setDirection = async (payload: DirectionParam) => {
    dispatch({ type: PaginationTypes.setDirection, payload });
    await getUsers(request, dispatch);
  };
  const setPerPage = async (payload: number) => {
    dispatch({ type: PaginationTypes.setPerPage, payload });
    await getUsers(request, dispatch);
  };

  return (
    <div className="flex-col">
      <div className="flex">
        <UserOrderBySelector
	disabled={ui.loading}
	selected={request.order_by as UserOrderBy}
	onChange={setOrderBy}
        />
        <DirectionSelector
	disabled={ui.loading}
	selected={request.direction as DirectionParam}
	onChange={setDirection}
        />
        <PerPageSelector
	disabled={ui.loading}
	selected={request.per_page as number}
	onChange={setPerPage}
        />
      </div>
      <table className="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
        {data.data.map(user => (
          <tr key={`user-${user.id}`}>
            <td><Link state={{user}} to={routes.users.edit.path.replace(':id', user.id.toString())}>{user.id}</Link></td>
            <td>{`${user.first_name} ${user.last_name}`}</td>
            <td>{user.email}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
