import { ProfessionalControllers } from "@/api/professionalControllers";
import { useLoading } from "@/components/providers/LoadingProvider";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { tradeGothic } from "@/utils/fonts";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ProfessionalsCard from "./components/Professionals-Card";
import ProfessionalSearchBar from "./components/Professionals-Search-Bar";

const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");

const ProfessionalList = () => {
  const { details } = usePageData();
  const { startLoading, stopLoading } = useLoading();

  const [apiData, setApiData] = useState<any[]>(() => {
    let initial = (details?.firm_professionals as any)?.initialProfessionals;
    if (!initial && typeof window !== "undefined" && (window as any).__API_DATA__) {
      initial = (window as any).__API_DATA__.initialProfessionals;
    }
    if (initial && initial.length > 0) {
      return initial.map((u: any) => ({
        name: u.fullName,
        designation: u.designation,
        id: u.id,
        img: u.profileImageDownloadUrl || u.imageDownloadUrl || u.profileImageUrl || u.imageUrl || ""
      }));
    }
    return [];
  });
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [alphabet, setAlphabet] = useState("");
  const [appliedAlphabet, setAppliedAlphabet] = useState("");
  const [isFetchingData, setIsFetchingData] = useState(() => {
    let initial = (details?.firm_professionals as any)?.initialProfessionals;
    if (!initial && typeof window !== "undefined" && (window as any).__API_DATA__) {
      initial = (window as any).__API_DATA__.initialProfessionals;
    }
    return !(initial && initial.length > 0);
  });
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(() => {
    let initialTotal = (details?.firm_professionals as any)?.initialTotal;
    if (!initialTotal && typeof window !== "undefined" && (window as any).__API_DATA__) {
      initialTotal = (window as any).__API_DATA__.initialTotal;
    }
    return initialTotal || 0;
  });
  const ITEMS_PER_PAGE = 6;
  const initialMount = useRef(true);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      if (apiData.length > 0) {
        return; // Skip fetch only if we successfully got SSR data
      }
    }

    setIsFetchingData(true);
    ProfessionalControllers.getAllProfessionalProfiles(page, ITEMS_PER_PAGE, appliedSearch, appliedAlphabet)
      .then((res: any) => {
        let users = res.data?.data?.users || [];
        if (!users.length && res.data?.data?.data?.users) {
          users = res.data.data.data.users;
        }
        
        const total = res.data?.data?.meta?.total || res.data?.data?.data?.meta?.total || 0;
        setTotalCount(total);

        if (users && users.length > 0) {
          const mapped = users.map((u: any) => ({
            name: u.fullName,
            designation: u.designation,
            id: u.id,
            img: u.profileImageDownloadUrl || u.imageDownloadUrl || u.profileImageUrl || u.imageUrl || ""
          }));
          setApiData(mapped);
        } else {
          setApiData([]);
        }
        setIsFetchingData(false);
      })
      .catch((err) => {
        console.error("Failed to fetch professionals", err);
        setIsFetchingData(false);
      });
  }, [page, appliedSearch, appliedAlphabet]);

  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);
  const [isPaginating, setIsPaginating] = useState(false);

  const paginatedData = apiData;


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
    setAppliedSearch(search);
    setPage(1);
  };
  
  const searchByAlphabets = (letter: string) => {
    setAlphabet(letter);
    setAppliedAlphabet(letter);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    if (value === page) return;
    setPage(value);
    
    // The useEffect will trigger data fetching.
    // We just handle image loading states here.
    startLoading();
    setIsPaginating(true);
    setImagesLoadedCount(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              options={[]}
              onSelect={(newValue) => {
                setSearch(newValue);
              }}
              clearFilters={() => {
                setAlphabet("");
                setAppliedAlphabet("");
                setSearch("");
                setAppliedSearch("");
                setPage(1);
              }}
            />
        </Grid>
        <Box sx={{ position: "relative", mt: 5, minHeight: { xs: 800, md: 920 } }}>
          <Grid
            container
            spacing={5}
            rowSpacing={20}
          >
            {isFetchingData ? (
              Array.from(new Array(6)).map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
                  <Skeleton variant="rounded" width="100%" sx={{ height: { lg: "380px", md: "340px", sm: "300px", xs: "280px" }, borderRadius: "16px" }} />
                </Grid>
              ))
            ) : !paginatedData?.length ? (
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
            ) : (
              paginatedData?.map((val, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={i}>
                  <ProfessionalsCard
                    img={val.img}
                    name={val.name}
                    designation={val.designation}
                    id={val.id}
                    onLoad={handleImageLoad}
                    priority={i < 4}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
        <Stack direction="row" justifyContent="center" sx={{ mt: 20, minHeight: "32px" }}>
          {totalCount > ITEMS_PER_PAGE && (
            <Pagination
              count={Math.ceil(totalCount / ITEMS_PER_PAGE)}
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
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default ProfessionalList;
