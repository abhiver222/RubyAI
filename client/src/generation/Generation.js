// Generation.js
import React, { useState } from 'react';
import { Card,Container, Grid, Chip,Button, Box,Tab, Tabs, Typography, TextareaAutosize, Accordion, AccordionSummary, AccordionDetails, IconButton, Tooltip } from '@mui/material';
import {CandidateInfoCard} from './CandidateInfo';
import {MessageParamsCard} from './MessageParams';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { isPopulated, isSome, SERVER_URL } from '../utils';
import {toast} from 'react-toastify';

export const Generation = () => {
  const [messages, setMessages] = useState([
    {
        "message": "Hi Jason,\n\nWe hope this message finds you well. We came across your profile on LinkedIn and were impressed by your extensive experience in the software and internet industry. We believe that you would be a great fit for our Senior Engineer position at abc.com.\n\nAt abc.com, we are on a mission to change the world. Our motto is \"we are the best\" and we truly believe that. We are looking for someone who shares our passion for innovation and making a difference in the world.\n\nAs a Senior Engineer, you would be responsible for coding websites frontend and backends using typescript with node and react js with a graphql api. You would also work closely with our product and design teams to ensure that our products are top-notch.\n\nYour skills in node, react, postgres, graphql, typescript, and javascript make you an ideal candidate for this position. We are looking for someone with seniority of over 6 years, and we believe that your experience at Google would be a great asset to our team.\n\nWe offer a flexible work environment with the option to work remotely or in our San Francisco office. Our dedicated employees foster a culture of collaboration and problem-solving every day. We believe that work should be more than just a job, it should be an opportunity to connect with others, innovate, and make a difference in the world.\n\nWe would love for you to apply for this position and join our team at abc.com. If you have any questions or would like to learn more about our company, please don't hesitate to reach out.\n\nBest regards,\n\nThe abc.com Recruitment Team",
        "message_id": "d89f8bf9-11f4-4a77-b1c4-dcf5016b5d35",
        "readability": {
            "ease": "standard",
            "grade_level": [
                "8",
                "9"
            ],
            "score": 63.652336956521765
        }
    },
    {
        "message": "Hi Jason,\n\nWe hope this message finds you well. We came across your profile on LinkedIn and were impressed by your extensive experience in the industry. We believe that you would be a great fit for our Senior Engineer position at abc.com.\n\nAt abc.com, we are on a mission to change the world. Our motto is \"we are the best\" and we truly believe that. We are looking for someone who shares our passion for innovation and making a difference in the world.\n\nAs a Senior Engineer, you would be responsible for coding websites frontend and backends using typescript with node and react js with a graphql api. You would also work closely with our product and design teams to ensure that our products are top-notch.\n\nYour skills in node, react, postgres, graphql, typescript, and javascript make you an ideal candidate for this position. We are looking for someone with seniority of over 6 years, and we believe that your experience at Google would be a great asset to our team.\n\nWe offer a flexible work environment with the option to work remotely or in our San Francisco office. Our dedicated employees foster a culture of collaboration and problem-solving every day. We believe that work should be more than just a job, it should be an opportunity to connect with others, innovate, and make a difference in the world.\n\nWe would love for you to apply for this position and join our team at abc.com. If you have any questions or would like to learn more about the position, please don't hesitate to reach out.\n\nBest regards,\n\nThe abc.com Recruitment Team",
        "message_id": "1630fbed-dd11-4ca3-a0d6-8dc495112e25",
        "readability": {
            "ease": "standard",
            "grade_level": [
                "8",
                "9"
            ],
            "score": 64.32095810439563
        }
    },
    {
        "message": "Hi Jason,\n\nWe hope this message finds you well. We came across your profile on LinkedIn and were impressed by your extensive experience in the industry. We believe that you would be a great fit for our Senior Engineer position at abc.com.\n\nAt abc.com, we are on a mission to change the world. Our motto is \"we are the best\" and we truly believe that. We are looking for someone who shares our passion for innovation and making a difference in the world.\n\nAs a Senior Engineer, you would be responsible for coding websites frontend and backends using typescript with node and react js with a graphql api. You would also work closely with our product and design teams to ensure that our products are top-notch.\n\nYour skills in node, react, postgres, graphql, typescript, and javascript make you an ideal candidate for this position. We are looking for someone with seniority of over 6 years, and we believe that your experience at Google would be a great asset to our team.\n\nWe offer a flexible work environment with the option to work remotely or in our San Francisco office. Our dedicated employees foster a culture of collaboration and problem-solving every day. We believe that work should be more than just a job, it should be an opportunity to connect with others, innovate, and make a difference in the world.\n\nWe would love for you to apply for this position and join our team at abc.com. If you have any questions or would like to learn more about the position, please don't hesitate to reach out.\n\nBest regards,\n\nThe abc.com Recruitment Team",
        "message_id": "2afed79b-326b-45ab-86f6-d1f951e18717",
        "readability": {
            "ease": "standard",
            "grade_level": [
                "8",
                "9"
            ],
            "score": 64.32095810439563
        }
    }
]);

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
      Generate
    </Typography>
    <Box sx={{mt:1}}>
    <Typography variant="h6">
      Tell me more about the candidate and the kind of message you want to send to generate personalized messages.
    </Typography>
    </Box>
    <Grid container spacing={2} sx={{mt:2}}>
      <Grid item >
        <Accordion defaultExpanded sx={{backgroundColor:'#141414'}}>
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
        {generateDisabled && (<Box sx={{display:"flex", justifyContent: "center", mt: 9}}><div className="loading-image" /></Box>)}
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
            <Box display="flex" justifyContent={isSome(messages[currentIndex].readability) ? "space-between":"flex-end"} m={1} p={1}>
            {isSome(messages[currentIndex].readability) && 
            <Box style={{display:"flex", gap: "4px"}}>
                <Tooltip title={<h3>Readability score is based on the Flesch-Kincaid Grade Level formula. The higher the score, the easier the text is to read.</h3>} placement='top'>
             <Chip label={`Readability score: ${messages[currentIndex].readability.score.toFixed(2)}`} />
             </Tooltip>
                <Chip label={`Ease of reading:  ${messages[currentIndex].readability.ease}`} />
                <Chip label={`Grade Levels: ${messages[currentIndex].readability.grade_level.join(', ')}`} />
                </Box>}
            <Box>
            <Box sx={{right: 0}}>
            <Button variant="contained" color="primary" onClick={handleSubmitFeedback} disabled={!isPopulated(feedbacks[currentIndex])} sx={{ marginRight: "10px" }}>
                Submit Feedback
            </Button>
            <Button variant="contained" color="primary" onClick={handleSendMessage}>
            Send Message
            </Button>
            </Box>
            </Box>
      </Box>
          </Grid>
          </Card>
        )}
      </Container>
    </Box>
  );
};

