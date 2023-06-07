import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import CompanyCard from './CompanyCard';
import JobCard from './JobCard';

export const Configuration = () => {
  return (
    <Box sx={{ backgroundColor: '#808080', minHeight: '100vh', p: 3 }}>
        
    <Container maxWidth="lg" >
    <Typography variant="h3">
      Configure
    </Typography>
    <Box sx={{mt:1}}>
    <Typography variant="h6" >
      Tell me more about your company and the job you are hiring for.
    </Typography>
    </Box>
      <Grid container maxWidth="lg" spacing={2} sx={{mt:2}}>
        <Grid item xs={12}>
          <CompanyCard />
        </Grid>
        <Grid item xs={12}>
          <JobCard />
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};