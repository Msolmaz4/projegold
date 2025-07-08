export const USER_GROUPS = {
  ADMIN: "Admin",
  OFFICE: "office",
  ACCOUNTING: "accounting",
};

export const USER_GROUPS_OPTIONS = [
  {
    value: USER_GROUPS.ADMIN,
    label: "Admin",
  },
  {
    value: USER_GROUPS.OFFICE,
    label: "Büro",
  },
  {
    value: USER_GROUPS.ACCOUNTING,
    label: "Buchhaltung",
  },
];

export const getUserRoleName = (value: string) => {
  switch (value) {
    case USER_GROUPS.ADMIN:
      return "Admin";
    case USER_GROUPS.OFFICE:
      return "Büro";
    case USER_GROUPS.ACCOUNTING:
      return "Buchhaltung";
    default:
      throw new Error("Could not find userRole " + value);
  }
};
