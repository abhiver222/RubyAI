import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import CompanyCard from './CompanyCard';
import JobCard from './JobCard';

export const Configuration = () => {
  return (
    <Box sx={{ backgroundColor: '#808080', minHeight: '100vh', p: 3 }}>
    <Container maxWidth="lg" >
      <Grid container maxWidth="lg" spacing={2}>
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