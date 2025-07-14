export const USER_GROUPS = {
  ADMIN: "Admin",
  ACCOUNTING: "accounting",
};

export const USER_GROUPS_OPTIONS = [
  {
    value: USER_GROUPS.ADMIN,
    label: "Admin",
  },
  {
    value: USER_GROUPS.ACCOUNTING,
    label: "Users",
  },
];

export const getUserRoleName = (value: string) => {
  switch (value) {
    case USER_GROUPS.ADMIN:
      return "Admin";
    case USER_GROUPS.ACCOUNTING:
      return "Users";
    default:
      throw new Error("Could not find userRole " + value);
  }
};
