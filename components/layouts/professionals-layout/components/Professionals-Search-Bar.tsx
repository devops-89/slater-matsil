import { COLORS } from "@/utils/enum";
import { TEXTFIELD_STYLES } from "@/utils/styles";
import { Search } from "@mui/icons-material";
import {
  Autocomplete,
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
import { useState } from "react";

const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");

interface ProfessionalSearchBarProps {
  search: string;
  setSearch: (val: string) => void;
  handleSearch: () => void;
  alphabet: string;
  searchByAlphabets: (letter: string) => void;
  options: string[];
  onSelect: (val: string) => void;
  clearFilters: () => void;
}

const ProfessionalSearchBar = ({
  search,
  setSearch,
  handleSearch,
  alphabet,
  searchByAlphabets,
  options,
  onSelect,
  clearFilters,
}: ProfessionalSearchBarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid size={{ xs: 12, md: 9, lg: 7 }} margin="auto">
      <Autocomplete
              freeSolo
              options={options}
              inputValue={search}
              open={open && search.length > 0}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              onInputChange={(event, newInputValue, reason) => {
                if (reason === "reset") return;
                setSearch(newInputValue || "");
              }}
              onChange={(event, newValue) => {
                if (newValue) {
                  onSelect(newValue);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search by First/Last Name"
                  sx={{
                    ...TEXTFIELD_STYLES,
                    mb: 2,
                  }}
                  slotProps={{
                    input: {
                      ...params.InputProps,
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
                            onClick={handleSearch}
                          >
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
            <Button
              onClick={clearFilters}
              sx={{
                display: { xs: "flex", lg: "none" },
                mx: "auto",
                mb: 2,
                textTransform: "none",
                backgroundColor: COLORS.PRIMARY_BLUE,
                color: COLORS.WHITE,
                borderRadius: "10px",
                px: 3,
                "&:hover": {
                  backgroundColor: COLORS.PRIMARY_BLUE,
                },
              }}
            >
              View All
            </Button>

            <Stack
              direction="row"
              alignItems={"center"}
              spacing={1}
              justifyContent={{ lg: "center", xs: "flex-start" }}
              sx={{
                mt: 5,
                flexWrap: { lg: "wrap", xs: "nowrap" },
                overflowX: "auto",
                width: "100%",
                pb: 1,
                px: 1,
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {ALPHABETS.map((letter) => (
                <Typography
                  key={letter}
                  sx={{
                    cursor: "pointer",
                    fontSize: { lg: 18, xs: 20 },
                    fontWeight: 500,
                    color:
                      alphabet === letter ? COLORS.WHITE : COLORS.TEXT_TERTIARY,
                    textTransform: "lowercase",
                    "&:hover": {
                      color: COLORS.PRIMARY_BLUE,
                      fontWeight: 700,
                    },
                    textAlign: "center",
                    backgroundColor:
                      alphabet === letter ? COLORS.PRIMARY_BLUE : "",
                    width: 30,
                    height: 30,
                    borderRadius: 2,
                    display: "flex",
                    minWidth: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                  onClick={() => searchByAlphabets(letter)}
                >
                  {letter}
                </Typography>
              ))}
            </Stack>
    </Grid>
  );
};

export default ProfessionalSearchBar;
