// Generation.js
import React, { useState } from 'react';
import { Container, Grid, Button, Box, TextareaAutosize, Typography } from '@mui/material';
import {CandidateInfoCard} from './CandidateInfo';
import {GenerationParamsCard} from './GenerationParams';

export const Generation = () => {
  const [display, setDisplay] = useState('');

  const handleGenerate = () => {
    // Call to external API and set display accordingly...
  }

  return (
    <Box sx={{ backgroundColor: '#808080', minHeight: '100vh', p: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h4">
          Generation
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CandidateInfoCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <GenerationParamsCard />
            <Box display="flex" justifyContent="center" m={1} p={1}>
          <Button variant="contained" color="primary" onClick={handleGenerate}>
            Generate
          </Button>
        </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            minRows={15}
            style={{ width: '100%', padding: 20 }}
            value={display}
            readOnly
          />
        </Grid>
      </Container>
    </Box>
  );
};

