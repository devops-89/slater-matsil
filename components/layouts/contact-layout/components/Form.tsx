import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { field_label_styles, FLAT_TEXTFIELD_STYLES } from "@/utils/styles";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import React from "react";
import { MuiTelInput } from "mui-tel-input";
const Form = () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              First Name
            </InputLabel>
            <TextField
              sx={{ ...FLAT_TEXTFIELD_STYLES, mt: 2 }}
              placeholder="Enter your first name"
            />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              Last Name
            </InputLabel>
            <TextField
              sx={{ ...FLAT_TEXTFIELD_STYLES, mt: 2 }}
              placeholder="Enter your last name"
            />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              Email Address
            </InputLabel>
            <TextField
              sx={{ ...FLAT_TEXTFIELD_STYLES, mt: 2 }}
              placeholder="Enter your email address"
            />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              Phone Number
            </InputLabel>
            <MuiTelInput
              sx={{ ...FLAT_TEXTFIELD_STYLES, mt: 2 }}
              defaultCountry="US"
              placeholder="+1 (555) 123-4567"
            />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              Company/Organization
            </InputLabel>
            <TextField
              sx={{ ...FLAT_TEXTFIELD_STYLES, mt: 2 }}
              placeholder="Your company name"
            />
          </Grid>
          <Grid size={{ lg: 12, xs: 12 }}>
            <InputLabel
              sx={{
                ...field_label_styles,
              }}
            >
              Message
            </InputLabel>
            <TextField
              sx={{
                ...FLAT_TEXTFIELD_STYLES,
                mt: 2,
                fieldset: {
                  height: 180,
                  p: 0,
                },
                "& .MuiOutlinedInput-input": {
                  height: "150px !important",
                  p: 0,
                },
              }}
              multiline
              placeholder="Please provide details about your intellectual property needs..."
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
              }}
              fullWidth
            >
              Send message
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Form;
