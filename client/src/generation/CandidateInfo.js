// CandidateInfoCard.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Box } from '@mui/material';

export const CandidateInfoCard = ({candidateInfo, handleChange}) => {
const field_to_label = {
    name: 'Name',
    candidate_company: 'Company',
    industry: 'Industry',
    company_url: 'Company URL',
    linkedin_url: 'LinkedIn URL',
    bio: 'Candidate Bio'
}
  return (
    <Card variant="outlined" sx={{ backgroundColor: '#4d4d4d', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5">
          Candidate Information
        </Typography>
        {Object.keys(candidateInfo).map((field) => (
          <TextField
            key={field}
            name={field}
            label={field_to_label[field]}
            placeholder={`Enter ${field}`}
            value={candidateInfo[field]}
            onChange={handleChange}
            required
            multiline={field === 'bio'}
            minRows={field === 'bio' ? 3 : undefined}
            maxRows={field === 'bio' ? 4 : undefined}
            fullWidth
            margin="normal"
          />
        ))}
      </CardContent>
    </Card>
  );
};
