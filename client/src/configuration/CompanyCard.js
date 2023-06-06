import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, IconButton } from '@mui/material';
import MagicWandIcon from '@mui/icons-material/Autorenew';  // choose an icon that suits your needs
import {SERVER_URL, isSome} from '../utils';


const CompanyCard = () => {
  const [companyInfo, setCompanyInfo] = useState({
    company_name: '',
    mission: '',
    motto: '',
    brand_voice: ''
  });

  useEffect(() => {
    const getCompanyInfo = async () => {
      const response = await fetch(`${SERVER_URL}/get_company_info`);
      const data = await response.json();
      console.log("get company info",data)
      if(isSome(data.company_info)){
        setCompanyInfo((prevState) => ({...prevState, ...data.company_info}));
      }
    };
    getCompanyInfo();
  }, []);

  const handleChange = (event) => {
    setCompanyInfo({
      ...companyInfo,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    const response = await fetch(`${SERVER_URL}/save_company_info`, {
      method: 'POST',
      body: JSON.stringify(companyInfo),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Card variant="outlined" sx={{ backgroundColor: '#4d4d4d',  boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5">
          Company Information
        </Typography>
        <TextField
          name='company_name'
          label='Company Name'
          placeholder='Enter company name'
          value={companyInfo['company_name']}
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
            name='mission'
            label='Company Mission'
            placeholder='Enter company missions'
            value={companyInfo['mission']}
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
