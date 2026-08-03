"use client";
import { UserControllers } from "@/api/userControllers";
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

export default function ContactSupportAdminLayout() {
  const { startLoading, stopLoading } = useLoading();
  const { showNotification } = useNotification();
  const [inquiries, setInquiries] = useState<Record<string, any>[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Record<string, any> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState<string | number | null>(null);

  const fetchInquiries = async (showLoader = true) => {
    try {
      if (showLoader) startLoading();
      const res = await UserControllers.getAllContactSupports();
      const fetched = res.data?.data?.data || res.data?.data || [];
      // If the API returns an object with a specific array property, adjust accordingly. 
      // e.g. res.data?.data?.data?.supports
      if (Array.isArray(fetched)) {
        setInquiries(fetched);
      } else if (fetched.supports && Array.isArray(fetched.supports)) {
        setInquiries(fetched.supports);
      } else {
         // Fallback if data structure is unknown
        setInquiries(Array.isArray(res.data) ? res.data : []);
      }
    } catch (e: unknown) {
      console.error(e);
      showNotification("Failed to fetch support inquiries", "error");
    } finally {
      if (showLoader) stopLoading();
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleView = async (inquiry: Record<string, any>) => {
    try {
      startLoading();
      const res = await UserControllers.getContactSupportById(inquiry.id);
      const fetched = res.data?.data?.data || res.data?.data || res.data || inquiry;
      setSelectedInquiry(fetched);
      setDialogOpen(true);
    } catch (error) {
      console.error(error);
      showNotification("Failed to fetch inquiry details", "error");
      // Fallback to local row data if API fails
      setSelectedInquiry(inquiry);
      setDialogOpen(true);
    } finally {
      stopLoading();
    }
  };

  const handleDeleteClick = (id: string | number) => {
    setInquiryToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!inquiryToDelete) return;
    try {
      startLoading();
      await UserControllers.deleteContactSupport(inquiryToDelete);
      showNotification("Inquiry deleted successfully", "success");
      setDeleteModalOpen(false);
      setInquiryToDelete(null);
      fetchInquiries(false);
    } catch (error) {
      console.error(error);
      showNotification("Failed to delete inquiry", "error");
    } finally {
      stopLoading();
    }
  };

  return (
    <AdminLayout title="Support Inquiries">
      <Box sx={{ mb: 4 }}></Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          {inquiries.length === 0 ? (
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
                No inquiries found.
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
                      Email
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
                  {inquiries.map((inquiry, idx) => (
                    <TableRow
                      key={inquiry.id || idx}
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
                          {inquiry.name || `${inquiry.firstName || ''} ${inquiry.lastName || ''}`.trim() || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>{inquiry.email || 'N/A'}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleView(inquiry)}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDeleteClick(inquiry.id)}
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
            Inquiry Details
          </Typography>
          <IconButton onClick={() => setDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedInquiry && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {(selectedInquiry.name || selectedInquiry.firstName || selectedInquiry.lastName) && (
                <Box>
                  <Typography variant="caption" color="text.secondary">Name</Typography>
                  <Typography variant="body1">{selectedInquiry.name || `${selectedInquiry.firstName || ''} ${selectedInquiry.lastName || ''}`.trim()}</Typography>
                </Box>
              )}
              {selectedInquiry.email && (
                <Box>
                  <Typography variant="caption" color="text.secondary">Email</Typography>
                  <Typography variant="body1">{selectedInquiry.email}</Typography>
                </Box>
              )}
              {selectedInquiry.phoneNumber && (
                <Box>
                  <Typography variant="caption" color="text.secondary">Phone</Typography>
                  <Typography variant="body1">
                    {selectedInquiry.countryCode && selectedInquiry.phoneNumber.startsWith(selectedInquiry.countryCode) 
                      ? selectedInquiry.phoneNumber 
                      : `${selectedInquiry.countryCode || ''} ${selectedInquiry.phoneNumber}`.trim()}
                  </Typography>
                </Box>
              )}
              {selectedInquiry.company && (
                <Box>
                  <Typography variant="caption" color="text.secondary">Company</Typography>
                  <Typography variant="body1">{selectedInquiry.company}</Typography>
                </Box>
              )}
              {selectedInquiry.service && (
                <Box>
                  <Typography variant="caption" color="text.secondary">Service</Typography>
                  <Typography variant="body1">{selectedInquiry.service}</Typography>
                </Box>
              )}
              {selectedInquiry.appointmentDate && (
                <Box>
                  <Typography variant="caption" color="text.secondary">Appointment Date</Typography>
                  <Typography variant="body1">{selectedInquiry.appointmentDate}</Typography>
                </Box>
              )}
              {selectedInquiry.message && (
                <Box>
                  <Typography variant="caption" color="text.secondary">Message</Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      whiteSpace: "pre-wrap", 
                      backgroundColor: COLORS.OFF_WHITE, 
                      p: 2, 
                      borderRadius: 2, 
                      mt: 1 
                    }}
                  >
                    {selectedInquiry.message}
                  </Typography>
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
          <Typography>Are you sure you want to delete this support inquiry? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)} color="inherit">No, Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Yes, Delete</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}
