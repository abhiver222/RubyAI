// GenerationParamsCard.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Box, Slider, Select, MenuItem } from '@mui/material';
import { FormControl, InputLabel } from '@mui/material';

export const GenerationParamsCard = ({genParams, handleChange, setGenParams}) => {


  return (
    <Card variant="outlined" sx={{ backgroundColor: '#4d4d4d', boxShadow: 3 }}>
      <CardContent style={{paddingBottom: "15px"}}>
        <Typography variant="h5">
          Generation Parameters
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="mood-label">Mood</InputLabel>
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
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="num-generations-label">Number of Generations</InputLabel>
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
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="length-label">Length</InputLabel>
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
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="readability-label">Readability Level</InputLabel>
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
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="medium-label">Medium</InputLabel>
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
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="language">Language</InputLabel>
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
        </FormControl>
        <Typography variant="caption">
          Creativity
        </Typography>
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
      </CardContent>
    </Card>
  );
};

