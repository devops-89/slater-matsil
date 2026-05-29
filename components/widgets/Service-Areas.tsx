"use client";
import React, { useState } from "react";
import HeadingStar from "@/components/widgets/Heading-star";
import { usePageData } from "@/store/usePageData";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ServiceAreaCard from "./common/Service-Area-Card";
import { SERVICES_AREAS_DATA } from "@/utils/types";

interface ServiceAreasProps {
  data?: SERVICES_AREAS_DATA[];
  limit?: number;
}

const ServiceAreas = ({ data, limit }: ServiceAreasProps) => {
  const { details } = usePageData();
  const pathname = usePathname();
  const [showAll, setShowAll] = useState(false);
  
  const defaultSectionData = [
    { title: "PATENT PROSECUTION", description: "We are engineers. We are lawyers.", serialNumber: "01", slug: "patent-prosecution" },
    { title: "POST GRANT CHALLENGES", description: "Our experience in litigation provides us with insight.", serialNumber: "02", slug: "post-grant" },
    { title: "PATENT LITIGATION", description: "Global economics can complicate the patent journey.", serialNumber: "03", slug: "litigation" }
  ];
  let displayData = data || (details?.homepage?.service_area?.section_Data?.length ? details.homepage.service_area.section_Data : defaultSectionData);

  if (limit && !showAll) {
    displayData = displayData.slice(0, limit);
  }
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ lg: "row", xs: "column" }}
          alignItems={"center"}
          justifyContent={"space-between"}
          spacing={{ lg: 0, xs: 2 }}
        >
          <Box data-aos="fade-up" suppressHydrationWarning>
            <HeadingStar
              title={details?.homepage?.service_area?.sectionTitle || "Service Area"}
            />
            <Typography
              sx={{
                color: COLORS.PRIMARY_BLUE,
                fontFamily: tradeGothic.style.fontFamily,
                fontWeight: 700,
                fontSize: { lg: 42, xs: 35 },
                width: { lg: "70%", xs: "100%" },
              }}
            >
              {details?.homepage?.service_area?.heading || "A Range Of Practice Areas"}
            </Typography>
          </Box>
          {details?.homepage?.service_area?.img && (
            <Image
              src={details?.homepage?.service_area?.img}
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Stack>

        <Grid container spacing={4} sx={{ mt: 7 }}>
          {displayData.map((val: SERVICES_AREAS_DATA, i: number) => (
            <Grid
              size={{ lg: 4, xs: 12 }}
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              suppressHydrationWarning
            >
              <Link
                href={`/services/${val.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ServiceAreaCard
                  img={val.img}
                  title={val.title}
                  description={val.description}
                  serialNumber={val.serialNumber}
                  slug={val.slug}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
        {!pathname.startsWith("/services") && !showAll && (
          <Stack direction={"row"} alignItems={"center"} spacing={2} my={5}>
            <Divider
              sx={{ flex: 1, borderColor: COLORS.PRIMARY_BLUE, opacity: 1 }}
            />
            <Button
              onClick={() => setShowAll(true)}
              sx={{
                color: COLORS.PRIMARY_BLUE,
                fontFamily: adelle.style.fontFamily,
                textDecoration: "underline",
                fontWeight: 600,
                fontSize: 16,
                lineHeight: "28px",
              }}
            >
              View More
            </Button>
            <Divider
              sx={{ flex: 1, borderColor: COLORS.PRIMARY_BLUE, opacity: 1 }}
            />
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default ServiceAreas;
