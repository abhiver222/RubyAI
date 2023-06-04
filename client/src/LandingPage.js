import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';

export const LandingPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Box width="50%" textAlign="center">
        <img src="logo_url_here" alt="Ruby logo" style={{ width: '100%' }} />  {/* replace with your logo URL */}
        <Typography variant="h4" style={{ margin: '2rem 0' }}>
          Welcome to RubyAI
        </Typography>
      </Box>
      <Box width="60%">
        <List>
          <ListItem>
            1. Click on the "Configuration" to set your preferences.
          </ListItem>
          <ListItem>
            2. Go to the "Generation" page to start generating content.
          </ListItem>
          <ListItem>
            3. Leave us feedback on the "Feedback" page.
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};