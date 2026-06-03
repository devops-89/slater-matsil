import { useNotification } from "@/components/providers/NotificationProvider";
import { SERVICES_AREAS_DATA } from "@/public/data/generic-array";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { TEXTFIELD_STYLES } from "@/utils/styles";
import {
  ArrowForward,
  CalendarMonth,
  EmailOutlined,
  Person
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useFormik } from "formik";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  service: Yup.object().nullable().required("Service is required"),
  date: Yup.mixed().nullable().required("Date is required"),
  // time: Yup.mixed().nullable().required("Time is required"),
  message: Yup.string().required("Message is required"),
  terms: Yup.boolean().oneOf([true], "You must agree to the terms"),
});

const ContactForm = () => {
  const { showNotification } = useNotification();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      service: null,
      date: null,
      message: "",
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const token = recaptchaRef.current?.getValue();

      if (!token) {
        showNotification("Please complete the reCAPTCHA", "error");
        setSubmitting(false);
        return;
      }

      try {
        const response = await fetch("/api/appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, recaptchaToken: token }),
        });

        if (response.ok) {
          showNotification("Appointment requested successfully!", "success");
          resetForm();
        } else {
          showNotification(
            "Failed to request appointment. Please try again.",
            "error",
          );
        }
      } catch (error) {
        console.error("Submission error:", error);
        showNotification(
          "Something went wrong. Please check your connection.",
          "error",
        );
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
        <Grid size={{ sm: 6, xs: 12 }}>
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
        <Grid size={{ sm: 6, xs: 12 }}>
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
        <Grid size={12}>
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
        {/* <Grid size={6}>
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
        </Grid> */}
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
          <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}>
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            />
          )}
          </Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
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
              "&.Mui-disabled": {
                backgroundColor: COLORS.PRIMARY_BLUE,
                opacity: 0.7,
                color: COLORS.WHITE,
              },
            }}
            endIcon={
              formik.isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <ArrowForward />
              )
            }
          >
            {formik.isSubmitting ? "Processing..." : "Make an Appointment"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
