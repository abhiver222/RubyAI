import React, { useState } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { CandidateInfoCard } from "./CandidateInfo";
import { MessageParamsCard } from "./MessageParams";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isPopulated, isSome, SERVER_URL, sendPostRequest } from "../utils";
import { toast } from "react-toastify";
import { MessageDisplayCard } from "./MessageDisplayCard";

export const Generation = () => {
  const [messages, setMessages] = useState([]);

  const [generateDisabled, setGenerateDisabled] = useState(false);

  const [candidateInfo, setCandidateInfo] = useState({
    name: "",
    candidate_company: "",
    industry: "",
    company_url: "",
    linkedin_url: "",
    bio: "",
  });

  const [genParams, setGenParams] = useState({
    creativity: 0.5,
    mood: "formal",
    num_generations: 1,
    length: "short",
    readability: "easy",
    medium: "email",
    language: "english",
  });

  const handleCandidateChange = (event) => {
    setCandidateInfo({
      ...candidateInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleGenParamsChange = (event) => {
    setGenParams({
      ...genParams,
      [event.target.name]: event.target.value,
    });
  };

  const generateButtonDisabled = () => {
    return (
      generateDisabled ||
      Object.values(candidateInfo).some(
        (value) => value === "" || !isSome(value)
      ) ||
      Object.values(genParams).some((value) => value === "" || !isSome(value))
    );
  };

  const handleGenerate = async () => {
    setGenerateDisabled(true);
    setMessages([]);
    toast.info("Generating messages, this might take a few seconds...", {
      autoClose: 5000,
    });
    const { messageData } = await sendPostRequest(
      `${SERVER_URL}/generate_messages`,
      { ...candidateInfo, ...genParams },
      "Messages generated!",
      "Unable to generate messages"
    );
    if (isSome(messageData)) {
      setMessages(messageData);
    }
    setGenerateDisabled(false);
  };

  return (
    <Box sx={{ backgroundColor: "#808080", minHeight: "100vh", p: 3 }}>
      <Container style={{ width: "100%", maxWidth: "1500px" }}>
        <Typography variant="h3">Generate</Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6">
            Tell me more about the candidate and the kind of message you want to
            send to generate personalized messages.
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Accordion defaultExpanded sx={{ backgroundColor: "#141414" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="generation-params-content"
                id="generation-params-header"
                sx={{
                  "& .MuiAccordionSummary-content": {
                    justifyContent: "space-between",
                  },
                }}
              >
                <Typography variant="h5" style={{ marginTop: "4px" }}>
                  Generation Parameters
                </Typography>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleGenerate}
                  size="large"
                  style={{ marginRight: "20px" }}
                  disabled={generateButtonDisabled()}
                >
                  Generate
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CandidateInfoCard
                      candidateInfo={candidateInfo}
                      handleChange={handleCandidateChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MessageParamsCard
                      genParams={genParams}
                      handleChange={handleGenParamsChange}
                      setGenParams={setGenParams}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        {generateDisabled && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 9 }}>
            <div className="loading-image" />
          </Box>
        )}
        {isPopulated(messages) && <MessageDisplayCard messages={messages} />}
      </Container>
    </Box>
  );
};
