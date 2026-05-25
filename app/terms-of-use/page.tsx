"use client";

import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

const TermsOfUse = () => {
  return (
    <Box sx={{ py: { lg: 10, xs: 6 } }}>
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
          TERMS OF USE
        </Typography>

        <Typography
          sx={{
            fontFamily: adelle.style.fontFamily,
            fontSize: 16,
            fontWeight: 500,
            mb: 5,
            color: COLORS.BLACK,
          }}
        >
          Effective date: February 6, 2026
        </Typography>

        <Section title="1) Acceptance">
          By using this website, you agree to these Terms. If you do not agree,
          do not use the site.
        </Section>

        <Section title="2) Permitted use">
          <>
            <Typography
              sx={{
                fontFamily: adelle.style.fontFamily,
                fontSize: 16,
                fontWeight: 400,
                color: COLORS.BLACK,
                lineHeight: 1.8,
                mb: 2,
              }}
            >
              Use the site only for personal, noncommercial informational
              purposes. You agree not to:
            </Typography>

            <Box
              component="ul"
              sx={{
                pl: 3,
                m: 0,
                "& li": {
                  mb: 1.5,
                  fontFamily: adelle.style.fontFamily,
                  fontSize: 16,
                  fontWeight: 400,
                  color: COLORS.BLACK,
                  lineHeight: 1.8,
                },
              }}
            >
              <li>
                Use the site unlawfully or in violation of these Terms
              </li>

              <li>
                Copy, distribute, or create derivatives of site content without
                written permission
              </li>

              <li>
                Use bots/scrapers or bypass security or access controls
              </li>

              <li>
                Introduce malware or interfere with site operation
              </li>

              <li>
                Misrepresent your identity or affiliation
              </li>

              <li>
                Remove proprietary notices or frame/mirror the site without
                permission
              </li>
            </Box>
          </>
        </Section>

        <Section title="3) Intellectual property">
          All site content is owned by Slater Matsil, LLP or its licensors and
          protected by intellectual property laws. Slater Matsil, LLP names and
          logos are trademarks; do not use them without written permission.
        </Section>

        <Section title="4) Submissions">
          If you submit information via forms or email, you grant us a limited
          license to use it to review and respond to your inquiry, operate and
          improve the site, and comply with law. Do not submit confidential
          information unless and until we are engaged.
        </Section>

        <Section title="5) Disclaimer of warranties">
          This site and its content are provided “as is” and “as available,”
          without warranties of any kind.
        </Section>

        <Section title="6) Limitation of liability">
          To the maximum extent permitted by law, Slater Matsil, LLP and its
          attorneys, officers, employees, and agents are not liable for any
          direct or indirect damages arising from or relating to your use of the
          site.
        </Section>

        <Section title="7) Indemnification">
          You agree to indemnify and hold harmless Slater Matsil, LLP from
          claims arising from your use of the site or violation of these Terms.
        </Section>

        <Section title="8) Modifications; termination">
          We may modify these Terms at any time and will update the effective
          date. Continued use means you accept the changes. We may suspend or
          terminate access at any time.
        </Section>

        <Section title="9) Governing law; venue">
          These Terms are governed by Texas law, without regard to conflicts
          rules. Exclusive venue lies in the state or federal courts in Collin
          County, Texas.
        </Section>

        <Section title="10) Severability; entire agreement">
          If any provision is unenforceable, the remainder remains in effect.
          These Terms, the Disclaimer, and the Privacy Policy are the entire
          agreement regarding site use.
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
  <Box sx={{ mb: 5 }}>
    <Typography
      sx={{
        fontFamily: tradeGothic.style.fontFamily,
        fontSize: { lg: 24, xs: 20 },
        fontWeight: 700,
        color: COLORS.PRIMARY_BLUE,
        mb: 1.5,
        lineHeight: 1.4,
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
        lineHeight: 1.8,
      }}
    >
      {children}
    </Box>
  </Box>
);

export default TermsOfUse;