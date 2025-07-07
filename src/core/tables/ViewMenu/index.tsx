import React, { useEffect, useState } from "react";
import {
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import "@tanstack/react-table";
import { Table } from "@tanstack/react-table";
import { GlobalSettingsIcon } from "icons";

type ColumnVisibility = {
  columnID: string;
  // columnName: string;
  visibility: boolean;
};

type ViewMenuProps = {
  table: Table<any>;
};

const ViewMenu: React.FC<ViewMenuProps> = ({ table }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedColumns, setSelectedColumns] = useState<ColumnVisibility[]>(
    [],
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (columnId: string) => {
    setSelectedColumns((prevState) =>
      prevState.map((column) =>
        column.columnID === columnId
          ? { ...column, visibility: !column.visibility }
          : column,
      ),
    );
  };

  useEffect(() => {
    const newVisibility = Object.fromEntries(
      table.getAllFlatColumns().map((c) => {
        const selectedColumn = selectedColumns.find(
          (column) => column.columnID === c.id,
        );

        return [c.id, !c.getCanHide() || (selectedColumn?.visibility ?? true)];
      }),
    );

    console.log("selectedColumns", selectedColumns);
    console.log("newVisibility", newVisibility);

    table.setColumnVisibility(newVisibility);
  }, [selectedColumns, table]);

  const open = Boolean(anchorEl);

  useEffect(() => {
    setSelectedColumns(
      table
        .getVisibleFlatColumns()
        .filter((c) => c.getCanHide())
        .map((c) => ({ columnID: c.id, visibility: true })),
    );
  }, [table]);

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={
          {
            /* your styles here */
          }
        }
      >
        <GlobalSettingsIcon />
        View
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            /* your styles here */
          },
        }}
      >
        {selectedColumns.map((column) => (
          <MenuItem
            key={column.columnID}
            onClick={() => handleMenuItemClick(column.columnID)}
            sx={
              {
                /* your styles here */
              }
            }
          >
            <Checkbox checked={column.visibility} />
            <Typography variant="body2" noWrap>
              {column.columnID}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ViewMenu;
