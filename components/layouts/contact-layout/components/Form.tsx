import { UserControllers } from "@/api/userControllers";
import { useNotification } from "@/components/providers/NotificationProvider";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { field_label_styles, FLAT_TEXTFIELD_STYLES } from "@/utils/styles";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputLabel,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import { MuiTelInput } from "mui-tel-input";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  company: Yup.string().required("Company name is required"),
  message: Yup.string().required("Message is required"),
});

const Form = () => {
  const { showNotification } = useNotification();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      company: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const token = recaptchaRef.current?.getValue();

      // if (!token) {
      //   showNotification("Please complete the reCAPTCHA", "error");
      //   setSubmitting(false);
      //   return;
      // }

      try {
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          countryCode: "+1", // Add a default country code if not parsed
          phoneNumber: values.phoneNumber,
          company: values.company,
          message: values.message,
        };
        
        const response = await UserControllers.contactSupport(payload);

        if (response.status === 201 || response.status === 200) {
          showNotification("Message sent successfully!", "success");
          resetForm();
        } else {
          showNotification(
            "Failed to send message. Please try again.",
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
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
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
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
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
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              value={formik.values.phoneNumber}
              onChange={(value) => formik.setFieldValue("phoneNumber", value)}
              onBlur={() => formik.setFieldTouched("phoneNumber", true)}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber &&
                (formik.errors.phoneNumber as string)
              }
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
              id="company"
              name="company"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
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
              id="message"
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />
          </Grid>
          <Grid size={12}>
            {/* <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              />
            </Box> */}
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              sx={{
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: COLORS.WHITE,
                borderRadius: "10px",
                padding: "10px 34px",
                fontSize: 20,
                fontFamily: adelle.style.fontFamily,
                fontWeight: 500,
                textTransform: "none",
                "&.Mui-disabled": {
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  opacity: 0.7,
                  color: COLORS.WHITE,
                },
              }}
              fullWidth
            >
              {formik.isSubmitting ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Sending...
                </Box>
              ) : (
                "Send message"
              )}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Form;
