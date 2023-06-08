import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import logo from "./rubylogo.png";

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/configure");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      sx={{ mt: 8 }}
    >
      <Box width="50%" textAlign="center">
        <img src={logo} alt="Ruby logo" style={{ width: "100%" }} />{" "}
        {/* replace with your logo URL */}
      </Box>
      <Card
        variant="outlined"
        sx={{ backgroundColor: "#4d4d4d", boxShadow: 3, width: "60%", mt: 5 }}
      >
        <CardContent sx={{ mx: 5 }}>
          <Typography variant="h5" sx={{ mb: 1, mt: 2 }}>
            Hi, I'm{" "}
            <span style={{ color: "#FE0944", fontWeight: "bold" }}>RubyAI</span>
            ! <br />I can help you write personalized recruitement emails for
            your candidates.
          </Typography>
          <Box width="100%" sx={{ mt: 0 }}>
            <List>
              <ListItem>
                1. First, click on the "Configure" tab to let me know about your
                company and the job description you're hiring for.
              </ListItem>
              <ListItem>
                2. Next, go to the "Generate" page to start generating
                personalized messages. Leave feedback for me on messages to
                improve my performance!
              </ListItem>
              <ListItem>
                3. Revisit any message generations or feedback in the "History"
                tab.
              </ListItem>
            </List>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ mt: 5 }}>
        <Button
          variant="contained"
          size="large"
          color="warning"
          onClick={handleClick}
        >
          Configure
        </Button>
      </Box>
    </Box>
  );
};
