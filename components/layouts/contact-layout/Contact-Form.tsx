import { SERVICES_AREAS_DATA } from "@/public/data/generic-array";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { TEXTFIELD_STYLES } from "@/utils/styles";
import {
  ArrowForward,
  CalendarMonth,
  EmailOutlined,
  Person,
  TimerOutlined,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import Form from "./components/Form";

const ContactForm = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Stack alignItems={"center"} spacing={2}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Typography
              sx={{
                fontSize: 50,
                fontWeight: 700,
                fontFamily: tradeGothic.style.fontFamily,
                lineHeight: "72px",
                color: COLORS.PRIMARY_BLUE,
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "10px",
                  left: "-4px",
                  right: "-8px",
                  height: "20px",
                  backgroundColor: COLORS.PRIMARY_GREEN,
                  opacity: 0.4,
                  zIndex: -1,
                  transform: "rotate(-2deg)",
                  width: 600,
                  borderRadius: 8,
                  //   margin: "auto",
                },
              }}
            >
              Send Us a{" "}
              <Typography
                component={"span"}
                sx={{
                  color: COLORS.BLACK,
                  fontSize: 50,
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  lineHeight: "72px",
                }}
              >
                Message
              </Typography>
            </Typography>
          </Box>
        </Stack>

        <Typography
          sx={{
            fontSize: 24,
            fontFamily: adelle.style.fontFamily,
            width: 860,
            margin: "auto",
            color: COLORS.TEXT_PRIMARY_4,
            textAlign: "center",
            fontWeight: 400,
            lineHeight: "36px",
            mt: 2,
          }}
        >
          ready to protect your intellectual property? Fill out the form below
          and our experts will get back to you within 24 hours.
        </Typography>

        <Box sx={{ mt: 8 }}>
          <Form />
        </Box>
      </Container>
    </Box>
  );
};

export default ContactForm;
