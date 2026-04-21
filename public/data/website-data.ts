import award1 from "@/about/award-1.png";
import award2 from "@/about/award-2.png";
import award3 from "@/about/award-3.png";
import award4 from "@/about/award-4.png";
import award5 from "@/about/award-5.png";
import award6 from "@/about/award-6.png";
import drivingInnovationEverywhere from "@/about/driving-vector.png";
import globe from "@/about/globe.png";
import aboutHero from "@/about/heroImage.jpg";
import careerHeroBackgroundImage from "@/career/CAREERS.png";
import careerHeroImage from "@/career/hero-image.png";
import whyWork from "@/career/why-work.jpg";
import contactHeroImage from "@/contact/hero-vector-image.png";
import building from "@/icons/building.svg";
import globeOutline from "@/icons/globe.svg";
import locationOutline from "@/icons/location.svg";
import minicutBuilding from "@/icons/stream-line.svg";
import insightsHeroImage from "@/insights/insights_hero_img.jpg";
import footerLogo from "@/logo/big-logo.png";
import practiceGroupPageHeroImage2 from "@/practice-group/hero2.jpg";
import practiceGroupPageHeroImage3 from "@/practice-group/hero3.jpg";
import practiceGroupPageHeroImage1 from "@/practice-group/hero4.png";
import professionalsHeroImage from "@/professionals/hero_section.png";
import blog1 from "@/public/images/blog/blog1.jpg";
import blog2 from "@/public/images/blog/blog2.jpg";
import blog3 from "@/public/images/blog/blog3.jpg";
import blog4 from "@/public/images/blog/blog4.png";
import blog5 from "@/public/images/blog/blog5.jpg";
import blog6 from "@/public/images/blog/blog6.jpg";
import blogUpcoming from "@/public/images/blog/emergingTrend.jpg";
import whoWeServeLeftSectionHeroImage from "@/public/images/home/contact-us.png";
import serviceAreas1 from "@/public/images/home/practice_areas/practice_areas1.svg";
import serviceAreas2 from "@/public/images/home/practice_areas/practice_areas2.svg";
import serviceAreas3 from "@/public/images/home/practice_areas/practice_areas3.svg";
import serviceAreas4 from "@/public/images/home/practice_areas/practice_areas4.svg";
import serviceAreas5 from "@/public/images/home/practice_areas/practice_areas5.svg";
import serviceAreas6 from "@/public/images/home/practice_areas/practice_areas6.svg";
import {
  default as bigLogo,
  default as lightLogo,
} from "@/public/images/home/slater-matsil-logo-light.png";
import smallLogo from "@/public/images/home/slater-matsil-white.png";
import whoWeServeRightSectionHeroImage from "@/public/images/home/who_serve_shape.png";
import serviceAreas7 from "@/public/images/icons/services/ip-strategy.png";
import serviceAreas8 from "@/public/images/icons/services/portfolio-management.png";
import serviceAreas9 from "@/public/images/icons/services/trademarks.png";
import serviceHeroSectionImage from "@/services/practice_Areas_banner.png";
import unparalleledimage from "@/services/unparalled-legal-services-Recovered.png";
import {
  CAREER_OPEN_ROLES_TAB_DATA,
  INSIGHTS_TAB_DATA,
  PRACTICE_GROUP_TAB_DATA,
  WHO_WE_SERVE_PAGE_TAB_DATA,
} from "@/utils/enum";
import { HOMEPAGE_DATA_PROPS } from "@/utils/types";
import whoweserveHero from "@/who-we-serve/hero-img2.png";
import { FaLinkedinIn } from "react-icons/fa";
import {
  CAREER_WORK_LIST_DATA,
  CONTACT_US_CARD_DATA,
  FOOTER_DATA,
  INDUSTRIES_DATA,
  INSIGHTS_CARD_DATA,
  METRICS_DATA,
  professionalsListData,
  SERVICE_FRAMEWORK_CARD_DATA,
  STRENGTH_CARD_DATA,
} from "./generic-array";
export const WEBSITE_DATA: HOMEPAGE_DATA_PROPS = {
  title: "Slater Matsil",
  homepage: {
    heroSection: {
      heading: "A unique team of patent professionals",
      subHeading: "Safeguarding innovation through legal insight.",
      videoHeading: {
        title: "Watch",
        subTitle: "That's how we make it work?",
      },
    },
    aboutSection: {
      sectionTitle: "About Slatermatsil",
      heading: "Fluent in technology. Proven in law.",
      description:
        "At Slater Matsil, we know what is required to invent something groundbreaking — and we know what it takes to guard and defend your company’s intellectual capital.",
      ctaButton: {
        text: "More About",
        link: "/about-us",
      },
      experience: {
        years: "25",
        title: "Years of",
        subTitle: "Pro Experiences",
      },
    },
    our_metrics: {
      sectionTitle: "Our Metrics",
      heading: {
        title: "Our firm is globally connected. Internationally",
        subTitle: "respected.",
      },
      description:
        "At Slater Matsil, we know what is required to invent something groundbreaking — and we know what it takes to guard and defend your company’s intellectual capital.",
      description2:
        "Slater Matsil partners with the world's leading innovators to protect their most valuable intellectual property. Our firm successfully prosecuted over 1,650 patents in 2024 for our top clients alone, companies representing nearly $36 billion in annual R&D investment. These clients entrust us with securing patent protection for breakthrough innovations worth approximately $4.8 billion in research and development.",
      ctaButton: "Let's Talk Now",
      metricsData: METRICS_DATA,
    },
    service_area: {
      sectionTitle: "Service Area",
      heading: "A Range Of Practice Areas",
      img: lightLogo,
      section_Data: [
        {
          img: serviceAreas1,
          title: "PATENT PROSECUTION",
          description:
            "We are engineers. We are lawyers. We are also licensing professionals and IP litigators. Because we see the world from many perspectives, we are able to craft patents that contribute to IP portfolios that achieve your goals. ",
          serialNumber: "01",
          slug: "patent-prosecution",
        },
        {
          img: serviceAreas2,
          title: "POST GRANT CHALLENGES",
          description:
            "Our experience in litigation and prosecution provides us with the insight necessary to successfully defend and attack patents in any one of the available post grant procedures. ",
          serialNumber: "02",
          slug: "post-grant-challenges",
        },
        {
          img: serviceAreas3,
          title: "Patent Litigation/Litigation Support",
          description:
            "Global economics can complicate the patent journey, but we make the process clear and manageable for our clients.",
          serialNumber: "03",
          slug: "patent-litigation",
        },
        {
          img: serviceAreas4,
          title: "PATENT LICENSING",
          description:
            "We partner with technology leaders to design and implement licensing strategies tailored to their goals. Let us unlock new value from your existing innovations to create long‑term revenue and support future inventions.",
          serialNumber: "04",
          slug: "patent-licensing",
        },
        {
          img: serviceAreas5,
          title: "ADVERSE PATENT ANALYSIS",
          description:
            "Adverse patent assertions have become an inevitable occurrence in today’s business environment. Some of our clients receive multiple adverse assertions in any given week.",
          serialNumber: "05",
          slug: "adverse-patent-analysis",
        },
        {
          img: serviceAreas6,
          title: "TRUSTED ADVICE AND COUNSEL",
          description:
            'Slater Matsil is proud to be known as a "strategic partner," helping our clients reach their intellectual property goals all around the world.',
          serialNumber: "06",
          slug: "trusted-advice-counsel",
        },
        {
          img: serviceAreas7,
          title: "IP Strategy",
          description:
            "We help clients develop and implement IP strategies that align with their business goals, protect their innovations, and create long-term value.",
          serialNumber: "07",
          slug: "ip-strategy",
        },
        {
          img: serviceAreas8,
          title: "PORTFOLIO MANAGEMENT",
          description:
            "We help clients manage their IP portfolios efficiently and effectively, ensuring that their intellectual property assets are protected and leveraged to achieve their business goals.",
          serialNumber: "08",
          slug: "portfolio-management",
        },
        {
          img: serviceAreas9,
          title: "Trademarks",
          description:
            "At every stage of creation, registration, and renewal, the trademark professionals of Slater Matsil deliver exceptional counsel to preserve the integrity of your brand.",
          serialNumber: "09",
          slug: "trademarks",
        },
      ],
    },
    who_we_serve: {
      leftSection: {
        heroImage: whoWeServeLeftSectionHeroImage.src,
        small_logo: smallLogo,
        startingYear: "since 1999",
        servicesLabel: "Global intellectual property services",
        big_logo: bigLogo,
      },
      rightSection: {
        heading: "Who we serve",
        description:
          "From Fortune 100 firms to high-tech start-ups, Slater Matsil represents clients whose ideas are shaping our world.",
        section_data: [
          {
            label: "Large Corporations",
          },
          {
            label: "Small Companies / Start-ups",
          },
          {
            label: "U.S Law Firm",
          },
          {
            label: "International Law Firm",
          },
        ],
        ctaButton: {
          text: "OUR CLIENTS",
          href: "/who-we-serve",
        },
        endline: "“Transforming your vision into reality.”",
        bgImage: whoWeServeRightSectionHeroImage.src,
      },
    },
    insights_section: {
      sectionTitle: "Insights",
      heading: "Recently Published Insights.",
      insights_data: [
        {
          heading:
            "Ira Matsil recognized by Chambers USA 2021-2025 as a Top Intellectual Property Attorney",
          category: {
            text: "news",
          },
          ctaButton: {
            text: "Learn More",
          },
        },
        {
          heading:
            "Steven Slater recognized by Chambers USA 2024-2025 as a Top Intellectual Property Attorney",
          category: {
            text: "news",
          },
          ctaButton: {
            text: "Learn More",
          },
        },
        {
          heading:
            "Srini Chakravarthi recognized by Chambers USA 2023-2025 as a Top Intellectual Property Attorney",
          category: {
            text: "news",
          },
          ctaButton: {
            text: "Learn More",
          },
        },
      ],
    },
    footerData: {
      footer_links: FOOTER_DATA,
      social_links: [
        {
          icon: FaLinkedinIn,
          href: "https://www.linkedin.com/company/slater-&-matsil-l-l-p-/",
        },
      ],
      privacy_pages: [
        {
          title: "Terms",
          href: "/terms-of-use",
        },
        {
          title: "Privacy",
          href: "/privacy-policy",
        },

        {
          title: "Disclaimer",
          href: "/disclaimer",
        },
      ],
      logo: footerLogo,
      copyRightText:
        "© 2016 - 2026 Slater Matsil, LLP | Dallas, TX | All Rights Reserved",
      contactData: {
        email: "info@slatermatsil.com",
        phoneNumber: "972.732.1001",
        address: "17304 Preston Rd, Suite 900, Dallas, TX 75252",
      },
    },
  },
  aboutPage: {
    heroSection: {
      sectionTitle: "About Slatermatsil",
      heading: "The innovations that set you apart.",
      description:
        "At Slater Matsil, we know what is required to invent something groundbreaking — and we know what it takes to guard and defend your company’s intellectual capital.",
      img: aboutHero,
    },
    drivingInnovationEverywhere: {
      heading: "Driving innovation everywhere",
      description: [
        {
          label:
            "We’re engineers focused on making things work. We’re attorneys driven to defend innovation. Above all, we’re proven professionals who draw upon our firsthand experience spanning diverse industries to deliver quality, accuracy, and a meticulous level of detail in our work product.",
        },
        {
          label:
            "We maintain this client-centric perspective, whether we are discussing technology with inventors in the design room, developing IP strategies with management in the board room, or advocating for our clients' rights in the courtroom.",
        },
      ],
      img: drivingInnovationEverywhere,
    },
    REDEFINING_PATENT_SUCCESS: {
      heading1: "Redefining Patent Success with",
      heading2: "Precision and Global Reach.",
      description:
        "Slater Matsil partners with the world's leading innovators to protect their most valuable intellectual property. Our firm successfully prosecuted over 1,650 patents in 2024 for our top clients alone, companies representing nearly $36 billion in annual R&D investment. These clients entrust us with securing patent protection for breakthrough innovations arising from approximately $4.8 billion in research and development investment.",
      metrics_data: METRICS_DATA,
    },
    innovationInsights: {
      heading: "Where Insight Meets Innovation In Every Patent Strategy.",
      description: "",
    },
    AWARDSPROPS: {
      img: globe,
      heading1: "Distinction Defined By",
      heading2: "Dedication And Results.",
      awards_img: [
        {
          img: award1,
        },
        {
          img: award2,
        },
        {
          img: award3,
        },
        {
          img: award4,
        },
        {
          img: award5,
        },
        {
          img: award6,
        },
      ],
    },
    who_we_serve_props: {
      heading1: "Who",
      heading2: "We Serve",
      description:
        "From Fortune 100 firms to high-tech start-ups, Slater Matsil represents clients whose ideas are shaping our world",
      section_data: [
        {
          dataList: [
            {
              label: "Large Corporations",
            },
            {
              label: "Small Companies / Start ups",
            },
            {
              label: "U.S. Law Firms",
            },
            {
              label: "International Law Firms",
            },
          ],
        },
      ],
    },
    industriesWeServe: {
      heading1: "Industries",
      heading2: "We Serve",
      description:
        "We collaborate with a wide range of industries to deliver innovative, reliable solutions.",
      section_data: INDUSTRIES_DATA,
    },
  },
  firm_professionals: {
    professionals_hero_section: {
      heading: "Patent professionals who share your perspective",
      description1:
        "When you work with Slater Matsil, you collaborate with a uniquely skilled team of engineering, technical, and legal specialists.",

      img: professionalsHeroImage,

      descriptions: [
        {
          label:
            "Our attorneys and legal professionals are also experienced engineers, often with advanced technical degrees and patents of their own.",
        },
        {
          label:
            "Many have significant experience as engineers and managers in technology companies (including joint MBA-Engineering degree holders).",
        },
        {
          label:
            "Just as importantly, we know how to leverage those rights into business assets that will advance your career and secure your place in the market.",
        },
      ],
    },
    PROFESSIONAL_LIST_PROPS: professionalsListData,
  },
  careerPage: {
    career_hero_section: {
      title: "Your Journey Starts Here",
      description:
        "At Slater Matsil, we work at the intersection of technology and law to protect the world’s most ambitious ideas. Our team is built with engineers, inventors, legal strategists, and IP specialists who turn complex innovations into powerful intellectual property. We serve global technology leaders, high-growth startups, and visionary founders — and we’re always looking for exceptional minds to join us.",
      bgImage: careerHeroBackgroundImage.src,
      heroImage: careerHeroImage,
      ctaButton1: {
        text: "Start your growth journey",
      },
      shortDescription:
        "Join a culture that values long-term success. Let us simplify the path so your career can thrive.",
      ctaButton2: {
        text: "Career Opportunities",
      },
    },
    career_work_with_us: {
      firstTitle: "Why Work ",
      secondTitle: "With Us",
      shortDescription: "Where Your Talent Meets Purpose",
      work_list_data: CAREER_WORK_LIST_DATA,
      section_img: whyWork,
    },
    career_open_roles: {
      title: "Open Roles / Opportunities",
      shortDescription: "Opportunities for Problem Solvers and Innovators",
      description:
        "Slater Matsil is a global intellectual property law firm headquartered in Dallas, Texas. We believe your work should be as rewarding as it is challenging, and we understand how difficult it can be to elevate your career in an oversized firm that limits your potential. If you're a patent professional or technical advisor who believes that your workplace should be as stimulating as your workbench, we want to hear from you.",
      tabSectionData: {
        tabData: [
          {
            title: CAREER_OPEN_ROLES_TAB_DATA.ATTORNEY,
          },
          {
            title: CAREER_OPEN_ROLES_TAB_DATA.TECHNICAL_ADVISOR,
          },
        ],
        tabContentData: {
          tab_attorney_content_Data: [
            {
              title: "Attorney",
              description1:
                "Slater Matsil, a firm based in Dallas concentrates in intellectual property law, seeks patent attorneys with strong legal and technical skills to join its growing practice.  ",
              description2:
                "This position involves representing foreign and domestic clients in all aspects of patent law. Depending upon your qualifications and desires and the firm’s needs, career opportunities may include significant patent preparation and prosecution work, client advice and counseling, and IP licensing and litigation activities. We actively encourage professional growth and career development. As such, attorneys are given frequent and meaningful client contact, have substantial interaction with firm management, and are supported in their efforts to develop new client relationships and business opportunities. Compensation exceeds market rates for highly skilled and motivated individuals.",
              description3:
                "Ideal candidates should have a J.D. degree (top 10 percent of law school class), plus engineering experience or an advanced technical degree in the electrical, telecommunications, semiconductor, mechanical, chemical, material sciences, physics, or computer science fields, and two to five years of patent law experience. Strong candidates without engineering experience or an advanced engineering degree will be considered. Current membership in good standing of any U.S. state bar and eligibility to practice patent law before the U.S. Patent and Trademark Office are required. ",
              description4:
                "Slater Matsil is subject to United States export control laws and regulations related to the export or deemed export of technology from the United States. As such, foreign nationals may be restricted from working with controlled technologies or items or may be required to obtain an export license. As part of the employment application process, all applicants must be able to document their status as a U.S. citizen or national, asylee, refugee or lawful permanent resident or their qualification for permanent employment in the U.S.",
            },
          ],
          tab_technical_advisor: [
            {
              title: "Technical Advisor/Patent Agent",
              description1:
                "Slater Matsil, a firm based in Dallas concentrates in intellectual property law, seeks Patent Agents And Technical Advisors With Strong Technical Skills to join its growing practice.  ",
              description2:
                "The position involves patent preparation and prosecution services for some of the world’s leading technology innovators.",
              description3:
                "Potential candidates should have a M.S. or Ph.D., preferably in the electrical, telecommunications, semiconductor, or computer science and engineering fields, and a proven ability to quickly learn new technologies along with excellent communication (verbal and writing) skills. For Technical Specialists, prior experience in patent prosecution is beneficial but is not required. Successful candidates will learn from some of the best legal minds in the industry while servicing research and development projects and technology market leaders from around the world. We actively encourage professional growth and career development, including opportunities to attend law school and become a Patent Attorney while working at the firm.",
              description4:
                "Slater Matsil is subject to United States export control laws and regulations related to the export or deemed export of technology from the United States. As such, foreign nationals may be restricted from working with controlled technologies or items or may be required to obtain an export license. As part of the employment application process, all applicants must be able to document their status as a U.S. citizen or national, asylee, refugee or lawful permanent resident or their qualification for permanent employment in the U.S.",
            },
          ],
          // tab_attorney_content_Data: {
          //   data1: {
          //     title: "Attorney",
          //     description:
          //       "Slater Matsil, a firm based in Dallas concentrates in intellectual property law, seeks patent attorneys with strong legal and technical skills to join its growing practice.",
          //   },
          //   data2: {
          //     description:
          //       "This position involves representing foreign and domestic clients in all aspects of patent law. Depending upon your qualifications and desires and the firm’s needs, career opportunities may include significant patent preparation and prosecution work, client advice and counseling, and IP licensing and litigation activities. We actively encourage professional growth and career development. As such, attorneys are given frequent and meaningful client contact, have substantial interaction with firm management, and are supported in their efforts to develop new client relationships and business opportunities. Compensation exceeds market rates for highly skilled and motivated individuals.",
          //   },
          //   data3: {
          //     description:
          //       "Ideal candidates should have a J.D. degree (top 10 percent of law school class), plus engineering experience or an advanced technical degree in the electrical, telecommunications, semiconductor, mechanical, chemical, material sciences, physics, or computer science fields, and two to five years of patent law experience. Strong candidates without engineering experience or an advanced engineering degree will be considered. Current membership in good standing of any U.S. state bar and eligibility to practice patent law before the U.S. Patent and Trademark Office are required. ",
          //   },
          // },
          // tab_technical_advisor: {
          //   data1: {
          //     title: "Attorney",
          //     description:
          //       "Slater Matsil, a firm based in Dallas concentrates in intellectual property law, seeks patent attorneys with strong legal and technical skills to join its growing practice.",
          //   },
          //   data2: {
          //     description:
          //       "This position involves representing foreign and domestic clients in all aspects of patent law. Depending upon your qualifications and desires and the firm’s needs, career opportunities may include significant patent preparation and prosecution work, client advice and counseling, and IP licensing and litigation activities. We actively encourage professional growth and career development. As such, attorneys are given frequent and meaningful client contact, have substantial interaction with firm management, and are supported in their efforts to develop new client relationships and business opportunities. Compensation exceeds market rates for highly skilled and motivated individuals.",
          //   },
          //   data3: {
          //     description:
          //       "Ideal candidates should have a J.D. degree (top 10 percent of law school class), plus engineering experience or an advanced technical degree in the electrical, telecommunications, semiconductor, mechanical, chemical, material sciences, physics, or computer science fields, and two to five years of patent law experience. Strong candidates without engineering experience or an advanced engineering degree will be considered. Current membership in good standing of any U.S. state bar and eligibility to practice patent law before the U.S. Patent and Trademark Office are required. ",
          //   },
          // },
        },
      },
      // description2:
      //   "Slater Matsil is subject to United States export control laws and regulations related to the export or deemed export of technology from the United States. As such, foreign nationals may be restricted from working with controlled technologies or items or may be required to obtain an export license. As part of the employment application process, all applicants must be able to document their status as a U.S. citizen or national, asylee, refugee or lawful permanent resident or their qualification for permanent employment in the U.S.",
    },
  },
  practiceGroupPage: {
    practiceGroup_hero_section: {
      title: "Practice Groups",
      heading: "Technical minds. Powerful IP advocacy.",
      description1:
        "At Slater Matsil, our practice groups are structured to deliver specialized IP services — from patent prosecution to global portfolio strategy — so you get both deep technical knowledge and robust legal support.",
      firstHeroImage: practiceGroupPageHeroImage1,
      secondHeroImage: practiceGroupPageHeroImage2,
      thirdHeroImage: practiceGroupPageHeroImage3,
      description2:
        "Although Slater Matsil is a full service IP practice supporting clients in diverse fields, we have several highly-specialized practice groups that bring particular expertise and experience in their respective fields. Click on the below links to meet the members of our Practice Groups:",
    },
    practiceGroup_section: {
      tabData: [
        {
          groupNumber: "Group 1",
          title: PRACTICE_GROUP_TAB_DATA.CIRCUITS_SYSTEMS_AND_SIGNAL_PROCESSING,
          description1:
            "Our Circuits, Systems and Signal Processing Group brings decades of engineering design and research experience to the practice. Our clients appreciate and value the enhancement this experience brings when dealing with highly complex systems and circuits.",
          description2:
            "Representative technologies that are handled by the Circuits, Systems, and Signal Processing Group include Semiconductor Circuits (analog and mixed signal integrated circuits, application specific integrated circuits (ASICS), data converters, radio frequency integrated circuits, memory circuits, and digital signal processing); Radio Frequency Systems (radar systems, cellular communication systems, and millimeter-wave systems); Power Systems (switched-mode power supplies, inverters, motors, high voltage switches, motor systems, and lighting systems); and Control Systems (automotive and flight control systems).",
          data: [
            {
              primary:
                "Benjamin E. Nise, J.D., B.S.E.E., Partner & Patent Attorney",
              secondary:
                "15 years of design experience in analog, RF, and mixed signal integrated circuits for the telecommunications, semiconductor, and medical device industries.",
            },
            {
              primary: "Peter J. Meza, J.D., M.S.E.E., Patent Attorney ",
              secondary:
                "12 years of design experience in analog circuit design.",
            },
            {
              primary: "Payam Rashidi, M.S.E.E., Patent Attorney",
              secondary:
                "12 years of design experience in research and development in the field of RF systems for the defense industry.",
            },
            {
              primary: 'Yumin "Jeff" Zhang, Ph.D., Patent Agent ',
              secondary:
                "14 years of research and development in digital signal processing for the telecommunications, consumer electronics, semiconductor, and oil and gas industries.",
            },
          ],
        },
        {
          groupNumber: "Group 2",
          title:
            PRACTICE_GROUP_TAB_DATA.NOVEL_MATERIALS_DEVICES_AND_APPLIED_PHYSICS,
          description1:
            "Our Novel Materials, Devices, and Applied Physics Practice Group is a team of forward-thinking domain specialists, many with Ph.D.’s, who have both industry and legal expertise. In addition to the hundreds of patents they have obtained for our clients in related fields, many of our group members are inventors in their own right, with 150+ patents issued to them collectively.",
          description2:
            "Representative technologies that fall under the Novel Materials, Device and Applied Physics group include photonics such as lasers, solid state lighting, and displays; semiconductor devices including devices for flexible electronics, organic semiconductors, photonic, photovoltaic, and quantum devices, and spintronics based devices; devices for digital and quantum communications and computing; imaging devices; 3-D printing; sensors including quantum sensors; other nanotechnology; and bioscience including medical imaging.",
          data: [
            {
              primary:
                "Srini Chakravarthi, J.D., Ph.D., Partner & Patent Attorney",
              secondary:
                "10 years of experience in semiconductor process/device modeling, process integration, and device design. Inventor on 25 issued patents.",
            },
            {
              primary:
                "Lizabeth Vice, J.D., B.S.E.E., Partner & Patent Attorney",
              secondary:
                "More than a decade\u2019s experience in prosecuting semiconductor process technology.",
            },
            {
              primary: "Amitava Chatterjee, Ph.D., Technical Advisor",
              secondary:
                "27 years of experience in process integration, device design, and electrostatic discharge protection. IEEE Fellow.",
            },
            {
              primary: "Jonathan Insler, Ph.D., Patent Agent",
              secondary:
                "12 years of research and academic experience in particle physics.",
            },
            {
              primary: "Joseph E. McManis, Ph.D., Patent Agent",
              secondary:
                "12 years of experience in semiconductor device design and fabrication and failure analysis.",
            },
            {
              primary: "Marc McWilliams, Ph.D., Patent Attorney",
              secondary:
                "6 years of experience in biosensing, nanoscale self-assembly, semiconductor processing, e-beam lithography, and computer simulation.",
            },
            {
              primary: "Rameez Samnakay, Ph.D., Patent Agent",
              secondary:
                "6.5 years of experience in developing semiconductor process technology.",
            },
            {
              primary: "Paata Kakashvili, Ph.D., Physics, Patent Agent",
              secondary:
                "Over a decade\u2019s research in condensed matter physics.",
            },
            {
              primary: "Zachary Williams, Ph.D., Technical Advisor",
              secondary:
                "6 years of experience in detection of neutrinos and associated hardware.",
            },
          ],
        },
        {
          groupNumber: "Group 3",
          title: PRACTICE_GROUP_TAB_DATA.ARTIFICIAL_INTELLIGENCE,
          description1:
            "Our Artificial Intelligence Practice Group is a team of technically trained professionals with hands-on experience in both industry and legal practice. Our group members bring advanced degrees in computer science, electrical engineering, and related fields, along with real-world experience developing and deploying the AI systems they now help protect.",
          description2:
            "Representative technologies that fall under the Artificial Intelligence group include machine learning and deep learning frameworks; neural network architectures including convolutional, recurrent, and transformer-based models; natural language processing and large language models; computer vision and image recognition; generative AI systems; AI-enabled hardware including inference accelerators and neuromorphic chips; autonomous systems and robotics; and AI applications in areas such as healthcare, financial technology, and industrial automation.",
          data: [
            {
              primary: "Payam Rashidi, J.D., M.S.E.E., Patent Attorney ",
              secondary:
                "Conducted research on neural networks as statistical indicators in analyzing electromagnetic signals for healthcare applications.",
            },
            {
              primary:
                "Robert G. Graham, J.D., B.S.E.E., Partner & Patent Attorney ",
              secondary:
                "9 years of experience in software development, software project management, IOT and sensor network design.",
            },
            {
              primary: "Zhu He, J.D., M.S.C.S, Partner & Patent Attorney ",
              secondary: "10 years of experience in software engineering.",
            },
            {
              primary: "Jeffrey Robert Guinn, J.D., M.S.E.E., Patent Attorney ",
              secondary:
                "6 years experience in software, networking, and cloud computing",
            },
            {
              primary: "Chuanming Wei, J.D., Ph.D. E.E., Patent Attorney ",
              secondary:
                "9 years experience designing embedded hardware for telecommunications",
            },
          ],
        },
        {
          groupNumber: "Group 4",
          title:
            PRACTICE_GROUP_TAB_DATA.COMMUNICATIONS_AND_NETWORK_TECHNOLOGIES,
          description1:
            "Our Communications and Network Technologies Practice Group brings together attorneys and technical professionals with hands-on engineering and research experience in the telecommunications and networking industries. Our professionals hold advanced degrees in electrical engineering, computer engineering, and computer science, and many have worked directly in the telecommunications industry prior to entering legal practice. The group has particular depth in standard essential patents and complex multi-jurisdictional prosecution strategies for communications technologies.",
          description2:
            "Representative technologies that fall under the Communications and Network Technologies group include wireless communications systems and protocols; antenna and RF systems; optical and wireline communications; network infrastructure and architecture; data networking and routing; Internet of Things and embedded communications systems; signal processing for communications; VoIP and unified communications; augmented and virtual reality communications; smart grid and sensor networks; FinTech and cloud-based communications platforms; and semiconductor devices for communications applications.",
          data: [
            {
              primary:
                "Elizabeth D. Iglesias, J.D., B.S.E.E., Partner & Patent Attorney",
              secondary:
                "6+ years of experience in patent litigation with current focus on telecommunications, enterprise networks, and standard essential patents.",
            },
            {
              primary:
                "Benjamin E. Nise, J.D., B.S.E.E., Partner & Patent Attorney",
              secondary:
                "15 years of design experience in analog, RF, and mixed signal integrated circuits for the telecommunications, semiconductor, and medical device industries.",
            },
            {
              primary: "Zhu He, J.D., M.S.C.S., Partner & Patent Attorney",
              secondary:
                "10 years as a senior software engineer at a Fortune 500 company with expertise in telecommunications, data networking, VoIP, and network management.",
            },
            {
              primary: "Chuanming Wei, Ph.D., J.D., Patent Attorney",
              secondary:
                "9 years of prior research and industry experience in telecommunications, wireless sensor networks, and smart grids.",
            },
            {
              primary: "Jonathan Ward, J.D., B.S.C.S., Patent Attorney",
              secondary:
                "Over 20 years of legal experience covering telecommunications, IoT, cloud computing, signal processing, and embedded systems.",
            },
          ],
        },
        {
          groupNumber: "Group 5",
          title: PRACTICE_GROUP_TAB_DATA.COMPUTER_SYSTEMS_AND_SOFTWARE,
          description1:
            "Innovators in an evolving digital landscape need to work with IP professionals who have their finger on the pulse of advancements in areas such as computer hardware, storage systems, network communications, telecommunications, mobile applications, mobility technologies, cloud computing, and cybersecurity. Our professionals have real-world experience in emerging fields such as distributed parallel processing, software engineering, image processing, and cyber security solutions.",
          description2:
            "Representative technologies that fall under the Computer Systems and Software practice group include processor and microprocessor architecture including CPU, GPU, and APU design; memory systems and storage architectures; firmware and embedded software; operating systems and virtualization; cloud computing and distributed systems; mobile and web applications; cybersecurity and network security; computer graphics and image processing; augmented and virtual reality; Internet of Things platforms; and software-enabled applications in areas such as financial technology, autonomous systems, and enterprise infrastructure.",
          data: [
            {
              primary: "Ira Matsil, J.D., M.S.E.E., Partner & Patent Attorney",
              secondary:
                "Besides spending almost a decade inhouse in a large chip company and being actively involved in licensing of leading semiconductor technologies, Ira also spent a few years in engineering research and testing.",
            },
            {
              primary:
                "John D. Koetter, J.D., B.S.C.E., Partner & Patent Attorney",
              secondary:
                "7 years of experience in software and hardware engineering in the aerospace industry.",
            },
            {
              primary:
                "Stephen A. Cortiaus, J.D., B.S.E.E.,Partner & Patent Attorney",
              secondary:
                "3 years of engineering experience in computer hardware, firmware, and software.",
            },
            {
              primary: "Jeffrey Robert Guinn, J.D., M.S.E.E., Patent Attorney",
              secondary:
                "6 years experience in software, networking, and cloud computing",
            },
            {
              primary:
                "Roger C. Knapp, J.D., M.B.A., B.S.C.S., Patent Attorney",
              secondary:
                "15 years of engineering experience and technical management in the telecommunication industry.",
            },
          ],
        },
        {
          groupNumber: "Group 6",
          title: PRACTICE_GROUP_TAB_DATA.CHEMISTRY_AND_MATERIALS_SCIENCE,
          description1:
            "As industries from energy, specialty chemicals, and consumer products to advanced materials and medical devices push the boundaries of chemical innovation, IP protection demands professionals with deep scientific fluency across the chemical disciplines. Our professionals bring firsthand research and industry experience spanning electrochemistry and catalysis, organometallic chemistry, computational and theoretical chemistry, polymer science, analytical method development, and materials characterization.",
          description2:
            "Representative technologies that fall under the Chemistry and Materials Science practice group include chemical formulations for photolithography, oil and gas, and consumer products; design and manufacturing of quantum computers including qubit materials and cryogenic systems; battery and energy storage materials and devices; instrumentation and analytical testing methods; and coatings and surface treatments.",
          data: [
            {
              primary:
                "Srini Chakravarthi, J.D., Ph.D., Partner & Patent Attorney",
              secondary:
                "over a decade of academic and industrial research experience spanning nanotechnology, materials science, and advanced semiconductor technologies.",
            },
            {
              primary: "Hsin-Ya Kuo, Ph.D., Chemistry, Patent Agent",
              secondary: "11 years research experience as an organic chemist",
            },
            {
              primary: "Fantai Kong, Ph.D., M.S.E., Technical Advisor",
              secondary: "12 years research experience in energy storage",
            },
            {
              primary: "Shervin Fatehi, Ph.D., Chemistry, Technical Advisor",
              secondary:
                "20 years with broad research and academic experience in physical, theoretical, and computational chemistry.",
            },
            {
              primary: "Soonshin D. Kwon, Ph.D., M.S.E., Technical Advisor",
              secondary:
                "15 years of research and development experience in semiconductor process technology.",
            },
          ],
        },
        {
          groupNumber: "Group 7",
          title: PRACTICE_GROUP_TAB_DATA.LITIGATION_GROUP,
          description1:
            "Intellectual Property Right assertions are a multi-billion dollar industry in the U.S. and even greater world-wide. Our Litigation Group members are frequently brought into litigation matters to offer the strategic support that our backgrounds as technologists provide. We pride ourselves on our ability to bridge the oftentimes different perspectives of and languages used by lawyers and courts, on the one hand, and inventors and clients, on the other hand.",
          description2:
            "Our Litigation Group typically works in tandem with lead litigation counsel to provide strategic support, including: asserting or defending against post-grant challenges (e.g., IPR\u2019s); claim construction development, including Markman briefing and hearings; expert witnesses discovery, including report drafting and depositions; infringement analysis for both patent assertions and defensive analysis; and developing defenses, such as prior art searching, and invalidity and non-infringement contentions. We have supported many of the nation\u2019s preeminent patent litigation law firms and frequently are brought in time and again for additional matters.",
          data: [
            {
              primary:
                "Steven H. Slater, J.D., B.S.E.E., Group Leader, Partner & Patent Attorney",
              secondary:
                "25 years of experience representing clients in District Court, the International Trade Commission (ITC), and before the Patent Trial and Appeal Board (PTAB).",
            },
            {
              primary:
                "Michael Kucher, J.D., L.L.M., M.S. Physics, Partner & Patent Attorney",
              secondary:
                "licensed to practice law in both the U.S. and Europe, with over ten years of experience managing patent assertions in both an in-house and an outside counsel capacity.",
            },
            {
              primary: "Brian A. Carlson, J.D., M.S.E.E., Patent Attorney",
              secondary:
                "experience in litigation support including expert witness discovery and developing non-infringement and invalidity defenses in District Court and before the Patent Trial and Appeal Board (PTAB).",
            },
            {
              primary:
                "Robert G. Graham, J.D., B.S.E.E., Partner & Patent Attorney",
              secondary:
                "experience in representing numerous patent owners in District Court litigation, as well as general counseling on litigation matters.",
            },
            {
              primary: "Vijay D. Desai, J.D., B.S.Ch.E., Patent Attorney",
              secondary:
                "experience in mass tort litigation as well as multi-party intellectual property litigation.",
            },
            {
              primary:
                "John D. Koetter, J.D., B.S.C.E., Partner & Patent Attorney",
              secondary:
                "experience in District Court litigation and post-grant challenges before the Patent Trial and Appeal Board (PTAB).",
            },
            {
              primary:
                "Lizabeth Vice, J.D., B.S.E.E., Partner & Patent Attorney",
              secondary:
                "experience in District Court litigation and post-grant challenges before the Patent Trial and Appeal Board (PTAB).",
            },
            {
              primary: "Chad Terrell, J.D., B.S.C.E., Patent Attorney",
              secondary:
                "experience in District Court litigation and post-grant challenges before the Patent and Appeal Board (PTAB).",
            },
          ],
        },
        {
          groupNumber: "Group 8",
          title: PRACTICE_GROUP_TAB_DATA.ASIA_PACIFIC_GROUP,
          description1:
            "While not a separate practice area, per se, we recognize that the field of intellectual property rights is rapidly moving and increasingly important for clients in the Asia Pacific region, particularly China and Taiwan. Understanding the cultural and business needs of our clients can, at times, be as important as thoroughly understanding their technologies.",
          description2:
            "Our Asia Pacific Group was formed to assist both newly formed and established Asian companies navigate the unfamiliar and sometimes-treacherous waters of U.S. intellectual property law and practices. Having lawyers and other patent professionals who literally speak their language and understand their culture greatly assists our clients in becoming familiar and comfortable with doing business in the U.S., and with working in their own home countries with U.S. businesses.",
          data: [
            {
              primary: "OUR PRACTITIONERS WHO ARE FLUENT IN MANDARIN INCLUDE:",
              isHeader: true,
            },
            {
              primary:
                "\u5192\u63da Lizabeth Vice, J.D., B.S.E.E., Patent Attorney",
            },
            {
              primary: "\u4f55\u8457 Zhu He, J.D., M.S.C.S., Patent Attorney",
            },
            {
              primary:
                "\u5f35\u82e5\u524d Ruojian Zhang, M.S.E.E., Distinguished Patent Agent",
            },
            {
              primary:
                '\u5f35\u8c6b\u6c11 Yumin "Jeff" Zhang, Ph.D. (E.E.), Distinguished Patent Agent',
            },
            {
              primary:
                "OUR PRACTITIONERS WHO ARE FLUENT IN OTHER ASIAN LANGUAGES INCLUDE:",
              isHeader: true,
            },
            {
              primary:
                "Srini Chakravarthi, J.D., Ph.D. (Mat. Sc.), Partner & Patent Attorney",
              secondary: "Hindi and Tamil",
            },
            {
              primary: "Payam Rashidi, M.S.E.E., Patent Attorney",
              secondary: "Farsi",
            },
            {
              primary: "Amitava Chatterjee, Ph.D. (E.E.), Technical Advisor",
              secondary: "Hindi and Bangla",
            },
            {
              primary: "Rameez Samnakay, Ph.D., Patent Agent",
              secondary: "Hindi, Kiswahili and Urdu",
            },
            {
              primary: "Shervin Fatehi, Ph.D., Technical Advisor",
              secondary: "Farsi",
            },
          ],
        },
      ],
    },
    meetPractitioners: {
      title: "MEET OUR PRACTITIONERS",
      data: [
        {
          primary:
            "Benjamin E. Nise, J.D., B.S.E.E., Partner & Patent Attorney",
          secondary:
            "15 years of design experience in analog, RF, and mixed signal integrated circuits for the telecommunications, semiconductor, and medical device industries.",
        },
        {
          primary: "Peter J. Meza, J.D., M.S.E.E., Patent Attorney",
          secondary: "12 years of design experience in analog circuit design.",
        },
        {
          primary: "Payam Rashidi, M.S.E.E., Patent Attorney",
          secondary:
            "12 years of design experience in research and development in the field of RF systems for the defense industry.",
        },
        {
          primary: 'Yumin "Jeff" Zhang, Ph.D., Patent Agent',
          secondary:
            "14 years of research and development in digital signal processing for the telecommunications, consumer electronics, semiconductor, and oil and gas industries.",
        },
      ],
    },
  },
  whoWeServePage: {
    whoWeServepageHeroSection: {
      title: "unlock the value",
      heading1: "Our Global Reach Covers",
      spanHeading1: "Industries",
      spanHeading2: "Countries",
      img: whoweserveHero,
    },
    whoWeServeAboutSection: {
      leftSideDescription:
        "From Fortune 100 firms to high-tech start-ups, Slater Matsil represents clients whose ideas are shaping our world. ",
      img: lightLogo,
      rightSideDescription:
        "Our highly focused practice serves a wide spectrum of clients. In our transactional practice, we represent with equal zeal large corporations handling thousands of IP rights per year and start-up companies for whom one or two seminal patents represent the seed for the company's growth. Our numerous multinational clients have afforded us the opportunity to establish relationships with partner law firms in the countries and cities where business is being done throughout the world. In our litigation practice, we also work closely with a select group of some of the best law firms in the U.S., providing litigation support services that run the gamut from assisting litigation counsel in understanding nuances of the technology or IP rights involved through first chair responsibility for the technical aspects of a case, including claim construction, expert witness discovery, and the like. ",
      quoteCardData: {
        quote:
          "Slater Matsil is a high quality patent-driven boutique with skills in both prosecution and litigation. The people I have worked with there have been very professional, courteous, and trustworthy.",
        author:
          "Senior Partner Chairing IP Section of Large General Practice Law Firm",
      },
    },
    whoWeServeTabsSection: [
      {
        title: WHO_WE_SERVE_PAGE_TAB_DATA.LARGE_CORPORATIONS,
        bigDescription:
          "Slater Matsil is a one-stop destination for managing large patent portfolios. Our corporate clients are market leaders that depend heavily on innovation. As first movers in their respective industries, our clients understand the importance of IP leadership and rely on us to develop and execute their IP strategy. Because of our experience in all aspects of IP law",
        quote:
          "— from prosecution to licensing to litigation — we provide our clients the knowledge and insights they need to maintain this leadership role.",
        data: [
          {
            description:
              "We manage prolific portfolios without compromising attention to detail and quality. ",
          },

          {
            description:
              "Although a relatively small firm, Slater Matsil is one of the largest pure play IP boutiques in the southwest region and has a dedicated patent practice that rivals that of many national firms employing hundreds of lawyers. We achieve this by assigning a dedicated team of Slater Matsil professionals to each client. This ensures that our clients, with portfolios big and small, receive personalized treatment from Slater Matsil professionals who quickly drill down to the technical depth necessary to complete each specific project.",
          },
          {
            description:
              "Many of our corporate clients invest billions of dollars per year in Research and Development, which results in sophisticated and complex technological improvements. Some of these same clients file thousands of applications per year (in the U.S. and abroad) to protect these improvements, resulting in a substantial number of cases being active at any given time. Because of our technical depth and our dedicated team approach, we are able to come up to speed quickly on the most complex technologies and ensure our clients’ investments in R&D are protected timely and efficiently. ",
          },
          {
            description:
              "Our clients demand a return on their IP investments. For some, a defensive IP strategy guaranteeing them freedom to operate and the ability to protect market share is foremost. For others, IP rights are tangible evidence of their technology leadership. Leveraging IP rights to gain access to other technologies through cross-licenses or otherwise monetizing IP rights is another way to provide a return on the IP investment. Of course, the more successful a company is in the marketplace, the more likely that company is to be the target of adverse patent assertions. Slater Matsil’s licensing and litigation practice group has decades of collective experience in asserting and defending IP rights. In fact, Slater Matsil was one of the first firms to bring Inter Partes Review challenges under the AIA in 2013. There is a reason why our clients contact us when the outcome is simply too important to compromise.",
          },
        ],
        quoteCardData: {
          quote:
            "Slater Matsil understands our technology very well and we give our most important cases to the firm. We trust them and trust the legal opinions they provide.",
          author: "Chief IP Counsel, Large Corporate Technology Leader",
        },
      },
      {
        title: WHO_WE_SERVE_PAGE_TAB_DATA.SMALL_COMPANIES,
        bigDescription:
          "As a stellar boutique in a constellation of mega law firms, Slater Matsil understands the unique challenges facing smaller companies and emerging ventures seeking to compete in a constantly changing and sometimes hostile business environment.",
        quote: "",
        data: [
          {
            description:
              "These clients require a different type of care than companies who are better versed in IP law or who have a substantial in-house IP team. Over the years, Slater Matsil has worked with many small entities to realize their goals. We work with the founders, business leaders, board members, and CTOs to understand their business objectives and develop an overarching IP strategy and policy that maximizes the usefulness and value of their IP. Consequently, we are able to provide all the services of an in-house IP department, as needed, to clients at every stage. Amongst other things, we have assisted our clients on a vast array of matters including post grant proceedings at the U.S. Patent Office, licensing, litigation, freedom to operate studies, importation of protected IP, IP agreements, and trademark matters.  In serving as their IP department, we implement the vision of the stakeholders of the company to successfully manage, defend and monetize the company’s IP.  ",
          },

          {
            description:
              "Although a relatively small firm, Slater Matsil is one of the largest pure play IP boutiques in the southwest region and has a dedicated patent practice that rivals that of many national firms employing hundreds of lawyers. We achieve this by assigning a dedicated team of Slater Matsil professionals to each client. This ensures that our clients, with portfolios big and small, receive personalized treatment from Slater Matsil professionals who quickly drill down to the technical depth necessary to complete each specific project.",
          },
          {
            description:
              "We understand that funding is the lifeline that sustains nascent technologies and companies. Slater Matsil is well-versed in the metrics that venture capital firms and other funding sources look to when considering investment decisions and evaluating performance. We can assist in tailoring IP strategies to these criteria when appropriate. “Strategic partners” is more than just a buzz phrase at Slater Matsil. We are open to a wide range of alternative fee structures, including success-sharing arrangements, when circumstances permit.",
          },
        ],
        quoteCardData: {
          quote:
            "Slater Matsil is a well-rounded, professional patent firm that can handle a full range of patent work from the basic to the more complex.",
          author: "Founder and CEO of a Start-Up Company",
        },
      },
      {
        title: WHO_WE_SERVE_PAGE_TAB_DATA.US_LAW_FIRMS,
        bigDescription:
          "IP disputes generate incredibly complex litigation, frequently lasting years and spanning multiple borders and time zones. The stakes are great, the issues are complicated, and time pressures are intense.",
        quote: "",
        data: [
          {
            description:
              "IP-centric litigation of this nature requires a team of professionals offering diverse skills.  Slater Matsil’s litigation support practice works seamlessly with our partner law firms to provide services as part of an integrated effort. Some law firms engage us to manage IP issues that are outside their typical practice areas. Other law firms have an established IP litigation practice, but simply need additional boots on the ground or skilled support. For example, we have worked with many trial law firms to provide patent litigation expertise, including providing expert witness testimony on matters of patent prosecution practice and inequitable conduct issues. We have worked side by side with trial counsel on discovery and pre-trial preparation matters, liaised with expert witnesses, played a key role in claim construction briefing and Markman hearings, and provided expert testimony on an assortment of processes and technologies. We also routinely work with other firms in performing prior art searches, pre-filing diligence, and the like to complement the work being done at these firms. ",
          },

          {
            description:
              "Our familiarity with the challenges facing litigation counsel, from discovery issues to concerns about privilege and waiver, make us ideal candidates for handling Patent Office matters relating to or preceding litigation. We have assisted litigation counsel from simple matters such as correcting procedural deficiencies, filing certificates of correction, and correcting assignment records, to must-win matters such as challenging and defending post grant challenges (e.g., Inter Partes Reviews) arising from litigation.",
          },
        ],
        quoteCardData: {
          quote:
            "Slater Matsil is a jewel box, a best-in-class patent firm universally known for a superlative quality work product and wonderful people.",
          author: "Managing Partner, IP Boutique Law Firm",
        },
      },
      {
        title: WHO_WE_SERVE_PAGE_TAB_DATA.INTERNATIONAL_LAW_FIRMS,
        bigDescription:
          "Perhaps because so many of our clients are based outside the U.S., Slater Matsil cultivates relationships with firms in countries throughout the world. Firms outside the U.S. routinely rely on us for all IP matters related to U.S. law.",
        quote: "",
        data: [
          {
            description:
              "These clients are well-versed in their local laws and appreciate the importance of having an exemplary U.S. professional handle their client’s IP issues. We, in turn, rely upon those firms to assist our U.S. based clients when seeking IP counsel elsewhere. ",
          },

          {
            description:
              "We work with our international partners to file and prosecute U.S. patent applications at the U.S. Patent Office, based upon innovations originating outside the U.S. Our international clients also rely upon us for numerous and varied non-prosecution matters including advice, post grant proceedings, licensing, and litigation. We are the first firm of choice for many of our law firm clients based outside the U.S. who have come to appreciate our services on all issues relating to U.S. law.",
          },
          {
            description:
              "Among our various professionals, Slater Matsil is conversant in many of the major languages of the world. Having professionals who are multilingual increases the possibility that we can understand and discuss your clients’ needs in their native language, which we have found to be helpful in litigation and licensing, and even during patent preparation and prosecution.",
          },
        ],
        quoteCardData: {
          quote:
            "There are big IP firms on the East and West coasts whose quality is not any better but those firms are much more expensive. Slater Matsil does very good work and has a high level of responsibility.",
          author: "Partner, Major European Law Firm",
        },
      },
    ],
    quote: {
      quote:
        "Slater Matsil understands our technology very well and we give our most important cases to the firm. We trust them and trust the legal opinions they provide.",
      author: "Chief IP Counsel, Large Corporate Technology Leader",
    },
  },
  insightsPage: {
    heroSectionData: {
      heading: "Insights & Intellectual Perspectives",
      subHeading:
        "Stay informed with expert analysis, legal updates, and strategic insights from our patent professionals.",
      img: insightsHeroImage.src,
    },
    tab_data: [
      {
        title: INSIGHTS_TAB_DATA.ALL,
      },
      {
        title: INSIGHTS_TAB_DATA.NEWS,
      },
      {
        title: INSIGHTS_TAB_DATA.ARTICLES,
      },
      {
        title: INSIGHTS_TAB_DATA.LINKS,
      },
    ],
    quickLinks: {
      title: "Quick Links",
      data: [
        {
          img: building,
          title: "The European Patent Office (EPO)",
          href: "http://www.epo.org/index.html",
        },
        {
          img: globeOutline,
          title: "The American Intellectual Property Law Association (AIPLA)",
          href: "http://www.aipla.org/Pages/default.aspx",
        },
        {
          img: globeOutline,
          title: "The International Trademark Association (INTA)",
          href: "http://www.inta.org/Pages/Home.aspx",
        },
        {
          img: minicutBuilding,
          title: "China National Intellectual Property Administration (CNIPA)",
          href: "https://english.cnipa.gov.cn/",
        },
        {
          img: globeOutline,
          title: "The World Intellectual Property Organization (WIPO)",
          href: "http://www.wipo.int/portal/en/index.html",
        },
        {
          img: building,
          title: "The United States Patent & Trademark Office (USPTO)",
          href: "http://www.uspto.gov/",
        },
        {
          img: globeOutline,
          title: "The Japanese Patent Office (JPO)",
          href: "http://www.jpo.go.jp/",
        },
        {
          img: locationOutline,
          title: "The Canadian Intellectual Property Office (CIPO)",
          href: "http://www.ic.gc.ca/eic/site/cipointernet-internetopic.nsf/eng/Home?OpenDocument",
        },
      ],
    },
    insightsData: INSIGHTS_CARD_DATA,
    blogSection: {
      upcomingTitle: "Upcoming",
      watchPastTitle: "Watch Past Webinars",
      ctaTitle: "Ready to Safeguard Your Innovation?",
      ctaDescription:
        "At Slater Matsil, our patent professionals provide strategic guidance to protect your intellectual property and support your long-term growth.",
      ctaButtonText: "SCHEDULE A CONSULTATION",
      upcoming: [
        {
          id: 1,
          tag: "Upcoming",
          title: "Emerging Trends in AI Patent Law",
          subtitle: "Navigating Patent Challenges in the Age of AI",
          date: "March 12, 2026",
          description:
            "Explore how artificial intelligence is reshaping patent regulations and what innovators must know to stay protected.",
          img: blogUpcoming,
          bg: "#E4E3F8",
          slug: "emerging-trends-ai-patent-law",
        },
        {
          id: 2,
          tag: "Upcoming",
          title: "Future of Quantum Computing IP",
          subtitle: "Protecting the Next Frontier of Computation",
          date: "April 05, 2026",
          description:
            "A deep dive into the unique legal frameworks required to safeguard quantum computing breakthroughs.",
          img: blog2,
          bg: "#F4F7E6",
          slug: "future-quantum-computing-ip",
        },
      ],
      pastWebinars: [
        {
          id: 1,
          date: "22 July 2024",
          readTime: "4 min",
          title: "Our SaaS Product Just Launched!",
          description:
            "Remote work has drastically improved my design skills by giving me the freedom to experiment, focus, and learn at my own pace.",
          img: blog1,
          slug: "saas-product-just-launched",
        },
        {
          id: 2,
          date: "15 June 2024",
          readTime: "6 min",
          title: "Mastering Intellectual Property",
          description:
            "Understanding the core principles of IP is essential for any modern business to maintain a competitive advantage.",
          img: blog2,
          slug: "mastering-intellectual-property",
        },
        {
          id: 3,
          date: "10 May 2024",
          readTime: "5 min",
          title: "The Role of Patents in Biotech",
          description:
            "Biotechnology innovation relies heavily on strong patent protection. Here's what you need to know about the current landscape.",
          img: blog3,
          slug: "patents-in-biotech",
        },
        {
          id: 4,
          date: "18 April 2024",
          readTime: "8 min",
          title: "Cybersecurity & Legal Compliance",
          description:
            "As digital threats evolve, so do the legal requirements for data protection and cybersecurity resilience.",
          img: blog4,
          slug: "cybersecurity-legal-compliance",
        },
        {
          id: 5,
          date: "05 March 2024",
          readTime: "3 min",
          title: "Sustainable Tech Innovations",
          description:
            "Green technology is more than just a trend; it's a critical sector for future patent development and global impact.",
          img: blog5,
          slug: "sustainable-tech-innovations",
        },
        {
          id: 6,
          date: "22 February 2024",
          readTime: "5 min",
          title: "Global IP Strategy for Startups",
          description:
            "How small companies can navigate international patent systems without breaking the bank.",
          img: blog6,
          slug: "global-ip-strategy-startups",
        },
      ],
    },
  },
  contactPage: {
    hero_section_data: {
      heading: "Contact Us",
      description:
        "Your innovations deserve global protection — let’s start the conversation.",
      img: contactHeroImage,
    },
    form_section: {
      heading1: "Send Us a",
      heading2: "Message",
      description:
        "Ready to protect your intellectual property? Fill out the form below, and our experts will be in touch to assist you.",
    },
    contact_card_props: {
      heading: "Find Us Here",
      subTitle: "Get in touch with us.",
      contact_card_data: CONTACT_US_CARD_DATA,
    },
    follow_props: {
      title: "Follow Us",
      social_icons: [
        {
          Icon: FaLinkedinIn,
          href: "https://www.linkedin.com/company/slater-&-matsil-l-l-p-/",
        },
      ],
    },
    map_props: {
      title: "Visit Our Office",
      description:
        "We would be happy to meet with you at our office located in Dallas, Texas.",
      locationLink:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3346.6477572155536!2d-96.8047705252068!3d32.98669387324265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c23cde07bf391%3A0x662b3a35d44e3638!2sSlater%20Matsil%2C%20LLP!5e0!3m2!1sen!2sin!4v1766042747322!5m2!1sen!2sin",
    },
  },
  servicesPage: {
    pageTitle: "Services",
    heroSection: {
      heading1: "Evolving Legal Services for a ",
      heading2: "Global IP World",
      description:
        "Technology and globalization are changing the way you do business. Our firm bridges law, innovation, and technical expertise to protect your ideas.",
      img: serviceHeroSectionImage,
    },
    why_choose_strength_props: {
      title: "The Foundation Behind Global Innovation",
      heading: "Why Choose",
      spanHeading: "Slater Matsil",
      description:
        "We don’t just protect ideas—we empower innovation. With deep technical expertise and a history of success across several industries, we ensure your intellectual property stands the test of time.",
      our_strength: {
        heading: "Our Strength",
        data: STRENGTH_CARD_DATA,
      },
    },
    unparalleled_props: {
      title:
        "Slater Matsil provides unparalleled legal services throughout the life cycle of your IP rights.",
      img: unparalleledimage,
    },
    service_framework_props: {
      heading: "Our Service",
      spanHeading: "Framework",
      description:
        "Comprehensive intellectual property services organized across four strategic pillars",
      data: SERVICE_FRAMEWORK_CARD_DATA,
    },
  },
};
