// Generation.js
import React, { useState, useRef } from 'react';
import { Container, Grid, Button, Box,Tab, Tabs, Typography, TextareaAutosize } from '@mui/material';
import {CandidateInfoCard} from './CandidateInfo';
import {GenerationParamsCard} from './GenerationParams';

export const Generation = () => {
  const [display, setDisplay] = useState('');
  const [emails, setEmails] = useState([1,2,3]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGenerate = async () => {
    // Call to external API and set display accordingly...
    // const data = await fetchAPI();
    // setEmails(data);
    // editorRef.current.setContent(data[0]); 
  }

  const handleTabChange = (index) => {
    setCurrentIndex(index);

  }

  return (
    <Box sx={{ backgroundColor: '#808080', minHeight: '100vh', p: 3 }}>
      <Container maxWidth="lg">
        <Typography variant="h4">
          Generation
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CandidateInfoCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <GenerationParamsCard />
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <Button variant="contained" color="primary" onClick={handleGenerate} size='large' sx={{marginTop: "18px"}}>
                Generate
              </Button>
            </Box>
          </Grid>
        </Grid>
        {emails.length && (
          <Grid item xs={12}>
            <Tabs value={currentIndex} >
              {emails.map((email, index) => (
                  <Tab key={index} label={`Email ${index + 1}`} onClick={() => handleTabChange(index)}/>
              ))}
            </Tabs>
            <TextareaAutosize
              minRows={15}
              style={{ width: '100%', padding: 20, marginTop: '20px' }}
              value={emails[currentIndex]}
              readOnly={false}
            />
          </Grid>
        )}
      </Container>
    </Box>
  );
};

