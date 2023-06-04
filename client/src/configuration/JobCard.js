import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const JobCard = () => {
  const [jobDescription, setJobDescription] = useState({
    position: '',
    responsibilities: '',
    skills: '',
    seniority: '',
    location: ''
  });

  const handleChange = (event) => {
    setJobDescription({
      ...jobDescription,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    const response = await fetch('https://api.example.com/save-job-description', {
      method: 'POST',
      body: JSON.stringify(jobDescription),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">
          Job Description
        </Typography>
        {['position', 'responsibilities', 'skills', 'seniority', 'location'].map((field) => (
          <TextField
            key={field}
            name={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            placeholder={`Enter ${field}`}
            value={jobDescription[field]}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
        ))}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
