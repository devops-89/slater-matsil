"use client";
import { CareerControllers } from "@/api/careerControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { Visibility, Close, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

export default function ManageCareersAdminLayout() {
  const { startLoading, stopLoading } = useLoading();
  const { showNotification } = useNotification();
  const [applications, setApplications] = useState<Record<string, any>[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Record<string, any> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | number | null>(null);

  const fetchApplications = async (showLoader = true) => {
    try {
      if (showLoader) startLoading();
      const res = await CareerControllers.getAllCareers();
      const fetched = res.data?.data || res.data || [];
      if (Array.isArray(fetched)) {
        setApplications(fetched);
      } else {
        setApplications([]);
      }
    } catch (e: unknown) {
      console.error(e);
      showNotification("Failed to fetch careers applications", "error");
    } finally {
      if (showLoader) stopLoading();
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleView = async (application: Record<string, any>) => {
    try {
      startLoading();
      const res = await CareerControllers.getCareerById(application.id);
      const fetched = res.data?.data || res.data || application;
      setSelectedApplication(fetched);
      setDialogOpen(true);
    } catch (error) {
      console.error(error);
      showNotification("Failed to fetch application details", "error");
      setSelectedApplication(application);
      setDialogOpen(true);
    } finally {
      stopLoading();
    }
  };

  const handleDeleteClick = (id: string | number) => {
    setApplicationToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!applicationToDelete) return;
    try {
      startLoading();
      await CareerControllers.deleteCareer(applicationToDelete);
      showNotification("Application deleted successfully", "success");
      setDeleteModalOpen(false);
      setApplicationToDelete(null);
      fetchApplications(false);
    } catch (error) {
      console.error(error);
      showNotification("Failed to delete application", "error");
    } finally {
      stopLoading();
    }
  };

  return (
    <AdminLayout title="Careers Applications">
      <Box sx={{ mb: 4 }}></Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          {applications.length === 0 ? (
            <Box
              sx={{
                py: 8,
                textAlign: "center",
                border: `1px solid rgba(0,0,0,0.1)`,
                borderRadius: 4,
                backgroundColor: COLORS.OFF_WHITE,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: tradeGothic.style.fontFamily,
                  color: COLORS.PRIMARY_BLUE,
                }}
              >
                No applications found.
              </Typography>
            </Box>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 4,
                border: `1px solid rgba(0,0,0,0.1)`,
                boxShadow: "none",
                overflowX: "auto",
              }}
            >
              <Table sx={{ minWidth: 800 }}>
                <TableHead sx={{ backgroundColor: COLORS.OFF_WHITE }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontFamily: tradeGothic.style.fontFamily,
                        fontWeight: 700,
                        color: COLORS.PRIMARY_BLUE,
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: tradeGothic.style.fontFamily,
                        fontWeight: 700,
                        color: COLORS.PRIMARY_BLUE,
                      }}
                    >
                      Position
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: tradeGothic.style.fontFamily,
                        fontWeight: 700,
                        color: COLORS.PRIMARY_BLUE,
                      }}
                    >
                      Highest Degree
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: tradeGothic.style.fontFamily,
                        fontWeight: 700,
                        color: COLORS.PRIMARY_BLUE,
                      }}
                    >
                      Experience (Yrs)
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontFamily: tradeGothic.style.fontFamily,
                        fontWeight: 700,
                        color: COLORS.PRIMARY_BLUE,
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((application, idx) => (
                    <TableRow
                      key={application.id || idx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Typography
                          sx={{
                            fontFamily: tradeGothic.style.fontFamily,
                            fontWeight: 700,
                            fontSize: 16,
                            color: COLORS.PRIMARY_BLUE,
                          }}
                        >
                          {application.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{application.position}</TableCell>
                      <TableCell>{application.highestDegree}</TableCell>
                      <TableCell>{application.workExperience}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleView(application)}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteClick(application.id)}
                          sx={{ ml: 1 }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 4, m: 2 } } }}
      >
        <DialogTitle
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: tradeGothic.style.fontFamily,
              color: COLORS.PRIMARY_BLUE,
              fontWeight: 700,
            }}
          >
            Application Details
          </Typography>
          <IconButton onClick={() => setDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedApplication && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Name</Typography>
                <Typography variant="body1">{selectedApplication.name}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Position</Typography>
                <Typography variant="body1">{selectedApplication.position}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Highest Degree</Typography>
                <Typography variant="body1">{selectedApplication.highestDegree}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Education Major</Typography>
                <Typography variant="body1">{selectedApplication.educationMajor}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Work Experience (Years)</Typography>
                <Typography variant="body1">{selectedApplication.workExperience}</Typography>
              </Box>
              {selectedApplication.resumeDownloadUrl && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    href={selectedApplication.resumeDownloadUrl}
                    target="_blank"
                    sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}
                  >
                    Download / View Resume
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)} variant="contained" sx={{ backgroundColor: COLORS.PRIMARY_BLUE }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)}
        slotProps={{ paper: { sx: { borderRadius: 4, p: 2 } } }}
      >
        <DialogTitle sx={{ fontFamily: tradeGothic.style.fontFamily, color: COLORS.PRIMARY_BLUE, fontWeight: 700 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this career application? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)} color="inherit">No, Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Yes, Delete</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
