import { useContext, useState } from "react";
import { UserContext } from "./Context";
import {
  getUsersRequest,
  getUserByIdRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
} from "../api/user.api";

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const response = await getUsersRequest();
    setUsers(response.data);
  }

  const getUser = async (id) => {
    try {
      const response = await getUserByIdRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (user) => {
    try {
      await createUserRequest(user);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (id, data) => {
    try {
      await updateUserRequest(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteUserRequest(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loadUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
