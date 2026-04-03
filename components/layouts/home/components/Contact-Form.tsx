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
  TextField,
  Typography,
  FormControl,
  FormHelperText,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  service: Yup.object().nullable().required("Service is required"),
  date: Yup.mixed().nullable().required("Date is required"),
  time: Yup.mixed().nullable().required("Time is required"),
  message: Yup.string().required("Message is required"),
  terms: Yup.boolean().oneOf([true], "You must agree to the terms"),
});

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      service: null,
      date: null,
      time: null,
      message: "",
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await fetch("/api/appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // alert("Appointment requested successfully!");
          resetForm();
        } else {
          // alert("Failed to request appointment. Please try again.");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("Something went wrong. Please check your connection.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
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

      <Grid container sx={{ mt: 2 }} spacing={3}>
        <Grid size={6}>
          <TextField
            sx={{ ...TEXTFIELD_STYLES }}
            fullWidth
            label="Name"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
            value={formik.values.service}
            onChange={(e, value) => formik.setFieldValue("service", value)}
            onBlur={() => formik.setFieldTouched("service", true)}
            renderInput={(params) => (
              <TextField
                sx={{ ...TEXTFIELD_STYLES }}
                {...params}
                label="Select Service"
                error={formik.touched.service && Boolean(formik.errors.service)}
                helperText={
                  formik.touched.service && (formik.errors.service as string)
                }
              />
            )}
            options={SERVICES_AREAS_DATA.flatMap((area) =>
              area.subCategories.map((sub) => ({
                label: sub.label,
                category: area.category,
              })),
            )}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.label === value?.label
            }
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
              value={formik.values.date}
              onChange={(value) => formik.setFieldValue("date", value)}
              slots={{ openPickerIcon: CalendarMonth }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  onBlur: () => formik.setFieldTouched("date", true),
                  error: formik.touched.date && Boolean(formik.errors.date),
                  helperText:
                    formik.touched.date && (formik.errors.date as string),
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
              value={formik.values.time}
              onChange={(value) => formik.setFieldValue("time", value)}
              slots={{ openPickerIcon: TimerOutlined }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  onBlur: () => formik.setFieldTouched("time", true),
                  error: formik.touched.time && Boolean(formik.errors.time),
                  helperText:
                    formik.touched.time && (formik.errors.time as string),
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
            id="message"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
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
          <FormControl
            error={formik.touched.terms && Boolean(formik.errors.terms)}
          >
            <FormControlLabel
              control={
                <Checkbox
                  id="terms"
                  name="terms"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
            {formik.touched.terms && formik.errors.terms && (
              <FormHelperText>{formik.errors.terms as string}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid size={12}>
          <Button
            type="submit"
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
