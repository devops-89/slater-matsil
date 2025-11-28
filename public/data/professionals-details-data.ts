import { PROFESSIONAL_DETAILS_PROPS } from "@/utils/types";
import zachary from "@/professionals/transparent/zachary-williams.png";
export const PROFESSIONAL_DETAILS_DATA: PROFESSIONAL_DETAILS_PROPS[] = [
  {
    slug: "zachary-williams",
    professionals_Details_HeroSection: {
      name: "Zachary Williams",
      email: "",
      phoneNumber: "972.732.1001",
      img: zachary,
      vCardData: {
        name: "Zachary Williams",
        formattedName: "Zachary Williams",
        electronicMail: "",
        telephoneNumber: "972.732.1001",
        organization: "Slater Matsil",
        job_title: "Technical Advisor",
        address: {
          street: "17950 Preston Road, Suite 1000",
          city: "Dallas",
          postalCode: "75252-57293",
          countryRegion: "USA",
          state: "TX",
        },
        url: "",
        firstName: "Zachary",
        lastName: "Williams",
      },
    },
    PROFESSIONAL_BIO_DATA: [
      {
        description:
          "Zachary has research experience in particle physics working with liquid argon time projection chambers (LArTPCs) to study neutrino interactions. Zachary led the installation and commissioning, as the working group leader, of the Drift High Voltage (HV) subsystem of the ICARUS experiment at Fermilab. Zachary has worked with many types of photodetectors during his graduate studies, and also published a paper looking at the solubility of a common wavelength shifting coating used on PMTs in LArTPC detectors. In his advisor’s lab at the University of Texas at Arlington, Zachary helped build a liquid argon purification system.",
      },
      {
        description:
          "Zachary’s dissertation topic was a cross section measurement of neutrino induced charged-current coherent pion production on argon with the MicroBooNE detector at Fermilab. Zachary was also fortunate to be able to serve as an officer in the Fermilab Student and Postdoc Association (FSPA) while working on his research analysis at Fermilab.",
      },
    ],
    PROFESSIONAL_EDUCATION_DATA: [
      {
        description:
          "Zachary graduated from Stephen F. Austin State University in Nacogdoches, TX in 2015, majoring in physics. He then received his Ph.D. in physics from the University of Texas at Arlington in 2022.",
      },
    ],
    PROFESSIONAL_ADMISSIONS_DATA: [
      {
        list: [
          {
            label: "Graduated Summa Cum Laude in 2015",
          },
          {
            label:
              "Sigma Pi Sigma Outstanding Physics Student Award recipient in 2015",
          },
          {
            label:
              "William Bailey Outstanding Graduate Award recipient in 2015",
          },
        ],
      },
    ],
  },
];
