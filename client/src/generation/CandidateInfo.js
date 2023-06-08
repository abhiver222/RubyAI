import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Tooltip,
} from "@mui/material";

export const CandidateInfoCard = ({ candidateInfo, handleChange }) => {
  const field_to_metadata = {
    name: { label: "Name", tooltip: "Candidate's name" },
    candidate_company: {
      label: "Company",
      tooltip: "Candidate's current company",
    },
    industry: {
      label: "Industry",
      tooltip: "Candidate's industry of expertise",
    },
    company_url: {
      label: "Company URL",
      tooltip: "Candidate's company's website",
    },
    linkedin_url: {
      label: "LinkedIn URL",
      tooltip: "Candidate's LinkedIn profile",
    },
    bio: { label: "Bio", tooltip: "Candidate's bio, be descriptive" },
  };
  return (
    <Card variant="outlined" sx={{ backgroundColor: "#4d4d4d", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5">Candidate Information</Typography>
        {Object.keys(candidateInfo).map((field) => (
          <Tooltip
            title={
              <h3 style={{ maxWidth: "120px", wordBreak: "break-word" }}>
                {field_to_metadata[field].tooltip}
              </h3>
            }
            placement="left"
            arrow
          >
            <TextField
              key={field}
              name={field}
              label={field_to_metadata[field].label}
              placeholder={`Enter ${field}`}
              value={candidateInfo[field]}
              onChange={handleChange}
              required
              multiline={field === "bio"}
              minRows={field === "bio" ? 3 : undefined}
              maxRows={field === "bio" ? 4 : undefined}
              fullWidth
              margin="normal"
            />
          </Tooltip>
        ))}
      </CardContent>
    </Card>
  );
};
