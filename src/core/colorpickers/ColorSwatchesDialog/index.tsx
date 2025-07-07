import React from "react";
import { Grid2 } from "@mui/material";
import { CustomDialog } from "core";
import ColorSwatchGroup from "../ColorSwatchGroup";

const COLORS = [
  {
    colorName: "Rot",
    colors: ["#b71c1c", "#d32f2f", "#f44336", "#e57373", "#ffcdd2"],
  },
  {
    colorName: "Pink",
    colors: ["#880e4f", "#c2185b", "#e91e63", "#f06292", "#f8bbd0"],
  },
  {
    colorName: "Lila",
    colors: ["#4a148c", "#7b1fa2", "#9c27b0", "#ba68c8", "#e1bee7"],
  },
  {
    colorName: "Dunkel-Lila",
    colors: ["#311b92", "#512da8", "#673ab7", "#9575cd", "#d1c4e9"],
  },
  {
    colorName: "Indigo",
    colors: ["#1a237e", "#303f9f", "#3f51b5", "#7986cb", "#c5cae9"],
  },
  {
    colorName: "Blau",
    colors: ["#0d47a1", "#1976d2", "#2196f3", "#64b5f6", "#bbdefb"],
  },
  {
    colorName: "Hell-Blau",
    colors: ["#01579b", "#0288d1", "#03a9f4", "#4fc3f7", "#b3e5fc"],
  },
  {
    colorName: "Cyan",
    colors: ["#006064", "#0097a7", "#00bcd4", "#4dd0e1", "#b2ebf2"],
  },
  {
    colorName: "Teal",
    colors: ["#004d40", "#00796b", "#009688", "#4db6ac", "#b2dfdb"],
  },
  {
    colorName: "Grün",
    colors: ["#194D33", "#388e3c", "#4caf50", "#81c784", "#c8e6c9"],
  },
  {
    colorName: "Hell-Grün",
    colors: ["#33691e", "#689f38", "#8bc34a", "#aed581", "#dcedc8"],
  },
  {
    colorName: "Lime",
    colors: ["#827717", "#afb42b", "#cddc39", "#dce775", "#f0f4c3"],
  },
  {
    colorName: "Gelb",
    colors: ["#f57f17", "#fbc02d", "#ffeb3b", "#fff176", "#fff9c4"],
  },
  {
    colorName: "Amber",
    colors: ["#ff6f00", "#ffa000", "#ffc107", "#ffd54f", "#ffecb3"],
  },
  {
    colorName: "Orange",
    colors: ["#e65100", "#f57c00", "#ff9800", "#ffb74d", "#ffe0b2"],
  },
  {
    colorName: "Tief-Orange",
    colors: ["#bf360c", "#e64a19", "#ff5722", "#ff8a65", "#ffccbc"],
  },
  {
    colorName: "Braun",
    colors: ["#3e2723", "#5d4037", "#795548", "#a1887f", "#d7ccc8"],
  },
  {
    colorName: "Grau",
    colors: ["#212121", "#424242", "#616161", "#9e9e9e", "#e0e0e0"],
  },
  {
    colorName: "Blau-Grau",
    colors: ["#263238", "#455a64", "#607d8b", "#90a4ae", "#cfd8dc"],
  },
  {
    colorName: "Schwarz",
    colors: ["#000000", "#525252", "#969696", "#D9D9D9", "#FFFFFF"],
  },
];

type ColorSwatchesDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (value: React.SetStateAction<boolean>) => void;
  onSelect: (color: string) => void;
};

const ColorSwatchesDialog: React.FC<ColorSwatchesDialogProps> = ({
  dialogOpen,
  setDialogOpen,
  onSelect,
}) => {
  if (!dialogOpen) {
    return null;
  }

  return (
    <CustomDialog
      dialogOpen={dialogOpen}
      titleText="Farbe auswählen"
      showConfirm={false}
      showDecline={false}
      setDialogOpen={setDialogOpen}
      contentPadding="40px 40px 20px 40px"
      maxWidth="md"
    >
      <Grid2 container direction="row" spacing={1} columns={6} gridColumn={6}>
        {COLORS.map((colorGroup) => (
          <ColorSwatchGroup
            colorName={colorGroup.colorName}
            colors={colorGroup.colors}
            onSelect={(color) => {
              onSelect(color);
              setDialogOpen(false);
            }}
          />
        ))}
      </Grid2>
    </CustomDialog>
  );
};

export default ColorSwatchesDialog;
