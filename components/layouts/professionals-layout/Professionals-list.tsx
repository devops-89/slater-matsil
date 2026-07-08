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
import { ProfessionalControllers } from "@/api/professionalControllers";

const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");

const ProfessionalList = () => {
  const { details } = usePageData();
  const { startLoading, stopLoading } = useLoading();
  const [apiData, setApiData] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getLastName = (fullName: string) => {
  const cleanName = fullName.split(",")[0].trim();
  const parts = cleanName.split(/\s+/);
  return parts[parts.length - 1].toLowerCase();
};

  useEffect(() => {
    startLoading();
    ProfessionalControllers.getAllProfessionalProfiles()
      .then((res: any) => {
        let users = res.data?.data?.users || [];
        if (!users.length && res.data?.data?.data?.users) {
          users = res.data.data.data.users;
        }
        
        if (users && users.length > 0) {
          const mapped = users.map((u: any) => ({
            name: u.fullName,
            designation: u.designation,
            id: u.id,
            img: u.profileImageDownloadUrl || u.imageDownloadUrl || u.profileImageUrl || u.imageUrl || ""
          }));
          setApiData(mapped);
        }
        stopLoading();
      })
      .catch((err) => {
        console.error("Failed to fetch professionals", err);
        stopLoading();
      });
  }, []);

  const sortedFullList = useMemo(() => {
    return [...apiData].sort((a, b) => {
      const lastNameComparison = getLastName(a.name).localeCompare(getLastName(b.name));
      if (lastNameComparison !== 0) {
        return lastNameComparison;
      }
      return a.name.localeCompare(b.name);
    });
  }, [apiData]);

  const [data, setData] = useState(sortedFullList);

  useEffect(() => {
    setData(sortedFullList);
  }, [sortedFullList]);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);
  const [isPaginating, setIsPaginating] = useState(false);

  const paginatedData = data?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleImageLoad = () => {
    if (isPaginating) {
      setImagesLoadedCount((prev: number) => prev + 1);
    }
  };

  useEffect(() => {
    if (isPaginating) {
      const imagesToLoad = paginatedData.filter((p: any) => p.img).length;
      if (imagesLoadedCount >= imagesToLoad) {
        stopLoading();
        setIsPaginating(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [imagesLoadedCount, isPaginating, paginatedData, stopLoading]);

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
    if (value === page) return;
    setPage(value);
    
    const newPageData = data?.slice((value - 1) * ITEMS_PER_PAGE, value * ITEMS_PER_PAGE);
    const imagesToLoad = newPageData.filter((p: any) => p.img).length;
    
    if (imagesToLoad > 0) {
      startLoading();
      setIsPaginating(true);
      setImagesLoadedCount(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
          >
            {paginatedData?.length ? (
              paginatedData?.map((val, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={i}>
                  <ProfessionalsCard
                    img={val.img}
                    name={val.name}
                    designation={val.designation}
                    id={val.id}
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
