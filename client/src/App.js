import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { LandingPage } from "./LandingPage.js";
// Your page components
import { Configuration } from "./configuration/Configuration";
import { Generation } from "./generation/Generation";
import { History } from "./History";
import { ToastContainer } from "react-toastify";

const theme = createTheme({
  palette: {
    mode: "dark", // This is for dark theme
    primary: {
      main: "#90caf9", // Change as per requirement
    },
    secondary: {
      main: "#4d4d4d", // Change as per requirement
    },
    background: {
      default: "#121212",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h4"
              style={{
                flexGrow: 1,
                textDecoration: "none",
                fontWeight: "bold",
                color: "#FE0944",
              }}
              component={Link}
              to="/"
            >
              RubyAI
            </Typography>
            <Button color="inherit" component={Link} to="/configure">
              Configure
            </Button>
            <Button color="inherit" component={Link} to="/generate">
              Generate
            </Button>
            <Button color="inherit" component={Link} to="/history">
              History
            </Button>
            <Button color="inherit" component={Link} to="/">
              Help
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/configure" element={<Configuration />} />
          <Route path="/generate" element={<Generation />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose={1000} theme="dark" />
    </ThemeProvider>
  );
}

export default App;
