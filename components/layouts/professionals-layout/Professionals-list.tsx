import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import ProfessionalsCard from "./components/Professionals-Card";
import { usePageData } from "@/store/usePageData";
import { TEXTFIELD_STYLES } from "@/utils/styles";
import { COLORS } from "@/utils/enum";
import { Search } from "@mui/icons-material";
import { tradeGothic } from "@/utils/fonts";
const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");

const ProfessionalList = () => {
  const { details } = usePageData();

  const [search, setSearch] = useState("");

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const [data, setData] = useState(
    details?.firm_professionals?.PROFESSIONAL_LIST_PROPS
  );

  const handleSearch = () => {
    const filteredData =
      details?.firm_professionals?.PROFESSIONAL_LIST_PROPS.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    setData(filteredData);
  };
  const [alphabet, setAlphabet] = useState("");

  const searchByAlphabets = (letter: string) => {
    setAlphabet(letter);
    const filteredData =
      details?.firm_professionals?.PROFESSIONAL_LIST_PROPS.filter((item) =>
        item.name.toLowerCase().startsWith(letter)
      );
    setData(filteredData);
  };

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
              value={search}
              onChange={handleSearchInput}
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
                        onClick={handleSearch}
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
                  }}
                  onClick={() => searchByAlphabets(letter)}
                >
                  {letter}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={5} rowSpacing={20} sx={{ mt: 5 }}>
          {data?.length ? (
            data?.map((val, i) => (
              <Grid size={4} key={i}>
                <ProfessionalsCard
                  img={val.img}
                  name={val.name}
                  designation={val.designation}
                />
              </Grid>
            ))
          ) : (
            <Typography
              sx={{
                fontSize: 20,
                fontFamily: tradeGothic.style.fontFamily,
                color: COLORS.PRIMARY_BLUE,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              No Data Found
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfessionalList;
