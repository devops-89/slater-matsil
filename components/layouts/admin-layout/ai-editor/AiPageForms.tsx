import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, Upload } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { adelle, tradeGothic } from "@/utils/fonts";

// Helper image uploader component
const ImageUploaderField = ({
  label,
  imageSrc,
  imageKey,
  onImageChange,
  onDeleteMedia,
}: {
  label: string;
  imageSrc?: string;
  imageKey?: string;
  onImageChange: (imgUrl: string, key: string) => void;
  onDeleteMedia?: (key: string) => void;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { showNotification } = require("@/components/providers/NotificationProvider").useNotification();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { MediaControllers } = require("@/api/mediaControllers");
      const formData = new FormData();
      formData.append("image", file);
      const res = await MediaControllers.uploadMedia(formData);
      const responseData = res.data?.data?.data || res.data?.data;
      const uploadedUrl = responseData?.imgUrl || responseData?.videoUrl || responseData?.url;
      const uploadedKey = responseData?.key || uploadedUrl;

      if (uploadedUrl) {
        onImageChange(uploadedUrl, uploadedKey);
        showNotification("Image uploaded successfully", "success");
      }
    } catch (err) {
      showNotification("Failed to upload image", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    if (imageKey && onDeleteMedia) {
      onDeleteMedia(imageKey);
    }
    onImageChange("", "");
    showNotification("Image removed from preview. Click Save Changes to confirm.", "info");
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="caption" sx={{ fontWeight: 600, color: COLORS.TEXT_PRIMARY, display: "block", mb: 1 }}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {imageSrc && (
          <Box
            sx={{
              width: 120,
              height: 75,
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid #ddd",
              position: "relative",
            }}
          >
            <img src={imageSrc} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <IconButton
              size="small"
              onClick={handleRemove}
              sx={{
                position: "absolute",
                top: 2,
                right: 2,
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                p: "2px",
                "&:hover": { backgroundColor: "#fff" },
              }}
            >
              <Typography variant="caption" color="error" sx={{ fontWeight: "bold", px: 0.5 }}>
                ✕
              </Typography>
            </IconButton>
          </Box>
        )}
        <Button component="label" variant="outlined" size="small" startIcon={<Upload />} disabled={isUploading}>
          {isUploading ? "Uploading..." : imageSrc ? "Replace Image" : "Upload Image"}
          <input type="file" hidden accept="image/*" onChange={handleUpload} />
        </Button>
      </Box>
    </Box>
  );
};

// 1. Hero Editor
const AiHeroEditor = ({ data, onChange, onDeleteMedia }: any) => {
  const handleChange = (field: string, val: any) => onChange({ ...data, [field]: val });

  const imageSrc =
    data?.imageDownloadUrl ||
    data?.imgUrl ||
    (typeof data?.img === "string" ? data.img : data?.img?.src);

  return (
    <Stack spacing={2.5}>
      <TextField
        fullWidth
        label="Tagline / Badge"
        value={data?.tagTitle || ""}
        onChange={(e) => handleChange("tagTitle", e.target.value)}
      />
      <TextField
        fullWidth
        label="Main Heading"
        value={data?.heading || ""}
        onChange={(e) => handleChange("heading", e.target.value)}
      />
      <TextField
        fullWidth
        label="Subheading / Tagline"
        multiline
        rows={2}
        value={data?.subHeading || ""}
        onChange={(e) => handleChange("subHeading", e.target.value)}
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        value={data?.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <ImageUploaderField
        label="Hero Banner Image"
        imageSrc={imageSrc}
        imageKey={data?.key || data?.imageUrl}
        onImageChange={(url, key) => {
          onChange({
            ...data,
            img: url,
            imageUrl: key,
            imageDownloadUrl: url,
            key: key,
          });
        }}
        onDeleteMedia={onDeleteMedia}
      />
    </Stack>
  );
};

// 2. What This Means for Your Matters Editor
const AiMattersEditor = ({ data, onChange }: any) => {
  const handleChange = (field: string, val: any) => onChange({ ...data, [field]: val });

  const items = data?.items || [];

  const handleItemChange = (index: number, field: string, val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: val };
    handleChange("items", newItems);
  };

  const addItem = () => {
    handleChange("items", [...items, { title: "New Item", description: "Item description." }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_: any, i: number) => i !== index);
    handleChange("items", newItems);
  };

  return (
    <Stack spacing={2.5}>
      <TextField
        fullWidth
        label="Section Badge Title"
        value={data?.sectionTitle || ""}
        onChange={(e) => handleChange("sectionTitle", e.target.value)}
      />
      <TextField
        fullWidth
        label="Section Heading"
        value={data?.heading || ""}
        onChange={(e) => handleChange("heading", e.target.value)}
      />
      <TextField
        fullWidth
        label="Section Description"
        multiline
        rows={2}
        value={data?.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle2" sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700 }}>
          Matter Benefit Cards ({items.length})
        </Typography>
        <Button size="small" startIcon={<Add />} onClick={addItem} variant="outlined">
          Add Card
        </Button>
      </Box>

      {items.map((item: any, i: number) => (
        <Card key={i} sx={{ p: 2, border: "1px solid #e0e0e0", position: "relative" }}>
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <IconButton size="small" color="error" onClick={() => removeItem(i)}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
          <Stack spacing={1.5} sx={{ pr: 4 }}>
            <TextField
              fullWidth
              size="small"
              label={`Card ${i + 1} Title`}
              value={item.title || ""}
              onChange={(e) => handleItemChange(i, "title", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              label={`Card ${i + 1} Description`}
              value={item.description || ""}
              onChange={(e) => handleItemChange(i, "description", e.target.value)}
            />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

// 3. How We Approach AI Editor
const AiApproachEditor = ({ data, onChange, onDeleteMedia }: any) => {
  const handleChange = (field: string, val: any) => onChange({ ...data, [field]: val });

  const items = data?.items || [];

  const handleItemChange = (index: number, field: string, val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: val };
    handleChange("items", newItems);
  };

  const addItem = () => {
    handleChange("items", [...items, { title: "New Principle", description: "Description." }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_: any, i: number) => i !== index);
    handleChange("items", newItems);
  };

  const imageSrc =
    data?.imageDownloadUrl ||
    data?.imgUrl ||
    (typeof data?.img === "string" ? data.img : data?.img?.src);

  return (
    <Stack spacing={2.5}>
      <TextField
        fullWidth
        label="Section Badge Title"
        value={data?.sectionTitle || ""}
        onChange={(e) => handleChange("sectionTitle", e.target.value)}
      />
      <TextField
        fullWidth
        label="Section Heading"
        value={data?.heading || ""}
        onChange={(e) => handleChange("heading", e.target.value)}
      />
      <TextField
        fullWidth
        label="Section Description"
        multiline
        rows={2}
        value={data?.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <ImageUploaderField
        label="Supporting Image (Practitioners & AI)"
        imageSrc={imageSrc}
        imageKey={data?.key || data?.imageUrl}
        onImageChange={(url, key) => {
          onChange({
            ...data,
            img: url,
            imageUrl: key,
            imageDownloadUrl: url,
            key: key,
          });
        }}
        onDeleteMedia={onDeleteMedia}
      />

      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle2" sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700 }}>
          Approach Principles ({items.length})
        </Typography>
        <Button size="small" startIcon={<Add />} onClick={addItem} variant="outlined">
          Add Principle
        </Button>
      </Box>

      {items.map((item: any, i: number) => (
        <Card key={i} sx={{ p: 2, border: "1px solid #e0e0e0", position: "relative" }}>
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <IconButton size="small" color="error" onClick={() => removeItem(i)}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
          <Stack spacing={1.5} sx={{ pr: 4 }}>
            <TextField
              fullWidth
              size="small"
              label={`Principle ${i + 1} Title`}
              value={item.title || ""}
              onChange={(e) => handleItemChange(i, "title", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              label={`Principle ${i + 1} Description`}
              value={item.description || ""}
              onChange={(e) => handleItemChange(i, "description", e.target.value)}
            />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

// 4. Our Tools Editor
const AiToolsEditor = ({ data, onChange }: any) => {
  const handleChange = (field: string, val: any) => onChange({ ...data, [field]: val });

  const items = data?.items || [];

  const handleItemChange = (index: number, field: string, val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: val };
    handleChange("items", newItems);
  };

  const addItem = () => {
    handleChange("items", [...items, { title: "New Tool", description: "Tool description.", tag: "Feature" }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_: any, i: number) => i !== index);
    handleChange("items", newItems);
  };

  return (
    <Stack spacing={2.5}>
      <TextField
        fullWidth
        label="Section Badge Title"
        value={data?.sectionTitle || ""}
        onChange={(e) => handleChange("sectionTitle", e.target.value)}
      />
      <TextField
        fullWidth
        label="Section Heading"
        value={data?.heading || ""}
        onChange={(e) => handleChange("heading", e.target.value)}
      />
      <TextField
        fullWidth
        label="Section Description"
        multiline
        rows={2}
        value={data?.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle2" sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700 }}>
          Tools List ({items.length})
        </Typography>
        <Button size="small" startIcon={<Add />} onClick={addItem} variant="outlined">
          Add Tool
        </Button>
      </Box>

      {items.map((item: any, i: number) => (
        <Card key={i} sx={{ p: 2, border: "1px solid #e0e0e0", position: "relative" }}>
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <IconButton size="small" color="error" onClick={() => removeItem(i)}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
          <Stack spacing={1.5} sx={{ pr: 4 }}>
            <TextField
              fullWidth
              size="small"
              label={`Tool ${i + 1} Title`}
              value={item.title || ""}
              onChange={(e) => handleItemChange(i, "title", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              label={`Tool ${i + 1} Tag / Badge`}
              value={item.tag || ""}
              onChange={(e) => handleItemChange(i, "tag", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={3}
              label={`Tool ${i + 1} Description`}
              value={item.description || ""}
              onChange={(e) => handleItemChange(i, "description", e.target.value)}
            />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

// 5. Your Matters, Your Choice Editor
const AiChoiceEditor = ({ data, onChange, onDeleteMedia }: any) => {
  const handleChange = (field: string, val: any) => onChange({ ...data, [field]: val });

  const items = data?.items || [];

  const handleItemChange = (index: number, field: string, val: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: val };
    handleChange("items", newItems);
  };

  const addItem = () => {
    handleChange("items", [...items, { title: "New Commitment", description: "Description." }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_: any, i: number) => i !== index);
    handleChange("items", newItems);
  };

  const imageSrc =
    data?.imageDownloadUrl ||
    data?.imgUrl ||
    (typeof data?.img === "string" ? data.img : data?.img?.src);

  return (
    <Stack spacing={2.5}>
      <TextField
        fullWidth
        label="Section Badge Title"
        value={data?.sectionTitle || ""}
        onChange={(e) => handleChange("sectionTitle", e.target.value)}
      />
      <TextField
        fullWidth
        label="Section Heading"
        value={data?.heading || ""}
        onChange={(e) => handleChange("heading", e.target.value)}
      />
      <TextField
        fullWidth
        label="Section Description"
        multiline
        rows={2}
        value={data?.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <ImageUploaderField
        label="Security & Shield Graphic"
        imageSrc={imageSrc}
        imageKey={data?.key || data?.imageUrl}
        onImageChange={(url, key) => {
          onChange({
            ...data,
            img: url,
            imageUrl: key,
            imageDownloadUrl: url,
            key: key,
          });
        }}
        onDeleteMedia={onDeleteMedia}
      />

      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="subtitle2" sx={{ fontFamily: tradeGothic.style.fontFamily, fontWeight: 700 }}>
          Choice & Security Commitments ({items.length})
        </Typography>
        <Button size="small" startIcon={<Add />} onClick={addItem} variant="outlined">
          Add Commitment
        </Button>
      </Box>

      {items.map((item: any, i: number) => (
        <Card key={i} sx={{ p: 2, border: "1px solid #e0e0e0", position: "relative" }}>
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <IconButton size="small" color="error" onClick={() => removeItem(i)}>
              <Delete fontSize="small" />
            </IconButton>
          </Box>
          <Stack spacing={1.5} sx={{ pr: 4 }}>
            <TextField
              fullWidth
              size="small"
              label={`Commitment ${i + 1} Title`}
              value={item.title || ""}
              onChange={(e) => handleItemChange(i, "title", e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              label={`Commitment ${i + 1} Description`}
              value={item.description || ""}
              onChange={(e) => handleItemChange(i, "description", e.target.value)}
            />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

// 6. Questions & Contact Editor
const AiQuestionsEditor = ({ data, onChange }: any) => {
  const handleChange = (field: string, val: any) => onChange({ ...data, [field]: val });

  return (
    <Stack spacing={2.5}>
      <TextField
        fullWidth
        label="Heading"
        value={data?.heading || ""}
        onChange={(e) => handleChange("heading", e.target.value)}
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        value={data?.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
      />
      <TextField
        fullWidth
        label="Contact Email"
        value={data?.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <TextField
        fullWidth
        label="Button Text"
        value={data?.buttonText || ""}
        onChange={(e) => handleChange("buttonText", e.target.value)}
      />
      <TextField
        fullWidth
        label="Button Link URL"
        value={data?.buttonLink || ""}
        onChange={(e) => handleChange("buttonLink", e.target.value)}
      />
    </Stack>
  );
};

// Main Export
export const AiPageForms = ({
  activeSection,
  websiteData,
  updateAiPage,
  onDeleteMedia,
}: any) => {
  const aiPage = websiteData?.aiPage;

  switch (activeSection) {
    case 0:
      return (
        <AiHeroEditor
          data={aiPage?.heroSection}
          onChange={(newData: any) => updateAiPage("heroSection", newData)}
          onDeleteMedia={onDeleteMedia}
        />
      );
    case 1:
      return (
        <AiMattersEditor
          data={aiPage?.mattersSection}
          onChange={(newData: any) => updateAiPage("mattersSection", newData)}
        />
      );
    case 2:
      return (
        <AiApproachEditor
          data={aiPage?.approachSection}
          onChange={(newData: any) => updateAiPage("approachSection", newData)}
          onDeleteMedia={onDeleteMedia}
        />
      );
    case 3:
      return (
        <AiToolsEditor
          data={aiPage?.toolsSection}
          onChange={(newData: any) => updateAiPage("toolsSection", newData)}
        />
      );
    case 4:
      return (
        <AiChoiceEditor
          data={aiPage?.choiceSection}
          onChange={(newData: any) => updateAiPage("choiceSection", newData)}
          onDeleteMedia={onDeleteMedia}
        />
      );
    case 5:
      return (
        <AiQuestionsEditor
          data={aiPage?.questionsSection}
          onChange={(newData: any) => updateAiPage("questionsSection", newData)}
        />
      );
    default:
      return <Typography sx={{ fontFamily: adelle.style.fontFamily }}>Select a section to edit.</Typography>;
  }
};
