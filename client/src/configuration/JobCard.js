import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { SERVER_URL, isSome } from '../utils';

const JobCard = () => {
  const [jobDescription, setJobDescription] = useState({
    position: '',
    responsibilities: '',
    skills: '',
    seniority: '',
    location: ''
  });

  useEffect(() => {
    const getJobDescription = async () => {
      const response = await fetch(`${SERVER_URL}/get_job_description`);
      const data = await response.json();
      console.log("get jd",data)
      if(isSome(data.job_description)){
        setJobDescription((prevState) => ({...prevState, ...data.job_description}));
      }
    };
    getJobDescription();
  }, []);

  const handleChange = (event) => {
    setJobDescription({
      ...jobDescription,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    const response = await fetch(`${SERVER_URL}/save_job_description`, {
      method: 'POST',
      body: JSON.stringify(jobDescription),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Card variant="outlined" sx={{backgroundColor: '#4d4d4d'}}>
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
