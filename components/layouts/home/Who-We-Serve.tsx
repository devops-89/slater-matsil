import checkmark from "@/icons/checkmark.png";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import contactUs from "@/public/images/home/contact-us.webp";

const Whoweserve = () => {
  const { details } = usePageData();
  return (
    <Box>
      <Grid container>
        <Grid size={{ lg: 6, xs: 12 }} data-aos="fade-up" suppressHydrationWarning>
          <Box
            sx={{
              backgroundImage: `url(${details?.homepage?.who_we_serve?.leftSection?.imageDownloadUrl || details?.homepage?.who_we_serve?.leftSection?.heroImage || contactUs.src})`,
              height: { lg: "80vh", xs: "50vh" },
              backgroundPosition: "center",
              backgroundSize: "cover",
              display: "flex",
              alignItems: "end",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(236, 248, 248, 0.20)",
                backdropFilter: "blur(350px)",
                width: { lg: 280, xs: 200 },
                height: { lg: 250, xs: 200 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                {details?.homepage?.who_we_serve?.leftSection?.small_logo && (
                  <Image
                    src={details.homepage.who_we_serve.leftSection.small_logo}
                    alt="small logo"
                    unoptimized={true}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
                <Divider sx={{ borderColor: COLORS.WHITE, my: 2 }} />
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    textAlign: "center",
                    fontFamily: tradeGothic.style.fontFamily,
                    color: COLORS.WHITE,
                    fontSize: { lg: 18, xs: 15 },
                    fontWeight: 700,
                  }}
                >
                  {details?.homepage?.who_we_serve?.leftSection?.startingYear || "since 1999"}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    width: "155px",
                    margin: "auto",
                    mt: 2,
                    color: COLORS.WHITE,
                    fontSize: { lg: 15, xs: 13 },
                    fontWeight: 700,
                    lineHeight: "26px",
                    fontFamily: tradeGothic.style.fontFamily,
                  }}
                >
                  {details?.homepage?.who_we_serve?.leftSection?.servicesLabel || "Global intellectual property services"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {details?.homepage?.who_we_serve?.leftSection?.big_logo && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Image
                src={details.homepage.who_we_serve.leftSection.big_logo}
                alt="big logo"
                unoptimized={true}
                style={{ width: "90%", height: "auto", margin: "auto" }}
              />
            </Box>
          )}
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }} data-aos="fade-down" suppressHydrationWarning>
          <Box
            sx={{
              backgroundColor: "#ECF2F3",
              height: { lg: "80vh", xs: "70vh" },
              ...(details?.homepage?.who_we_serve?.rightSection?.bgImage && {
                backgroundImage: `url(${details.homepage.who_we_serve.rightSection.bgImage})`,
              }),
              backgroundPosition: "top right",
              backgroundSize: "40%",
              backgroundRepeat: "no-repeat",
              display: "grid",
              placeItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box sx={{ px: 4 }}>
              <Typography
                sx={{
                  fontSize: { lg: 35, xs: 25 },
                  fontFamily: tradeGothic.style.fontFamily,
                  fontWeight: 700,
                  color: COLORS.PRIMARY_BLUE,
                }}
              >
                {details?.homepage?.who_we_serve?.rightSection?.heading || "Who we serve"}
              </Typography>
              <Divider
                sx={{
                  borderColor: COLORS.PRIMARY_BLUE,
                  borderWidth: 1.5,
                  my: 2,
                }}
              />

              <Typography
                sx={{
                  fontSize: { lg: 18, xs: 15 },
                  fontFamily: adelle.style.fontFamily,
                  color: COLORS.TEXT_PRIMARY,
                  fontWeight: 400,
                  textAlign: "justify",
                }}
              >
                {details?.homepage?.who_we_serve?.rightSection?.description || "From Fortune 100 firms to high-tech start-ups, Slater Matsil represents clients whose ideas are shaping our world."}
              </Typography>

              <Grid container>
                {(details?.homepage?.who_we_serve?.rightSection?.section_data?.length ? details.homepage.who_we_serve.rightSection.section_data : [
                  { label: "Large Corporations" },
                  { label: "Small Companies / Start-ups" },
                  { label: "U.S Law Firm" },
                  { label: "International Law Firm" }
                ]).map(
                  (val: any, i: number) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={i}>
                      <List>
                        <ListItem>
                          <ListItemAvatar sx={{ minWidth: 35 }}>
                            <Image src={checkmark} alt="" width={30} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={val.label}
                            slotProps={{
                              primary: {
                                color: COLORS.TEXT_SECONDARY,
                                fontFamily: adelle.style.fontFamily,
                                fontSize: { lg: 15, xs: 13 },
                                fontWeight: 600,
                                lineHeight: "28px",
                              },
                            }}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  ),
                )}
              </Grid>
              <Link
                href={
                  details?.homepage?.who_we_serve?.rightSection?.ctaButton
                    ?.href || "/who-we-serve"
                }
              >
                <Button
                  sx={{
                    padding: "15px",
                    borderRadius: "40px",
                    backgroundColor: COLORS.PRIMARY_BLUE,
                    color: COLORS.WHITE,
                    width: 222,
                    fontFamily: adelle.style.fontFamily,
                    fontWeight: 400,
                    lineHeight: "26px",
                    fontSize: 16,
                    mt: 2,
                  }}
                  endIcon={<ArrowForward />}
                >
                  {
                    details?.homepage?.who_we_serve?.rightSection?.ctaButton
                      ?.text || "OUR CLIENTS"
                  }
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              color: COLORS.WHITE,
              backgroundColor: COLORS.PRIMARY_BLUE,
              height: 110,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                lineHeight: "31px",
              }}
            >
              {details?.homepage?.who_we_serve?.rightSection?.endline || "“Transforming your vision into reality.”"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Whoweserve;
