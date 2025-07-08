import React from "react";
import { SelectOption } from "types";
import { CustomSelect } from "core";
import { USER_GROUPS_OPTIONS } from "../api";

type UserRoleOptionProps = {
  userRole: SelectOption;
  setUserRole: (value: React.SetStateAction<SelectOption>) => void;
  label?: string;
};

const UserRoleOption: React.FC<UserRoleOptionProps> = ({
  userRole = {
    label: "Büro",
    value: "office",
  },
  setUserRole,
  label,
}) => {
  return (
    <CustomSelect<SelectOption>
      label={label}
      options={USER_GROUPS_OPTIONS}
      onChange={(userRoleOption) => setUserRole(userRoleOption!)}
      value={userRole}
      selectStyle="clean"
    />
  );
};

export default UserRoleOption;
