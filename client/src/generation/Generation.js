import React, { useState } from "react";
import {
  Card,
  Container,
  Grid,
  Chip,
  Button,
  Box,
  Tab,
  Tabs,
  Typography,
  TextareaAutosize,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CandidateInfoCard } from "./CandidateInfo";
import { MessageParamsCard } from "./MessageParams";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { isPopulated, isSome, SERVER_URL, sendPostRequest } from "../utils";
import { toast } from "react-toastify";

export const Generation = () => {
  const [messages, setMessages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState(Array(messages.length).fill(""));
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

  const handleFeedbackChange = (index, e) => {
    let newFeedbacks = [...feedbacks];
    newFeedbacks[index] = e.target.value;
    setFeedbacks(newFeedbacks);
  };

  const handleTabChange = (index) => {
    setCurrentIndex(index);
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

  const handleSendMessage = async () => {
    // get message at current selected index
    // send messageid to backend to send
    const { message_id } = messages[currentIndex];
    await sendPostRequest(
      `${SERVER_URL}/send_message`,
      { message_id },
      "Message sent!",
      "Unable to send message"
    );
  };

  const handleSubmitFeedback = async () => {
    // get feedback at current selected index
    // get email at current selected index
    // send feedback and messageid to backend
    const { message_id } = messages[currentIndex];
    const feedback = feedbacks[currentIndex];
    await sendPostRequest(
      `${SERVER_URL}/submit_feedback`,
      { message_id, feedback },
      "Feedback submitted!",
      "Unable to submit feedback"
    );
  };

  const handleCopyClick = () => {
    const { message } = messages[currentIndex];
    if (isPopulated(message)) {
      navigator.clipboard.writeText(message);
      toast.success("Copied to clipboard!");
    }
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
        {isPopulated(messages) && (
          <Card
            variant="outlined"
            sx={{ backgroundColor: "#4d4d4d", boxShadow: 3, p: 2, mt: 4 }}
          >
            <Grid item xs={12}>
              <Tabs value={currentIndex}>
                {messages.map((_, index) => (
                  <Tab
                    key={index}
                    label={`Message ${index + 1}`}
                    onClick={() => handleTabChange(index)}
                  />
                ))}
              </Tabs>
              <Box position="relative">
                <TextareaAutosize
                  minRows={15}
                  style={{ width: "97%", padding: 20, marginTop: "20px" }}
                  value={messages[currentIndex].message}
                  readOnly={true}
                />
                <IconButton
                  aria-label="copy"
                  color="primary"
                  size="small"
                  sx={{ position: "absolute", top: 25, right: 3 }}
                  onClick={handleCopyClick}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
              <TextareaAutosize
                minRows={3}
                maxRows={6}
                placeholder="Your feedback here..."
                style={{
                  width: "97%",
                  padding: 20,
                  marginTop: "20px",
                  marginBottom: "20px",
                  marginRight: "20px",
                  overflow: "auto",
                }}
                value={feedbacks[currentIndex]}
                onChange={(e) => handleFeedbackChange(currentIndex, e)}
              />
              <Box
                display="flex"
                justifyContent={
                  isSome(messages[currentIndex].readability)
                    ? "space-between"
                    : "flex-end"
                }
                m={1}
                p={1}
              >
                {isSome(messages[currentIndex].readability) && (
                  <Box style={{ display: "flex", gap: "4px" }}>
                    <Tooltip
                      title={
                        <h3>
                          Readability score is based on the Flesch-Kincaid Grade
                          Level formula. The higher the score, the easier the
                          text is to read.
                        </h3>
                      }
                      placement="top"
                    >
                      <Chip
                        label={`Readability score: ${messages[
                          currentIndex
                        ].readability.score.toFixed(2)}`}
                      />
                    </Tooltip>
                    <Chip
                      label={`Ease of reading:  ${messages[currentIndex].readability.ease}`}
                    />
                    <Chip
                      label={`Grade Levels: ${messages[
                        currentIndex
                      ].readability.grade_level.join(", ")}`}
                    />
                  </Box>
                )}
                <Box>
                  <Box sx={{ right: 0 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitFeedback}
                      disabled={!isPopulated(feedbacks[currentIndex])}
                      sx={{ marginRight: "10px" }}
                    >
                      Submit Feedback
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSendMessage}
                    >
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
