// GenerationParamsCard.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Box, Slider, Select, MenuItem, Tooltip } from '@mui/material';
import { FormControl, InputLabel } from '@mui/material';

export const MessageParamsCard = ({genParams, handleChange, setGenParams}) => {

  return (
    <Card variant="outlined" sx={{ backgroundColor: '#4d4d4d', boxShadow: 3 }}>
      <CardContent style={{paddingBottom: "15px"}}>
        <Typography variant="h5">
          Generation Parameters
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="mood-label">Mood</InputLabel>
          <Tooltip title={<h3 style={{maxWidth: "120px", wordBreak: "break-word"}}>How the message should feel</h3>} placement='right' arrow>      
          <Select
            labelId="mood-label"
            id="mood"
            name="mood"
            value={genParams.mood}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="formal">Formal</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="jovial">Jovial</MenuItem>
          </Select>
          </Tooltip>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="num-generations-label">Number of Generations</InputLabel>
          <Tooltip title={<h3 style={{maxWidth: "120px", wordBreak: "break-word"}}>Number of messages to generate</h3>} placement='right' arrow>      
          <Select
            labelId="num-generations-label"
            id="num_generations"
            name="num_generations"
            value={genParams.num_generations}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select></Tooltip>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="length-label">Length</InputLabel>
          <Tooltip title={<h3 style={{maxWidth: "120px", wordBreak: "break-word"}}>Length and verbosity of the message</h3>} placement='right' arrow>      
          <Select
            labelId="length-label"
            id="length"
            name="length"
            value={genParams.length}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="short">Short</MenuItem>
            <MenuItem value="long">Long</MenuItem>
            <MenuItem value="verbose">Verbose</MenuItem>
          </Select></Tooltip>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="readability-label">Readability Level</InputLabel>
          <Tooltip title={<h3 style={{maxWidth: "120px", wordBreak: "break-word"}}>Ease of reading and language used</h3>} placement='right' arrow>      
          <Select
            labelId="readability-label"
            id="readability"
            name="readability"
            value={genParams.readability}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
          </Tooltip>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="medium-label">Medium</InputLabel>
          <Tooltip title={<h3 style={{maxWidth: "120px", wordBreak: "break-word"}}>Medium this message will be sent on</h3>} placement='right' arrow>      
          <Select
            labelId="medium-label"
            id="medium"
            name="medium"
            value={genParams.medium}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="linkedin">Linkedin</MenuItem>
            <MenuItem value="dm">Direct Message</MenuItem>
          </Select></Tooltip>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="language">Language</InputLabel>
          <Tooltip title={<h3 style={{maxWidth: "120px", wordBreak: "break-word"}}>Language of the message</h3>} placement='right' arrow>      
          <Select
            labelId="language"
            id="language"
            name="language"
            value={genParams.language}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="english">English</MenuItem>
            <MenuItem value="spanish">Spanish</MenuItem>
            <MenuItem value="french">French</MenuItem>
            <MenuItem value="hindi">Hindi</MenuItem>
            <MenuItem value="chinese">Chinese</MenuItem>
          </Select>
          </Tooltip>
        </FormControl>
        <Typography variant="caption">
          Creativity
        </Typography>
        <Tooltip title={<h3 style={{maxWidth: "120px", wordBreak: "break-word"}}>How creative I should be with the message</h3>} placement='right' arrow>      
        <Slider
          value={genParams.creativity}
          onChange={(event, newValue) => setGenParams({...genParams, creativity: newValue})}
          step={0.1}
          marks
          min={0}
          max={1}
          valueLabelDisplay="auto"
          sx={{mb:0}}
        />
        </Tooltip>
      </CardContent>
    </Card>
  );
};

