import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
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

  const sortedFullList = useMemo(() => {
    const list = details?.firm_professionals?.PROFESSIONAL_LIST_PROPS || [];
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [details]);

  const [data, setData] = useState(sortedFullList);

  useEffect(() => {
    setData(sortedFullList);
  }, [sortedFullList]);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const handleSearch = () => {
    const filteredData = sortedFullList.filter((item: any) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
    setData(filteredData);
    setPage(1);
  };
  const [alphabet, setAlphabet] = useState("");

  const searchByAlphabets = (letter: string) => {
    setAlphabet(letter);
    const filteredData = sortedFullList.filter((item: any) =>
      item.name.toLowerCase().startsWith(letter),
    );
    setData(filteredData);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const paginatedData = data?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid size={{ lg: 7, xs: 12 }} margin="auto">
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
              sx={{ mt: 1, flexWrap: "wrap" }}
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
                    display: { lg: "block", xs: "none" },
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
          {paginatedData?.length ? (
            paginatedData?.map((val, i) => (
              <Grid size={{ lg: 4, xs: 12 }} key={i}>
                <ProfessionalsCard
                  img={val.img}
                  name={val.name}
                  designation={val.designation}
                  slug={val.slug}
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
                width: "100%",
              }}
            >
              No Data Found
            </Typography>
          )}
        </Grid>
        {data && data?.length > ITEMS_PER_PAGE && (
          <Stack direction="row" justifyContent="center" sx={{ mt: 20 }}>
            <Pagination
              count={Math.ceil(data.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: COLORS.PRIMARY_BLUE,
                  borderColor: COLORS.PRIMARY_BLUE,
                  "&.Mui-selected": {
                    backgroundColor: COLORS.PRIMARY_BLUE,
                    color: COLORS.WHITE,
                    "&:hover": {
                      backgroundColor: COLORS.PRIMARY_BLUE,
                    },
                  },
                },
              }}
            />
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default ProfessionalList;
