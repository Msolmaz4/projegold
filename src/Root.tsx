// src/Root.tsx
import { FC, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type NonIndexRouteObject,
} from "react-router-dom";
import { Box, Typography } from "@mui/material";

import UserContextProvider from "./context/user-context-provider";
import { Users } from "./data";
import TaskTable from "./featurs/aufgabe/TaskTable";
import Unternehmen from "./featurs/compaines/Unternehmen";
import KategorieListe from "./featurs/tasks/KategorieListe";
import MilestoneOverview from "./featurs/milestones/MilestoneOverview";

const MainLayout: FC = () => {
  console.log(Users);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Unternehmen />
      <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
        AUFGABEKATEGORIEN
      </Typography>
      <KategorieListe />
      <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
        AUFGABEN
      </Typography>
      <TaskTable />
      <MilestoneOverview />
    </Box>
  );
};

const routes: NonIndexRouteObject[] = [
  {
    path: "/",
    element: (
      <UserContextProvider>
        <Suspense fallback={<div>warten bitte..</div>}>
          <MainLayout />
        </Suspense>
      </UserContextProvider>
    ),
  },
];

const router = createBrowserRouter(routes);

const Root: FC = () => {
  return <RouterProvider router={router} />;
};

export default Root;
