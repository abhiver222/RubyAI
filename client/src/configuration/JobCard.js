import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Tooltip } from '@mui/material';
import { SERVER_URL, isSome } from '../utils';
import { toast } from 'react-toastify';

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
    toast.info("Saved job description!");
  };

  const submitDisabled = () => {
    return Object.values(jobDescription).some((value) => value === '' || !isSome(value));
  };

  const inputs = [
    {inputName: 'position', label: 'Position', tooltip: "The title of the job you're hiring for."},
    {inputName: 'responsibilities', label: 'Responsibilities', tooltip: "The responsibilities of the job, be descriptive."},
    {inputName: 'skills', label: 'Skills', tooltip: "The skills a good candidate for this job should have."},
    {inputName: 'seniority', label: 'Seniority', tooltip: "The seniority of the candidate you're looking for."},
    {inputName: 'location', label: 'Location', tooltip: "The location of the job you're hiring for, remote, hybrid"}
  ]

  return (
    <Card variant="outlined" sx={{backgroundColor: '#4d4d4d'}}>
      <CardContent>
        <Typography variant="h5">
          Job Description
        </Typography>
        {inputs.map((field) => (
        <Tooltip title={<h3 style={{maxWidth: "200px", wordBreak: "break-word"}}>{field.tooltip}</h3>} placement='left' arrow>      
          <TextField
            key={field.inputName}
            name={field.inputName}
            label={field.label}
            placeholder={`Enter ${field.inputName}`}
            value={jobDescription[field.inputName]}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          </Tooltip>
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitDisabled()}>
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
