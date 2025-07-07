import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    "& .MuiInputBase-root": {
      padding: "2px 30px 2px 5px !important",
    },
    "& .MuiInputBase-root.Mui-focused": {
      minHeight: 40,
    },
    "& .MuiChip-sizeSmall": {
      height: 32,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#21bddf",
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
  tagDark: {},
  tagLight: {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.primaryGrey.C100,
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
