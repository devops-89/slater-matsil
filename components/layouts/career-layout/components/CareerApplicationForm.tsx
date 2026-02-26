import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { field_label_styles, FLAT_TEXTFIELD_STYLES } from "@/utils/styles";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useModal } from "@/store/useModal";

const CareerApplicationForm = () => {
  const { hideModal } = useModal();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString());
  }, []);

  return (
    <Box>
      <Box sx={{ textAlign: "end" }}>
        <IconButton
          sx={{ border: "1px solid " + COLORS.PRIMARY_BLUE }}
          onClick={hideModal}
        >
          <Close />
        </IconButton>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              Name
            </InputLabel>
            <TextField
              sx={{ ...FLAT_TEXTFIELD_STYLES, mt: 2 }}
              placeholder="Enter your full name"
            />
          </Grid>
          {/* <Grid size={{ lg: 6, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              Date submitted
            </InputLabel>
            <TextField
              sx={{
                ...FLAT_TEXTFIELD_STYLES,
                mt: 2,
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
              value={currentDate}
              disabled
            />
          </Grid> */}
          <Grid size={{ lg: 6, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              Position
            </InputLabel>
            <TextField
              sx={{ ...FLAT_TEXTFIELD_STYLES, mt: 2 }}
              placeholder="Enter the position you are applying for"
            />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              Education (highest degree)
            </InputLabel>
            <TextField
              sx={{ ...FLAT_TEXTFIELD_STYLES, mt: 2 }}
              placeholder="e.g., Bachelor's, Master's, PhD"
            />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              Education Major
            </InputLabel>
            <TextField
              sx={{ ...FLAT_TEXTFIELD_STYLES, mt: 2 }}
              placeholder="Your field of study"
            />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              Work Experience (years)
            </InputLabel>
            <TextField
              sx={{ ...FLAT_TEXTFIELD_STYLES, mt: 2 }}
              placeholder="Number of years"
              type="number"
            />
          </Grid>
          <Grid size={12}>
            <Button
              sx={{
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: COLORS.WHITE,
                borderRadius: "10px",
                padding: "10px 34px",
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 500,
                textTransform: "none",
                mt: 2,
              }}
              fullWidth
            >
              Submit Application
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CareerApplicationForm;
