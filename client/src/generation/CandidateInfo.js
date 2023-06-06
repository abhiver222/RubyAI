// CandidateInfoCard.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Box } from '@mui/material';

export const CandidateInfoCard = ({candidateInfo, handleChange}) => {

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
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            placeholder={`Enter ${field}`}
            value={candidateInfo[field]}
            onChange={handleChange}
            required
            multiline={field === 'bio'}
            minRows={field === 'bio' ? 2 : undefined}
            fullWidth
            margin="normal"
          />
        ))}
      </CardContent>
    </Card>
  );
};
