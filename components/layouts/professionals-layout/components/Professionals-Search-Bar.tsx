import { COLORS } from "@/utils/enum";
import { TEXTFIELD_STYLES } from "@/utils/styles";
import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");

const ProfessionalSearchBar = () => {
  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={7} margin="auto">
            <TextField
              placeholder="Search by First/Last Name"
              sx={{
                ...TEXTFIELD_STYLES,
                mb: 2,
              }}
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{
                          backgroundColor: COLORS.PRIMARY_BLUE,
                          borderRadius: "15px",
                          ":hover": {
                            backgroundColor: COLORS.PRIMARY_BLUE,
                          },
                          color: COLORS.WHITE,
                        }}
                      >
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Stack
              direction="row"
              alignItems={"center"}
              spacing={1}
              justifyContent={"center"}
              sx={{ mt: 1 }}
            >
              {ALPHABETS.map((letter) => (
                <Typography
                  key={letter}
                  sx={{
                    cursor: "pointer",
                    fontSize: 18,
                    fontWeight: 500,
                    color: COLORS.TEXT_TERTIARY,
                    textTransform: "lowercase",
                    "&:hover": {
                      color: COLORS.PRIMARY_BLUE,
                      fontWeight: 700,
                    },
                    textAlign: "center",
                  }}
                >
                  {letter}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfessionalSearchBar;
