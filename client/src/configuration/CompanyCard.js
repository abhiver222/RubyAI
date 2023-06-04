import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import MagicWandIcon from '@mui/icons-material/Autorenew';  // choose an icon that suits your needs


const CompanyCard = () => {
  const [companyInfo, setCompanyInfo] = useState({
    company: '',
    missions: '',
    motto: '',
    brandVoice: ''
  });

  const handleChange = (event) => {
    setCompanyInfo({
      ...companyInfo,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    const response = await fetch('https://api.example.com/save-company-info', {
      method: 'POST',
      body: JSON.stringify(companyInfo),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Card variant="outlined" sx={{ backgroundColor: '#d3d3d3', width: '80%', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5">
          Company Information
        </Typography>
        <TextField
          name='company'
          label='Company Name'
          placeholder='Enter company name'
          value={companyInfo['company']}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name='motto'
          label='Company Motto'
          placeholder='Enter company motto'
          value={companyInfo['motto']}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <Box position="relative">
          <TextField
            name='missions'
            label='Company Missions'
            placeholder='Enter company missions'
            value={companyInfo['missions']}
            onChange={handleChange}
            required
            multiline
            minRows={2}
            fullWidth
            margin="normal"
          />
          <IconButton aria-label="edit" color="primary" size="small" sx={{ position: 'absolute', bottom: 10, right: 10 }}>
            <MagicWandIcon />
          </IconButton>
        </Box>
        <Box position="relative">
          <TextField
            name='brandVoice'
            label='Brand Voice'
            placeholder='Enter brand voice'
            value={companyInfo['brandVoice']}
            onChange={handleChange}
            required
            multiline
            minRows={2}
            fullWidth
            margin="normal"
          />
          <IconButton aria-label="edit" color="primary" size="small" sx={{ position: 'absolute', bottom: 10, right: 10 }}>
            <MagicWandIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
