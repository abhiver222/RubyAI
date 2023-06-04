import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route,Routes, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

// Your page components
import {Configuration} from './configuration/Configuration';
import {Generation} from './generation/Generation';
import {Feedback} from './Feedback';

const theme = createTheme({
  palette: {
    mode: 'dark', // This is for dark theme
    primary: {
      main: '#90caf9', // Change as per requirement
    },
    secondary: {
      main: '#4d4d4d', // Change as per requirement
    },
    background:{
      default: '#121212',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              RubyAI
            </Typography>
            <Button color="inherit" component={Link} to="/configuration">Configuration</Button>
            <Button color="inherit" component={Link} to="/generation">Generation</Button>
            <Button color="inherit" component={Link} to="/feedback">Feedback</Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/configuration" element={<Configuration />} />
          <Route path="/generation" element={<Generation />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
