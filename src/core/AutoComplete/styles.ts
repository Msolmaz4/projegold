import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      padding: "5px 30px 5px 5px !important",
    },
    "& .MuiInputBase-root.Mui-focused": {
      minHeight: 46,
    },
    "& .MuiChip-sizeSmall": {
      height: 32,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
  },
  rootDark: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a9bebb",
    },
    "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
  rootLight: {
    "& .MuiInputBase-root": {
      backgroundColor: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#a9bebb",
    },
    "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
  },
  tagDark: {
    color: theme.palette.primaryGrey.C900,
    border: `1px solid ${theme.palette.primaryGrey.C900}`,
    fontSize: 14,
  },
  tagLight: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primaryGrey.C100,
    fontSize: 14,
  },
  inputError: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e0a9b6",
      boxShadow: "0 0 5px rgba(249, 25, 66, 0.3) !important",
    },
    "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e0a9b6",
      boxShadow: "0 0 5px rgba(249, 25, 66, 0.3) !important",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e0a9b6",
      boxShadow: "0 0 5px rgba(249, 25, 66, 0.3) !important",
      borderWidth: 1,
    },
  },
  inputSuccess: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#b2d6be",
      boxShadow: "0 0 5px rgba(93, 216, 137, 0.3) !important",
    },
    "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#b2d6be",
      boxShadow: "0 0 5px rgba(93, 216, 137, 0.3) !important",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#b2d6be",
      boxShadow: "0 0 5px rgba(93, 216, 137, 0.3) !important",
      borderWidth: 1,
    },
  },
}));

export default useStyles;
