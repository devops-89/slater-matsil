"use client";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import React from "react";

const PrivacyPolicy = () => {
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
          PRIVACY POLICY
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
          <br />
          Last updated: February 6, 2026
        </Typography>

        <Section title="1) Who we are; scope">
          Slater Matsil, LLP (“we,” “us”) is the controller of personal
          information collected through www.slatermatsil.com. This policy
          explains what we collect, how we use it, how we share it, and your
          rights. It applies to our website and related communications.
        </Section>

        <Section title="2) Information we collect">
          <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
            <li>
              You provide: name, email, phone, company/title (if provided),
              inquiry/matter details, an scheduling information if any. Please
              do not include confidential or sensitive information in web forms
              or email.
            </li>
            <li>
              Automatically: IP address, device/browser type, pages viewed,
              timestamps, referring pages, and general location derived from IP.
            </li>
            <li>
              Cookies/trackers: essential cookies for security and operation;
              optional analytics; optional functional and marketing cookies (see
              “Cookies and tracking”).
            </li>
          </ul>
          {/* <Typography
            sx={{
              mt: 2,
              fontFamily: tradeGothic.style.fontFamily,
              fontWeight: 700,
            }}
          >
            Specific services we use:
          </Typography>
          <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
            <li>Google Analytics (analytics)</li>
            <li>
              [Contact forms – e.g., Gravity Forms / WPForms] (form submissions)
            </li>
            <li>
              [Email service – e.g., Mailchimp / Constant Contact] (newsletters)
            </li>
            <li>
              [CRM/Matter management – e.g., Clio / MyCase] (client
              intake/matter management)
            </li>
            <li>
              [Scheduling – e.g., Calendly / Acuity] (consultation scheduling)
            </li>
            <li>[Chat widget – vendor name, if used] (chat)</li>
          </ul>
          We may update this list. Our service providers are contractually
          obligated to protect personal information and use it only to provide
          services to us. */}
        </Section>

        <Section title="3) How we use information">
          <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
            <li>Provide, secure, and improve the site and our services</li>
            <li>
              Respond to inquiries; schedule consultations; perform conflicts
              checks
            </li>
            <li>Send newsletters or updates if you subscribe or consent</li>
            <li>Comply with legal obligations and enforce our Terms</li>
          </ul>
          Legal bases for EEA/UK users: consent; contract performance or
          pre‑contract steps; legal obligations; and our legitimate interests
          (site operation, improvement, and security), balanced against your
          rights.
        </Section>

        <Section title="4) How we share information">
          We do not sell personal information. We do not share personal
          information for cross‑context behavioral advertising or targeted
          advertising. If this changes, we will update this policy, provide
          required opt‑outs, and honor Global Privacy Control (GPC).
          <br />
          <br />
          We share with:
          <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
            <li>
              Service providers (hosting, email, CRM, analytics, security,
              scheduling) under contract
            </li>
            <li>
              Authorities or others as required by law or to protect rights and
              safety
            </li>
            <li>
              Successors in a business reorganization, subject to this policy
            </li>
          </ul>
          We may share de‑identified or aggregated information.
        </Section>

        <Section title="5) Cookies and tracking">
          <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
            <li>Essential cookies: enable core site functions; always on.</li>
            <li>
              Analytics cookies: help measure traffic and performance (e.g.,
              Google Analytics).
            </li>
            <li>Functional/marketing cookies: only if implemented.</li>
          </ul>
          Controls:
          <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
            <li>
              Manage cookies in your browser. In the EEA/UK, we obtain consent
              for non‑essential cookies and provide granular choices via a
              Cookie Settings link. In California and other U.S. states, we
              honor GPC as an opt‑out signal if “sale/share/targeted
              advertising” ever applies.
            </li>
          </ul>
          If using Google Analytics, we enable IP anonymization and/or
          comparable privacy controls.
        </Section>

        <Section title="6) Security">
          We use reasonable administrative, technical, and physical safeguards
          (e.g., TLS encryption, access controls, updates, training). No system
          is 100% secure. Email and web forms are not suitable for confidential
          information.
        </Section>

        <Section title="7) Retention">
          We keep personal information only as long as needed for the purposes
          described or as required by law and professional obligations.
          <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
            <li>Web inquiries (non‑clients): 2 years from last contact</li>
            <li>
              Client matter files: 5 years after matter closure, unless a longer
              period is required by law, engagement terms, or a litigation hold
            </li>
            <li>
              Limited matter metadata for conflicts checks: retained
              indefinitely
            </li>
            <li>Trust account records: at least 5 years</li>
            <li>
              Marketing lists: until you unsubscribe or we prune inactive
              contacts
            </li>
            <li>
              Analytics data: 26 months (Google Analytics default, unless
              configured otherwise)
            </li>
          </ul>
        </Section>

        <Section title="8) Your rights">
          Depending on your location, you may have rights to access, correct,
          delete, object to or restrict processing, withdraw consent, and
          receive your data in portable format. You may opt out of marketing at
          any time and manage cookies via your browser or our Cookie Settings
          (where provided).
          <br />
          <br />
          To exercise rights, contact: info@slatermatsil.com, 17304 Preston Rd,
          Suite 900 Dallas, TX 75252, 972.732.1001. We may verify your identity
          and will respond within the time required by law.
        </Section>

        <Section title="9) International transfers">
          If you access the site from outside the U.S., your data may be
          processed in the U.S. and other countries with different laws. For
          EEA/UK data, we use lawful transfer mechanisms (e.g., Standard
          Contractual Clauses and related assessments, and/or the EU‑U.S. Data
          Privacy Framework where a vendor participates).
        </Section>

        <Section title="10) Children">
          Our site is not directed to children under 16, and we do not knowingly
          collect their personal information. We do not knowingly sell or share
          personal information of consumers under 16.
        </Section>

        <Section title="11) Do Not Track; Global Privacy Control">
          Browsers may send Do Not Track signals, but no standard exists. Where
          required by law (e.g., California), we honor the Global Privacy
          Control (GPC) as an opt‑out signal if “sale/share/targeted
          advertising” applies.
        </Section>

        <Section title="12) Changes">
          We may update this policy and will post the new date. Material changes
          will be highlighted or notified where required.
        </Section>

        <Section title="13) Contact">
          Slater Matsil, LLP
          <br />
          Attn: Privacy
          <br />
          17304 Preston Rd, Suite 900
          <br />
          Dallas, TX 75252
          <br />
          972.732.1001
          <br />
          info@slatermatsil.com
          <br />
          www.slatermatsil.com
        </Section>

        <Box
          sx={{ mt: 6, pt: 4, borderTop: `1px solid ${COLORS.PRIMARY_BLUE}` }}
        >
          <Typography
            sx={{
              fontFamily: tradeGothic.style.fontFamily,
              fontSize: { lg: 24, xs: 20 },
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
              mb: 2,
              textTransform: "uppercase",
            }}
          >
            CALIFORNIA AND U.S. STATE PRIVACY NOTICE (including CCPA/CPRA,
            TDPSA, and similar laws)
          </Typography>
          <Typography
            sx={{
              fontFamily: adelle.style.fontFamily,
              fontSize: 16,
              fontWeight: 400,
              color: COLORS.BLACK,
              lineHeight: 1.6,
            }}
          >
            Applies to residents of California and, as applicable, other states
            with similar laws.
            <br />
            <strong>A. Notice at collection</strong>
            <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
              <li>
                Categories collected: identifiers (name, email, phone), internet
                activity/technical data (IP, device, browsing), professional
                information (company/title if provided), and inquiry content. We
                do not intentionally collect sensitive personal information via
                the site.
              </li>
              <li>
                Purposes: site operation and security, responding to inquiries,
                scheduling, analytics, newsletters (with consent), and legal
                compliance.
              </li>
              <li>
                Sources: you; your device/browser; our service providers
                (analytics/hosting).
              </li>
              <li>
                Disclosures for business purposes: service providers (hosting,
                email, CRM, analytics, security, scheduling).
              </li>
              <li>
                Sale/sharing: we do not sell personal information and do not
                share it for cross‑context behavioral advertising. If that
                changes, we will provide required notices and opt‑outs and honor
                GPC.
              </li>
              <li>
                Retention: see the Retention section above for how long we keep
                each category.
              </li>
            </ul>
            <strong>B. Your rights and how to exercise them</strong>
            <ul style={{ paddingLeft: "20px", margin: "10px 0" }}>
              <li>
                Rights: to know/access, correct, delete, and receive information
                about disclosures; to opt out of sale/sharing/targeted
                advertising (if applicable); and to be free from discrimination
                for exercising your rights. You may also limit use/disclosure of
                sensitive personal information, if collected for non‑exempt
                purposes.
              </li>
              <li>
                Submitting requests: [web form URL if any] or [privacy email] or
                [phone]. Authorized agents may submit requests with proof of
                authority. We will verify requests and respond within statutory
                timeframes.
              </li>
              <li>
                Appeals: If we deny your privacy request, you may appeal by
                emailing [appeals@firm.com] with “Privacy Appeal” in the subject
                within 30 days. We will respond within 45 days. If your appeal
                is denied where required by law, we will explain how to contact
                your state attorney general.
              </li>
            </ul>
          </Typography>
        </Box>

        <Box
          sx={{ mt: 6, pt: 4, borderTop: `1px solid ${COLORS.PRIMARY_BLUE}` }}
        >
          <Typography
            sx={{
              fontFamily: tradeGothic.style.fontFamily,
              fontSize: { lg: 24, xs: 20 },
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
              mb: 2,
              textTransform: "uppercase",
            }}
          >
            EU/UK PRIVACY NOTICE (GDPR/UK GDPR)
          </Typography>
          <Typography
            sx={{
              fontFamily: adelle.style.fontFamily,
              fontSize: 16,
              fontWeight: 400,
              color: COLORS.BLACK,
              lineHeight: 1.6,
            }}
          >
            <ul>
              <li>
                Controller: Slater Matsil, LLP, 17304 Preston Rd, Suite 900,
                Dallas, TX 75252, info@slatermatsil.com, 972.732.1001
              </li>
              <li>
                Legal bases: consent; contract performance or pre‑contract steps
                (e.g., consultation requests); legal obligations; and legitimate
                interests (site operation, security, improvement, and marketing
                to existing contacts), balanced against your rights.
              </li>
              <li>
                Recipients: service providers acting under our instructions;
                authorities as required by law.
              </li>
              <li>
                Transfers: we use appropriate safeguards for transfers outside
                the EEA/UK (e.g., Standard Contractual Clauses and transfer
                assessments, and/or the EU‑U.S. Data Privacy Framework where
                applicable).
              </li>
              <li>Retention: see the Retention section above.</li>
              <li>
                Your rights: access, rectification, erasure, restriction,
                portability, objection (including to direct marketing), and
                withdrawal of consent without affecting prior processing. You
                may lodge a complaint with your local supervisory authority.
              </li>
            </ul>
          </Typography>
        </Box>

        <Box sx={{ mt: 6, pt: 4 }}>
          <Typography
            sx={{
              fontFamily: tradeGothic.style.fontFamily,
              fontSize: { lg: 24, xs: 20 },
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
              mb: 2,
              textTransform: "uppercase",
            }}
          >
            ACCESSIBILITY STATEMENT
          </Typography>
          <Typography
            sx={{
              fontFamily: adelle.style.fontFamily,
              fontSize: 16,
              fontWeight: 400,
              color: COLORS.BLACK,
              lineHeight: 1.6,
            }}
          >
            We strive to make our website accessible to everyone. If you
            encounter accessibility barriers or need assistance, contact us at
            info@slatermatsil.com.
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography
            sx={{
              fontFamily: adelle.style.fontFamily,
              fontSize: 14,
              fontWeight: 400,
              color: COLORS.TEXT_SECONDARY || COLORS.BLACK,
              lineHeight: 1.6,
            }}
          >
            COPYRIGHT NOTICE <br />© 2026 Slater Matsil, LLP. All rights
            reserved.
          </Typography>
        </Box>
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

export default PrivacyPolicy;
