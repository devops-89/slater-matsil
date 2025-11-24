import { SERVICES_AREAS_DATA } from "@/public/data/generic-array";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
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
import star from "@/common/heading-star.png";
import Image from "next/image";

const ContactForm = () => {
  return (
    <Box>
      <Typography
        sx={{
          color: COLORS.PRIMARY_BLUE,
          fontSize: 30,
          fontfamily: adelle.style.fontFamily,
          fontWeight: 600,
        }}
      >
        Let's Connect
      </Typography>

      <Grid container sx={{ mt: 2 }} spacing={4}>
        <Grid size={6}>
          <TextField
            sx={{ ...TEXTFIELD_STYLES }}
            fullWidth
            label="Name"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: COLORS.PRIMARY_BLUE }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            sx={{ ...TEXTFIELD_STYLES }}
            fullWidth
            label="Email"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={{ color: COLORS.PRIMARY_BLUE }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={12}>
          <Autocomplete
            renderInput={(params) => (
              <TextField
                sx={{ ...TEXTFIELD_STYLES }}
                {...params}
                label="Select Service"
              />
            )}
            options={SERVICES_AREAS_DATA.flatMap((area) =>
              area.subCategories.map((sub) => ({
                label: sub.label,
                category: area.category,
              }))
            )}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.label}
            renderGroup={(params) => (
              <li key={params.key}>
                <Box
                  sx={{
                    backgroundColor: COLORS.PRIMARY_BLUE,
                    color: COLORS.WHITE,
                    p: 1,
                    fontWeight: 600,
                    fontFamily: adelle.style.fontFamily,
                  }}
                >
                  {params.group}
                </Box>
                <ul style={{ padding: 0 }}>{params.children}</ul>
              </li>
            )}
            renderOption={(props, option) => {
              return (
                <li
                  {...props}
                  key={option.label}
                  style={{
                    fontFamily: adelle.style.fontFamily,
                    fontSize: 16,
                  }}
                >
                  {option.label}
                </li>
              );
            }}
          />
        </Grid>
        <Grid size={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              slots={{ openPickerIcon: CalendarMonth }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    ...TEXTFIELD_STYLES,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "28px",
                      flexDirection: "row-reverse",
                      paddingLeft: "16px",
                    },
                    "& .MuiInputBase-input": {
                      padding: "18px",
                      paddingLeft: "12px",
                    },
                    "& .MuiSvgIcon-root": {
                      color: COLORS.PRIMARY_BLUE,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "28px",
                    },
                    "& .MuiPickersOutlinedInput-root": {
                      borderRadius: "28px",
                      "& .Mui-focused": {
                        borderColor: COLORS.PRIMARY_BLUE,
                      },
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={6}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
              slots={{ openPickerIcon: TimerOutlined }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    ...TEXTFIELD_STYLES,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "28px",
                      flexDirection: "row-reverse",
                      paddingLeft: "16px",
                    },
                    "& .MuiInputBase-input": {
                      padding: "18px",
                      paddingLeft: "12px",
                    },
                    "& .MuiSvgIcon-root": {
                      color: COLORS.PRIMARY_BLUE,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderRadius: "28px",
                    },
                    "& .MuiPickersOutlinedInput-root": {
                      borderRadius: "28px",
                      "& .Mui-focused": {
                        borderColor: COLORS.PRIMARY_BLUE,
                      },
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{
              ...TEXTFIELD_STYLES,
              height: "auto",
              "& .MuiInputBase-input": {
                padding: 0,
              },
            }}
            multiline
            rows={4}
            label="Message"
          />
        </Grid>
        <Grid size={12}>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: COLORS.PRIMARY_BLUE,
                  "&.Mui-checked": { color: COLORS.PRIMARY_BLUE },
                }}
              />
            }
            label="I agree to all terms and conditions."
            sx={{
              "& .MuiFormControlLabel-label": {
                fontFamily: adelle.style.fontFamily,
                color: COLORS.LABEL_COLOR,
                fontSize: 18,
              },
            }}
          />
        </Grid>
        <Grid size={12}>
          <Button
            sx={{
              backgroundColor: COLORS.PRIMARY_BLUE,
              color: COLORS.WHITE,
              borderRadius: "40px",
              fontFamily: adelle.style.fontFamily,
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "26px",
              width: "100%",
              padding: "15px",
            }}
            endIcon={<ArrowForward />}
          >
            Make an Appointment
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
