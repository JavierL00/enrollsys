import { useContext, useState } from "react";
import { RoleContext } from "./Context";
import {
  getRolesRequest,
  getRoleByIdRequest,
  createRoleRequest,
  updateRoleRequest,
  deleteRoleRequest,
} from "../api/role.api";

export const useRoles = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRoles must be used within a RoleProvider");
  }
  return context;
};

export const RoleContextProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);

  async function loadRoles() {
    const response = await getRolesRequest();
    setRoles(response.data);
  }

  const getRole = async (id) => {
    try {
      const response = await getRoleByIdRequest(id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createRole = async (role) => {
    try {
      await createRoleRequest(role);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRole = async (id, data) => {
    try {
      await updateRoleRequest(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRole = async (id) => {
    try {
      await deleteRoleRequest(id);
      setRoles(roles.filter((role) => role.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RoleContext.Provider
      value={{
        roles,
        loadRoles,
        getRole,
        createRole,
        updateRole,
        deleteRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
