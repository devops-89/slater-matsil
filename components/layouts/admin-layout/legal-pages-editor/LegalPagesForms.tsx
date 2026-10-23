import React from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { adelle } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import { LEGAL_CONTENT_BLOCK } from "@/utils/types";

// Helper functions to convert between plain text and structured blocks
const blocksToText = (blocks: LEGAL_CONTENT_BLOCK[] = []) => {
  return blocks.map(b => {
    if (b.type === 'list') {
      return b.items?.map(item => `• ${item}`).join('\n');
    }
    return b.text;
  }).filter(Boolean).join('\n\n');
};

const textToBlocks = (text: string): LEGAL_CONTENT_BLOCK[] => {
  const paragraphs = text.split('\n\n');
  const blocks: LEGAL_CONTENT_BLOCK[] = [];
  
  paragraphs.forEach(p => {
    p = p.trim();
    if (!p) return;
    
    if (p.startsWith('•')) {
      const items = p.split('\n').map(l => l.replace(/^•\s*/, '').trim()).filter(Boolean);
      blocks.push({ type: 'list', items });
    } else {
      blocks.push({ type: 'paragraph', text: p });
    }
  });
  
  return blocks;
};

export const LegalPagesForms = ({ activeSection, data, onChange }: any) => {
  const handleChange = (field: string, value: string) => onChange({ ...data, [field]: value });

  const updateSection = (sectionIndex: number, patch: Record<string, unknown>) => {
    const newSections = [...(data?.sections || [])];
    if (newSections[sectionIndex]) {
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        ...patch,
      };
      onChange({ ...data, sections: newSections });
    }
  };

  const handleSectionTitleChange = (sectionIndex: number, value: string) => {
    updateSection(sectionIndex, { title: value });
  };

  const handleSectionContentChange = (sectionIndex: number, value: string) => {
    updateSection(sectionIndex, { contentBlocks: textToBlocks(value) });
  };

  if (activeSection === 0) {
    return (
      <Stack spacing={3}>
        <TextField fullWidth label="Page Title" value={data?.title || ""} onChange={(e) => handleChange("title", e.target.value)} />
        <TextField fullWidth label="Effective Date" value={data?.effectiveDate || ""} onChange={(e) => handleChange("effectiveDate", e.target.value)} />
      </Stack>
    );
  }

  if (activeSection === 1) {
    return (
      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>Content Sections</Typography>
        {data?.sections?.map((section: any, i: number) => (
          <Box
            key={i}
            sx={{
              mb: 3,
              p: 2,
              border: "1px solid #eee",
              borderRadius: 2,
              backgroundColor: "#FFFFFF",
              boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            }}
          >
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Section Title"
                value={section?.title || ""}
                onChange={(e) => handleSectionTitleChange(i, e.target.value)}
              />
              <TextField
                fullWidth
                multiline
                rows={10}
                label="Content"
                value={blocksToText(section?.contentBlocks)}
                onChange={(e) => handleSectionContentChange(i, e.target.value)}
                helperText="Use double newlines for paragraphs. Start lines with • for bullet lists."
              />
            </Stack>
          </Box>
        ))}
      </Box>
    );
  }

  return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Select a section to edit.</Typography>;
};
