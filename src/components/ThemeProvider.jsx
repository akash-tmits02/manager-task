"use client";

import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f0c29",
      paper: "rgba(255, 255, 255, 0.04)",
    },
    primary: {
      main: "#a78bfa",
    },
    secondary: {
      main: "#60a5fa",
    },
    success: {
      main: "#34d399",
    },
    warning: {
      main: "#f59e0b",
    },
    error: {
      main: "#f87171",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
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
