import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import { TEXTFIELD_STYLES } from "@/utils/styles";
import { Search } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
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
import ProfessionalSearchBar from "./components/Professionals-Search-Bar";
import { useLoading } from "@/components/providers/LoadingProvider";
const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");

const ProfessionalList = () => {
  const { details } = usePageData();

  const [search, setSearch] = useState("");

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getLastName = (fullName: string) => {
  const cleanName = fullName.split(",")[0].trim();
  const parts = cleanName.split(/\s+/);
  return parts[parts.length - 1].toLowerCase();
};

const sortedFullList = useMemo(() => {
  const list = details?.firm_professionals?.PROFESSIONAL_LIST_PROPS || [];

  return [...list].sort((a, b) =>
    getLastName(a.name).localeCompare(getLastName(b.name)),
  );
}, [details]);

  const [data, setData] = useState(sortedFullList);

  useEffect(() => {
    setData(sortedFullList);
  }, [sortedFullList]);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const { startLoading, stopLoading } = useLoading();
  const [loadedCount, setLoadedCount] = useState(0);

  const paginatedData = data?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const currentKey = `${page}-${data.length}`;

  useEffect(() => {
    if (paginatedData?.length > 0) {
      startLoading();
      setLoadedCount(0);
    } else {
      stopLoading();
    }
  }, [currentKey]); // Trigger when page or data length changes

  useEffect(() => {
    if (paginatedData?.length > 0 && loadedCount >= paginatedData.length) {
      stopLoading();
    }
  }, [loadedCount, paginatedData?.length, stopLoading]);

  const handleImageLoad = () => {
    // We don't call setLoading here, only update local state.
    // The useEffect above will handle setLoading(false) safely.
    setLoadedCount((prev) => prev + 1);
  };

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
    getLastName(item.name).startsWith(letter.toLowerCase()),
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

  return (
    <Box sx={{ mt: 10 }}>
      <Container maxWidth="lg">
        <Grid container>
            <ProfessionalSearchBar
              search={search}
              setSearch={setSearch}
              handleSearch={handleSearch}
              alphabet={alphabet}
              searchByAlphabets={searchByAlphabets}
              options={sortedFullList.map((option: any) => option.name)}
              onSelect={(newValue) => {
                setSearch(newValue);
              }}
              clearFilters={() => {
                setAlphabet("");
                setData(sortedFullList);
                setPage(1);
              }}
            />
        </Grid>
        <Box sx={{ position: "relative", mt: 5, minHeight: 400 }}>
          <Grid
            container
            spacing={5}
            rowSpacing={20}
            key={currentKey}
          >
            {paginatedData?.length ? (
              paginatedData?.map((val, i) => (
                <Grid size={{ lg: 4, xs: 12 }} key={i}>
                  <ProfessionalsCard
                    img={val.img}
                    name={val.name}
                    designation={val.designation}
                    slug={val.slug}
                    onLoad={handleImageLoad}
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
        </Box>
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
