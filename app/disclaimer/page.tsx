"use client";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Disclaimer = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: tradeGothic.style.fontFamily,
            fontSize: { lg: 40, xs: 26 },
            fontWeight: 700,
            color: COLORS.PRIMARY_BLUE,
            mb: 2,
            textTransform: "uppercase",
          }}
        >
          DISCLAIMER
        </Typography>
        <Typography
          sx={{
            fontFamily: adelle.style.fontFamily,
            fontSize: 16,
            fontWeight: 500,
            mb: 4,
            color: COLORS.BLACK,
          }}
        >
          Effective date: February 6, 2026
        </Typography>

        <Section title="1) No legal advice; no attorney-client relationship">
          This website provides general information and is not legal advice.
          Contacting us through the site, email, or forms does not create an
          attorney-client relationship. A relationship forms only after
          conflicts are cleared and a written engagement is signed.
        </Section>

        <Section title="2) Do not send confidential information">
          Do not send confidential, privileged, or time-sensitive information
          through this site or by email. Until we are formally engaged,
          information you send may be reviewed for conflicts and may not be
          treated as confidential or privileged.
        </Section>

        <Section title="3) No guarantee of results">
          The materials on this Web site may not reflect the most current legal
          developments and should not be considered an indication of future
          results. Past results and testimonials do not predict or guarantee
          outcomes. Each matter is different.
        </Section>

        <Section title="4) Attorney advertising; licensing">
          This site may be attorney advertising. Unless stated in attorney bios,
          our lawyers are not certified by the Texas Board of Legal
          Specialization. Our attorneys practice only in the jurisdictions
          listed in their bios.
        </Section>

        <Section title="5) Accuracy and third-party links">
          We aim to keep content accurate and current but make no warranties.
          Content may change without notice. Third‑party links are for
          convenience; we do not control or endorse them.
        </Section>

        <Section title="6) Limitation of liability">
          To the fullest extent permitted by law, Slater Matsil, LLP and its
          attorneys and staff are not liable for damages arising from your use
          of this site.
        </Section>

        <Section title="7) Contact">
          Slater Matsil, LLP
          <br />
          17304 Preston Rd, Suite 900
          <br />
          Dallas, TX 75252
          <br />
          info@slatermatsil.com
          <br />
          https://slatermatsil.com/
        </Section>
      </Container>
    </Box>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 4 }}>
    <Typography
      sx={{
        fontFamily: tradeGothic.style.fontFamily,
        fontSize: { lg: 20, xs: 18 },
        fontWeight: 700,
        color: COLORS.PRIMARY_BLUE,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    <Box
      sx={{
        fontFamily: adelle.style.fontFamily,
        fontSize: 16,
        fontWeight: 400,
        color: COLORS.BLACK,
        lineHeight: 1.6,
      }}
    >
      {children}
    </Box>
  </Box>
);

export default Disclaimer;
