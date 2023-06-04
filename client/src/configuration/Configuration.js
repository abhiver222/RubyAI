import React from 'react';
import { Container, Grid } from '@mui/material';
import CompanyCard from './CompanyCard';
import JobCard from './JobCard';

export const Configuration = () => {
  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', p: 3 , backgroundColor: '#808080' }}>
      <Grid container maxWidth="lg" spacing={2}>
        <Grid item xs={12}>
          <CompanyCard />
        </Grid>
        <Grid item xs={12}>
          <JobCard />
        </Grid>
      </Grid>
    </Container>
  );
};