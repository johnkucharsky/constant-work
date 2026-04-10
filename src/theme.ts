"use client";
import "@mui/x-date-pickers/themeAugmentation";

import {
  buttonClasses,
  checkboxClasses,
  outlinedInputClasses,
  paginationItemClasses,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { pickersOutlinedInputClasses } from "@mui/x-date-pickers";
import { Inter } from "next/font/google";

import { COLORS } from "@/app/tokens";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
    allVariants: {
      color: "var(--grey-7)",
    },
    h3: {
      fontSize: 40,
      lineHeight: "110%",
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
      lineHeight: "150%",
    },
    subtitle1: {
      color: "var(--grey-5)",
      lineHeight: "110%",
    },
    subtitle2: {
      color: "var(--grey-5)",
    },
  },
  palette: {
    primary: {
      main: COLORS["$blue-1"],
      dark: COLORS["$blue-3"],
    },
    secondary: {
      light: COLORS["$grey-4"],
      main: COLORS["$grey-5"],
    },

    text: {
      secondary: COLORS["$grey-6"],
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          borderWidth: "2px",
          borderColor: "var(--grey-1)",

          [`.${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--grey-1)",
          },

          // hover
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--grey-3)",
          },

          // focus
          [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
            {
              borderColor: "var(--grey-5)",
              backgroundColor: "unset",
            },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: COLORS["$grey-9"],
          [`&.${checkboxClasses.checked}`]: {
            color: "var(--blue-3)",
          },
          [`&.${checkboxClasses.indeterminate}`]: {
            color: "var(--blue-3)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "12px",
          [`&.${buttonClasses.sizeLarge}`]: {
            paddingTop: "16px",
            paddingBottom: "16px",
            fontSize: "18px",
            lineHeight: "120%",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        underlineAlways: {
          textDecoration: "none",
          borderBottom: "1px solid var(--blue-1)",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          [`&.${paginationItemClasses.selected}`]: {
            backgroundColor: "var(--blue-4)",
            color: "white",
          },
          [`&.${paginationItemClasses.selected}:hover`]: {
            backgroundColor: "var(--blue-4)",
            color: "white",
          },
        },
      },
    },
    MuiDatePicker: {
      defaultProps: {
        format: "DD.MM.YYYY",
      },
    },
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          borderWidth: "2px",
          borderColor: "var(--grey-1)",
          paddingLeft: "16px",
          paddingRight: "16px",
          input: {
            paddingTop: "14px",
            paddingBottom: "14px",
          },

          [`.${pickersOutlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--grey-1)",
          },

          // hover
          [`&:hover .${pickersOutlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--grey-3)",
          },

          // focus
          [`&&.${pickersOutlinedInputClasses.focused} .${pickersOutlinedInputClasses.notchedOutline}`]:
            {
              borderColor: "var(--grey-5)",
              backgroundColor: "unset",
            },
        },
      },
    },
  },
});

export default theme;
