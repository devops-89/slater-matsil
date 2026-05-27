import React from "react";
import { Typography } from "@mui/material";
import { adelle } from "@/utils/fonts";
import { CareersHeroEditor } from "./CareersHeroEditor";
import { CareersWorkWithUsEditor } from "./CareersWorkWithUsEditor";
import { CareersOpenRolesEditor } from "./CareersOpenRolesEditor";

export const CareersPageForms = ({ activeSection, websiteData, updateCareerPage }: any) => {
  switch (activeSection) {
    case 0:
      return (
        <CareersHeroEditor 
          data={websiteData?.careerPage?.career_hero_section} 
          onChange={(newData: any) => updateCareerPage('career_hero_section', newData)} 
        />
      );
    case 1:
      return (
        <CareersWorkWithUsEditor 
          data={websiteData?.careerPage?.career_work_with_us} 
          onChange={(newData: any) => updateCareerPage('career_work_with_us', newData)} 
        />
      );
    case 2:
      return (
        <CareersOpenRolesEditor 
          data={websiteData?.careerPage?.career_open_roles} 
          onChange={(newData: any) => updateCareerPage('career_open_roles', newData)} 
        />
      );
    default:
      return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Select a section to edit.</Typography>;
  }
};
