import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
const WhoweServe = () => {
  const { details } = usePageData();

  return (
    <Box sx={{ pb: { lg: 10, xs: 5 } }}>
      <Box>
        <Container maxWidth="lg">
          <Grid container spacing={{ lg: 10, xs: 4 }}>
            <Grid size={{ lg: 4, xs: 12 }}>
              <Stack
                direction={{ lg: "column", xs: "row" }}
                spacing={{ lg: 0, xs: 2 }}
              >
                <Typography
                  sx={{
                    color: COLORS.PRIMARY_BLUE,
                    fontSize: { lg: 50, xs: 30 },
                    fontWeight: { lg: 700, xs: 500 },
                    lineHeight: { lg: "55px", xs: "35px" },
                    letterSpacing: "-3px",
                    fontFamily: tradeGothic.style.fontFamily,
                  }}
                >
                  {details?.aboutPage?.who_we_serve_props?.heading1 || "Who"}
                </Typography>
                <Typography
                  sx={{
                    color: COLORS.BLACK,
                    fontSize: { lg: 50, xs: 30 },
                    fontFamily: tradeGothic.style.fontFamily,
                    fontWeight: { lg: 700, xs: 500 },
                    letterSpacing: "-2px",
                    lineHeight: { lg: "55px", xs: "35px" },
                    ml: 1,
                    position: "relative",
                    zIndex: 1,
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "10px",
                      left: "-4px",
                      right: "-8px",
                      height: { lg: "20px", xs: "10px" },
                      backgroundColor: COLORS.PRIMARY_GREEN,
                      opacity: 0.4,
                      zIndex: -1,
                      transform: "rotate(-2deg)",
                      width: { lg: 250, xs: 150 },
                      borderRadius: "20px",
                    },
                  }}
                >
                  {details?.aboutPage?.who_we_serve_props?.heading2 || "We Serve"}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  fontFamily: adelle.style.fontFamily,
                  fontSize: { lg: 20, xs: 15 },
                  textAlign: "justify",
                  fontWeight: 300,
                  lineHeight: { lg: "30px", xs: "25px" },
                  mt: 3,
                }}
              >
                {details?.aboutPage?.who_we_serve_props?.description || "From Fortune 100 firms to high-tech start-ups, Slater Matsil represents clients whose ideas are shaping our world"}
              </Typography>
            </Grid>
            <Grid size={{ lg: 8, xs: 12 }}>
              <Grid container spacing={4}>
                {(details?.aboutPage?.who_we_serve_props?.section_data?.length ? details.aboutPage.who_we_serve_props.section_data : [
                  {
                    dataList: [
                      { label: "Large Corporations" },
                      { label: "Small Companies / Start ups" },
                      { label: "U.S. Law Firms" },
                      { label: "International Law Firms" },
                    ]
                  }
                ]).map(
                  (val: any, i: number) => (
                    <Grid size={{ lg: 5, xs: 12 }} key={i}>
                      <List>
                      {val.dataList.map((item: any) => (
                        <ListItem key={item.label} disablePadding>
                          <Link
                            href="/who-we-serve"
                            style={{ textDecoration: "none", width: "100%" }}
                          >
                            <ListItemText
                              primary={item.label}
                              slotProps={{
                                primary: {
                                  fontSize: { lg: 20, xs: 15 },
                                  fontFamily: adelle.style.fontFamily,
                                  color: COLORS.PRIMARY_BLUE,
                                  fontWeight: 700,
                                  lineHeight: { lg: "45px", xs: "25px" },
                                },
                              }}
                            />
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                    </Grid>
                  ),
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default WhoweServe;
