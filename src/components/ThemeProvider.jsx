"use client";

import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f4f6fa",
      paper: "#ffffff",
    },
    primary: {
      main: "#7a5cff",
    },
    secondary: {
      main: "#4facfe",
    },
    success: {
      main: "#2ed573",
    },
    warning: {
      main: "#ff9f43",
    },
    error: {
      main: "#ff4785",
    },
    text: {
      primary: "#2d3748",
      secondary: "#718096",
    }
  },
  typography: {
    fontFamily: "var(--font-outfit), sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "none",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          backdropFilter: "none",
          borderRadius: "20px",
        },
      },
    },
  },
});

export default function ThemeProvider({ children }) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
