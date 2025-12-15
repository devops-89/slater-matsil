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

const ContactForm = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Stack alignItems={"center"} spacing={2}>
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Typography
              sx={{
                color: COLORS.PRIMARY_BLUE,
                fontSize: "50px",
                fontWeight: 700,
                lineHeight: "72px",
                fontFamily: tradeGothic.style.fontFamily,
                textAlign: "center",
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
            <Box
              sx={{
                position: "absolute",
                bottom: -10,
                left: 0,
                right: 0,
                height: "8px",
                backgroundColor: COLORS.PRIMARY_LIGHT_GREEN,
                borderRadius: "4px",
                rotate: "-3deg",
              }}
            />
          </Box>
        </Stack>

        <Typography sx={{ fontSize: 24, fontFamily: adelle.style.fontFamily }}>
          ready to protect your intellectual property? Fill out the form below
          and our experts will get back to you within 24 hours.
        </Typography>

        {/* Contact Form */}
        <Box sx={{ mt: 8 }}></Box>
      </Container>
    </Box>
  );
};

export default ContactForm;
