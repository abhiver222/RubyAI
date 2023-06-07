// Generation.js
import React, { useState } from 'react';
import { Card,Container, Grid, Button, Box,Tab, Tabs, Typography, TextareaAutosize, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import {CandidateInfoCard} from './CandidateInfo';
import {MessageParamsCard} from './MessageParams';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { isPopulated, isSome, SERVER_URL } from '../utils';
import {toast} from 'react-toastify';

export const Generation = () => {
  const [display, setDisplay] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState(Array(messages.length).fill(''));
  const [generateDisabled, setGenerateDisabled] = useState(false);


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
    medium: 'email',
    language: 'english',
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

  const handleFeedbackChange = (index, e) => {
    let newFeedbacks = [...feedbacks];
    newFeedbacks[index] = e.target.value;
    setFeedbacks(newFeedbacks);
  }

  const generateButtonDisabled = () =>{
    return generateDisabled || Object.values(candidateInfo).some((value) => value === '' || !isSome(value)) || Object.values(genParams).some((value) => value === '' || !isSome(value)) 
  }

  const handleGenerate = async () => {
    try {
        setGenerateDisabled(true);
        toast.info("Generating messages...", {autoClose: 5000});
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
        //   const messages = messageData.map((message) => message.message);
          console.log("resp data", messageData, message);
            setMessages(messageData);
        } else {
            const {message} = await response.json()
          console.error("Unable to call server", message);
        }
      } catch (e) {
        console.error("Unable to call server", e);
      }
      setGenerateDisabled(false);
  }

  const handleTabChange = (index) => {
    setCurrentIndex(index);
  }

  const handleSendMessage = async () => {
    // get message at current selected index
    // send messageid to backend
    const {message_id} = messages[currentIndex]
    console.log("sending message messageId", message_id);
    try {        
        const response = await fetch(`${SERVER_URL}/send_message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message_id }),
        });
        if (response.ok) {
          toast.success("Message sent!");
          console.log("send email", response);
          const { message, messageId } = await response.json();
          console.log("resp data", message_id, message);
        } else {
            const {message} = await response.json()
          console.error("Unable to call server", message);
        }
      } catch (e) {
        console.error("Unable to call server", e);
      }
  }

  const handleSubmitFeedback = async () => {
    // get feedback at current selected index
    // get email at current selected index
    // send feedback and messageid to backend
    const {message_id} = messages[currentIndex]
    const feedback = feedbacks[currentIndex];
    try {
        const response = await fetch(`${SERVER_URL}/submit_feedback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message_id, feedback }),
        });
        if (response.ok) {
          console.log("send feedback", response);
          toast.success("Feedback submitted!");
          const { message, messageId } = await response.json();
          console.log("resp data", message_id, message);
        } else {
            const {message} = await response.json()
          console.error("Unable to call server", message);
        }
      } catch (e) {
        console.error("Unable to call server", e);
      }
  }

  const handleCopyClick = () => {
    const {message} = messages[currentIndex];
    if(isPopulated(message)){
        navigator.clipboard.writeText(message);
        toast.success("Copied to clipboard!");
    }
  };

  return (
    <Box sx={{ backgroundColor: '#808080', minHeight: '100vh', p: 3 }}>
      <Container style={{width: "100%", maxWidth: "1500px"}}>
      <Typography variant="h3">
      Generation
    </Typography>
    <Box sx={{mt:1}}>
    <Typography variant="h6">
      Tell me more about the candidate and the kind of message you want to send to generate personlaized messages.
    </Typography>
    </Box>
    <Grid container spacing={2} sx={{mt:2}}>
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
            <Button variant="contained" color="warning" onClick={handleGenerate} size='large' style={{marginRight: "20px"}} disabled={generateButtonDisabled()}>
            Generate
          </Button>         
        </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CandidateInfoCard candidateInfo={candidateInfo} handleChange={handleCandidateChange}/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MessageParamsCard genParams={genParams} handleChange={handleGenParamsChange} setGenParams={setGenParams}/>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

      </Grid>
    </Grid>
        {isPopulated(messages) && (
            <Card variant="outlined" sx={{ backgroundColor: '#4d4d4d', boxShadow: 3, p: 2, mt: 4 }}>
          <Grid item xs={12}>
            <Tabs value={currentIndex} >
              {messages.map((_, index) => (
                  <Tab key={index} label={`Message ${index + 1}`} onClick={() => handleTabChange(index)}/>
              ))}
            </Tabs>
            <Box position="relative">
                <TextareaAutosize
                minRows={15}
                style={{ width: '97%',padding: 20,  marginTop: '20px'}}
                value={messages[currentIndex].message}
                readOnly={true}
                />
                <IconButton aria-label="copy" color="primary" size="small" sx={{ position: 'absolute', top: 25, right: 3 }} onClick={handleCopyClick}>
                    <ContentCopyIcon />
                </IconButton>
            </Box>
            <TextareaAutosize
                minRows={3}
                maxRows={6}
                placeholder="Your feedback here..."
                style={{ width: '97%', padding: 20, marginTop: '20px', marginBottom: '20px', marginRight: '20px', overflow:'auto' }}
                value={feedbacks[currentIndex]}
                onChange={(e) => handleFeedbackChange(currentIndex, e)}
                />
            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
            <Button variant="contained" color="primary" onClick={handleSubmitFeedback} disabled={!isPopulated(feedbacks[currentIndex])} sx={{ marginRight: "10px" }}>
                Submit Feedback
            </Button>
            <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Send Message
            </Button>
      </Box>
          </Grid>
          </Card>
        )}
      </Container>
    </Box>
  );
};

