import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, TextareaAutosize, Accordion, AccordionSummary, AccordionDetails, Select, MenuItem,FormControl, InputLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { isPopulated, SERVER_URL } from './utils';

export const History = () => {
  const [messages, setMessages] = useState([]); // You would need to import useState from 'react'
  const [filter, setFilter] = useState("all");
  const [filteredMessages, setFilteredMessages] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch(`${SERVER_URL}/get_all_messages`);
          const data = await response.json();
          console.log("messages: ", data)
          setMessages(data.messages);
        } catch (error) {
          // Handle any error that occurs during the fetch request
          console.error(error);
        }
      };
  
    fetchData();
  }, []); 

  useEffect(() => {
    setFilteredMessages(messages.filter(message => {
      if (filter === "with_feedback") {
        return message.feedback !== "";
      } else if (filter === "without_feedback") {
        return message.feedback === "";
      } else {
        return true;
      }
    }));
  }, [filter, messages]);

  const getCardHeading = (medium, name) => {
    let heading = "";
    switch (medium) {
    case "email":
        heading = "Email to ";
        break;
    case "linkedin":
        heading = "LinkedIn to ";
        break;
    case "dm":
        heading = "DM to ";
        break;
    default:
        heading = "";
    console.log("heading: ", medium, name, heading)
}
return heading + name;
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box sx={{ backgroundColor: '#808080', minHeight: '100vh', p: 3 }}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" sx={{mb:3}}>History</Typography>
        <Box sx={{mb:1, mr:0.5}}>
        <FormControl>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            onChange={handleFilterChange}
            size='small'
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="with_feedback">With Feedback</MenuItem>
            <MenuItem value="without_feedback">Without Feedback</MenuItem>
          </Select>
        </FormControl>
        </Box>
        </Box>
      {isPopulated(filteredMessages) && filteredMessages.map((message, index) => (
        <Box key={index} sx={{ marginBottom: '20px' }}>
          <Card variant="outlined" sx={{ backgroundColor: '#4d4d4d', p: 2 }}>
          <Typography variant="h6">{`${getCardHeading(message.generation_data.medium, message.generation_data.name)}`}</Typography>
            <TextareaAutosize
                minRows={4}
                maxRows={isPopulated(message.feedback) ? 4 : 8}
                style={{ width: '97%', padding: 20, marginTop: '14px', overflow: 'auto' }}
                value={message.content}
                readOnly={true}
            />
            {isPopulated(message.feedback) &&
            <Box sx={{mt:1}}>
            <label style={{ color: '#fff', marginBottom: 0 }}>Feedback:</label>
           
            <TextareaAutosize
                minRows={1}
                maxRows={4}
                style={{ width: '97%', padding: 20, marginTop: '4px', overflow: 'auto' }}
                value={message.feedback}
                readOnly={true}
            />  </Box> }
            <Box sx={{ marginTop: '8px' }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {Object.entries(message.generation_data).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
            </Box>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

