// Generation.js
import React, { useState, useRef } from 'react';
import { Container, Grid, Button, Box,Tab, Tabs, Typography, TextareaAutosize, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import {CandidateInfoCard} from './CandidateInfo';
import {GenerationParamsCard} from './GenerationParams';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { isSome, SERVER_URL } from '../utils';


export const Generation = () => {
  const [display, setDisplay] = useState('');
  const [messages, setMessages] = useState(["hello","world","test"]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [candidateInfo, setCandidateInfo] = useState({
    name: '',
    candidate_company: '',
    industry: '',
    company_url: '',
    linkedin_url: '',
    bio: ''
  });

  const [genParams, setGenParams] = useState({
    creativity: 0.5,
    mood: 'formal',
    num_generations: 1,
    length: 'short',
    readability: 'easy',
    medium: 'email'
  });

  const handleCandidateChange = (event) => {
    setCandidateInfo({
      ...candidateInfo,
      [event.target.name]: event.target.value
    });
  };

  const handleGenParamsChange = (event) => {
    setGenParams({
      ...genParams,
      [event.target.name]: event.target.value
    });
  };

  const generateDisabled = () =>{
    return Object.values(candidateInfo).some((value) => value === '' || !isSome(value)) || Object.values(genParams).some((value) => value === '' || !isSome(value)) 
  }

  const handleGenerate = async () => {
    try {
        const response = await fetch(`${SERVER_URL}/generate_messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...candidateInfo, ...genParams }),
        });
        if (response.ok) {
          console.log("gen emails", response);
          
          const { messageData,  message} = await response.json();
          const messages = messageData.map((message) => message.message);
          console.log("resp data", messages, message);
            setMessages(messages);
        } else {
            const {message} = await response.json()
          console.error("Unable to call server", message);
        }
      } catch (e) {
        console.error("Unable to call server", e);
      }

  }

  const handleTabChange = (index) => {
    setCurrentIndex(index);
  }


  return (
    <Box sx={{ backgroundColor: '#808080', minHeight: '100vh', p: 3 }}>
      <Container maxWidth="lg">
      <Typography variant="h3">
      Generation
    </Typography>
    <Grid container spacing={2}>
      <Grid item >
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            
            aria-controls="generation-params-content"
            id="generation-params-header"  
            sx={{
                '& .MuiAccordionSummary-content': {
                  justifyContent: 'space-between',
                },
              }}          
          >
            <Typography variant="h5" style={{marginTop: "4px"}}>Generation Parameters</Typography>
            <Button variant="contained" color="primary" onClick={handleGenerate} size='large' style={{marginRight: "20px"}} disabled={generateDisabled()}>
            Generate
          </Button>         
        </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CandidateInfoCard candidateInfo={candidateInfo} handleChange={handleCandidateChange}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <GenerationParamsCard genParams={genParams} handleChange={handleGenParamsChange} setGenParams={setGenParams}/>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

      </Grid>
    </Grid>
        {messages.length && (
          <Grid item xs={12}>
            <Tabs value={currentIndex} >
              {messages.map((_, index) => (
                  <Tab key={index} label={`Message ${index + 1}`} onClick={() => handleTabChange(index)}/>
              ))}
            </Tabs>
            <TextareaAutosize
              minRows={15}
              style={{ width: '100%', padding: 20, marginTop: '20px' }}
              value={messages[currentIndex]}
              readOnly={true}
            />
          </Grid>
        )}
      </Container>
    </Box>
  );
};

