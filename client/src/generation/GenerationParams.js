// GenerationParamsCard.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Box, Slider, Select, MenuItem } from '@mui/material';
import { FormControl, InputLabel } from '@mui/material';

export const GenerationParamsCard = () => {
  const [genParams, setGenParams] = useState({
    creativity: 0.5,
    mood: '',
    numGenerations: 1,
    length: 'short',
    readability: 'easy',
    medium: 'email'
  });

  const handleChange = (event) => {
    setGenParams({
      ...genParams,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Card variant="outlined" sx={{ backgroundColor: '#4d4d4d', boxShadow: 3 }}>
      <CardContent>
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
            id="numGenerations"
            name="numGenerations"
            value={genParams.numGenerations}
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
          <InputLabel id="Medium-label">Medium</InputLabel>
          <Select
            labelId="Medium-label"
            id="Medium"
            name="Medium"
            value={genParams.Medium}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="linkedin">Linkedin</MenuItem>
            <MenuItem value="dm">Direct Message</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ height: 16 }} />
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
        />
      </CardContent>
    </Card>
  );
};

