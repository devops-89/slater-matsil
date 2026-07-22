import { useModal } from "@/store/useModal";
import { COLORS } from "@/utils/enum";
import { adelle } from "@/utils/fonts";
import { field_label_styles, FLAT_TEXTFIELD_STYLES } from "@/utils/styles";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState, useCallback, useRef } from "react";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { MediaControllers } from "@/api/mediaControllers";

const CareerApplicationForm = () => {
  const { hideModal } = useModal();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [currentDate, setCurrentDate] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file");
    if (!file) return;

    setResume(file);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      
      const res = await MediaControllers.uploadMedia(formData);
      const responseData = res.data?.data?.data || res.data?.data;
      const uploadedKey = responseData?.key || responseData?.url || responseData?.imgUrl;
      
      if (uploadedKey) {
        formik.setFieldValue("resumeUrl", uploadedKey);
      } else {
        console.error("Upload failed: No key returned");
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString());
  }, []);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      position: "",
      education: "",
      educationMajor: "",
      workExperience: "",
      resumeUrl: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      position: Yup.string().required("Position is required"),
      education: Yup.string().required("Education is required"),
      educationMajor: Yup.string().required("Education major is required"),
      workExperience: Yup.string().required("Work experience is required"),
      resumeUrl: Yup.string().required("Resume is required"),
    }),
    onSubmit: async (values) => {
      const token = recaptchaRef.current?.getValue();

      if (!token) {
        alert("Please complete the reCAPTCHA");
        return;
      }

      try {
        console.log("values", values, "recaptchaToken", token);
        // Here you would typically include the token in your API request
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  console.log("formik", formik.values.resumeUrl);
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
      <form onSubmit={formik.handleSubmit}>
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
                id="fullName"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>

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
                id="position"
                name="position"
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.position && Boolean(formik.errors.position)
                }
                helperText={formik.touched.position && formik.errors.position}
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
                id="education"
                name="education"
                value={formik.values.education}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.education && Boolean(formik.errors.education)
                }
                helperText={formik.touched.education && formik.errors.education}
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
                id="educationMajor"
                name="educationMajor"
                value={formik.values.educationMajor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.educationMajor &&
                  Boolean(formik.errors.educationMajor)
                }
                helperText={
                  formik.touched.educationMajor && formik.errors.educationMajor
                }
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
                id="workExperience"
                name="workExperience"
                value={formik.values.workExperience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.workExperience &&
                  Boolean(formik.errors.workExperience)
                }
                helperText={
                  formik.touched.workExperience && formik.errors.workExperience
                }
              />
            </Grid>

            <Grid size={{ lg: 6, xs: 12 }}>
              <InputLabel
                sx={{
                  ...field_label_styles,
                }}
              >
                Upload Resume
              </InputLabel>

              <Button
                variant="outlined"
                component="label"
                sx={{
                  ...FLAT_TEXTFIELD_STYLES,
                  mt: 2,
                  textTransform: "none",
                  justifyContent: "flex-start",
                  height: "56px",
                  border: "1px solid #ccc",
                }}
                fullWidth
              >
                {resume ? resume.name : "Choose file (.pdf, .doc, .docx)"}

                <input
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </Button>
              {formik.touched.resumeUrl && Boolean(formik.errors.resumeUrl) && (
                <FormHelperText error>{formik.errors.resumeUrl}</FormHelperText>
              )}
            </Grid>

            <Grid size={12}>
              <Box
                sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}
              >
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                />
              </Box>
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
                type="submit"
              >
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </Container>
      </form>
    </Box>
  );
};

export default CareerApplicationForm;
