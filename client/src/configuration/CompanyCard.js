import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Modal,
  TextareaAutosize,
  Tooltip,
  styled,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { SERVER_URL, isPopulated, isSome } from "../utils";
import { toast } from "react-toastify";

const CompanyCard = () => {
  const [companyInfo, setCompanyInfo] = useState({
    company_name: "",
    mission: "",
    motto: "",
    brand_voice: "",
  });

  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [generatedVoice, setGeneratedVoice] = useState("");
  const [generateDisabled, setGenerateDisabled] = useState(false);

  useEffect(() => {
    const getCompanyInfo = async () => {
      const response = await fetch(`${SERVER_URL}/get_company_info`);
      const data = await response.json();
      console.log("get company info", data);
      if (isSome(data.company_info)) {
        setCompanyInfo((prevState) => ({ ...prevState, ...data.company_info }));
      }
    };
    getCompanyInfo();
  }, []);

  const handleChange = (event) => {
    setCompanyInfo({
      ...companyInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (companyData) => {
    console.log("calling submit", companyInfo, companyData);
    const response = await fetch(`${SERVER_URL}/save_company_info`, {
      method: "POST",
      body: JSON.stringify(companyData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    toast.success("Company information saved successfully!");
  };

  const submitDisabled = () => {
    return Object.values(companyInfo).some(
      (value) => value === "" || !isSome(value)
    );
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleGenerateClick = async () => {
    setGenerateDisabled(true);
    toast.info("Generating company voice...", { autoClose: 5000 });
    const response = await fetch(`${SERVER_URL}/generate_company_voice`, {
      method: "POST",
      body: JSON.stringify({ ...companyInfo, description }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    setGeneratedVoice(data.company_voice);
    setGenerateDisabled(false);
  };

  const handleModalSaveClick = async () => {
    const companyData = { ...companyInfo, brand_voice: generatedVoice };
    setCompanyInfo({
      ...companyData,
    });
    console.log(
      "$$$$$$ in handle modal",
      companyInfo,
      companyData,
      generatedVoice
    );
    setOpen(false);
    setDescription("");
    setGeneratedVoice("");
    await handleSubmit(companyData);
  };

  return (
    <Card variant="outlined" sx={{ backgroundColor: "#4d4d4d", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5">Company Information</Typography>
        <Tooltip
          title={
            <h3 style={{ maxWidth: "200px", wordBreak: "break-word" }}>
              Your company's name
            </h3>
          }
          placement="left"
          arrow
        >
          <TextField
            name="company_name"
            label="Company Name"
            placeholder="Enter company name"
            value={companyInfo["company_name"]}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
        </Tooltip>
        <Tooltip
          title={
            <h3 style={{ maxWidth: "200px", wordBreak: "break-word" }}>
              Describe your motto, what you're proud of
            </h3>
          }
          placement="left"
          arrow
        >
          <TextField
            name="motto"
            label="Company Motto"
            placeholder="Enter company motto"
            value={companyInfo["motto"]}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
        </Tooltip>
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
        >
          <Tooltip
            title={
              <h3 style={{ maxWidth: "200px", wordBreak: "break-word" }}>
                Describe your mission, values and culture
              </h3>
            }
            placement="left"
            arrow
          >
            <TextField
              name="mission"
              label="Company Mission"
              placeholder="Enter company missions"
              value={companyInfo["mission"]}
              onChange={handleChange}
              required
              multiline
              minRows={2}
              maxRows={4}
              fullWidth
              margin="normal"
            />
          </Tooltip>
        </Box>
        <Box position="relative">
          <Tooltip
            title={
              <h3 style={{ maxWidth: "200px", wordBreak: "break-word" }}>
                What does your brand represent, <br />I can assist here
              </h3>
            }
            placement="left"
            arrow
          >
            <TextField
              name="brand_voice"
              label="Brand Voice"
              placeholder="Enter brand voice"
              value={companyInfo["brand_voice"]}
              onChange={handleChange}
              required
              multiline
              minRows={2}
              maxRows={4}
              fullWidth
              margin="normal"
            />
          </Tooltip>
          <IconButton
            aria-label="edit"
            color="primary"
            size="small"
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
              paddingLeft: "10px",
            }}
            onClick={() => setOpen(true)}
          >
            <AutoFixHighIcon color="warning" />
          </IconButton>
          <Modal open={open} onClose={() => setOpen(false)}>
            <Box
              sx={{
                width: "50%",
                margin: "auto",
                marginTop: "10%",
                backgroundColor: "#4a4a4a",
                padding: "20px",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                style={{ color: "white" }}
              >
                Ruby Assist
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ color: "white", mt: 1 }}
              >
                Ruby can generate some text for your Brand Voice
              </Typography>
              <TextField
                label="Describe a good day at work, use adjectives and verbs?"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
                sx={{ mt: 3 }}
              />
              {isPopulated(generatedVoice) && (
                <TextareaAutosize
                  minRows={2}
                  maxRows={4}
                  style={{
                    width: "95%",
                    padding: 20,
                    marginTop: "16px",
                    overflow: "auto",
                  }}
                  value={generatedVoice}
                  readOnly={true}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleGenerateClick}
                  sx={{ mr: 1.5 }}
                  disabled={generateDisabled}
                >
                  {isPopulated(generatedVoice) ? "Regenerate" : "Generate"}
                </Button>
                <Button variant="contained" onClick={handleModalSaveClick}>
                  Save
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit(companyInfo)}
            disabled={submitDisabled()}
          >
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
