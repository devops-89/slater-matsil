import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FormatBold } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";

interface BoldTextFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  multiline?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  placeholder?: string;
  error?: boolean;
}

export default function BoldTextField({
  label,
  value,
  onChange,
  rows = 4,
  fullWidth = true,
  helperText,
  placeholder = "Type your content here...",
  error = false,
}: BoldTextFieldProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [isBold, setIsBold] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      const currentHtml = editorRef.current.innerHTML;
      const normalizedValue = value || "";
      if (currentHtml !== normalizedValue) {
        editorRef.current.innerHTML = normalizedValue;
      }
    }
  }, [value]);

  const updateStateAndValue = () => {
    if (editorRef.current) {
      let html = editorRef.current.innerHTML;
      if (html === "<br>" || html === "<div><br></div>" || html === "<p><br></p>") {
        html = "";
      }
      onChange(html);
      checkBoldState();
    }
  };

  const checkBoldState = () => {
    try {
      const state = document.queryCommandState("bold");
      setIsBold(!!state);
    } catch {
      setIsBold(false);
    }
  };

  const handleToggleBold = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand("bold", false);
      checkBoldState();
      updateStateAndValue();
    }
  };

  const minHeightPx = Math.max(100, rows * 24);

  return (
    <Box sx={{ width: fullWidth ? "100%" : "auto" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        {label ? (
          <Typography variant="caption" sx={{ fontWeight: 600, color: error ? "error.main" : "text.secondary" }}>
            {label}
          </Typography>
        ) : (
          <Box />
        )}
        <Button
          size="small"
          variant={isBold ? "contained" : "outlined"}
          color="primary"
          startIcon={<FormatBold />}
          onMouseDown={handleToggleBold}
          sx={{
            textTransform: "none",
            py: 0.3,
            px: 1.5,
            fontSize: "12px",
            height: "28px",
            backgroundColor: isBold ? COLORS.PRIMARY_BLUE : "transparent",
            color: isBold ? "#fff" : COLORS.PRIMARY_BLUE,
            fontWeight: 600,
            borderColor: COLORS.PRIMARY_BLUE,
            "&:hover": {
              backgroundColor: isBold ? COLORS.PRIMARY_BLUE : "rgba(27, 54, 93, 0.08)",
            },
          }}
        >
          {isBold ? "Bold Active (B)" : "Bold (B)"}
        </Button>
      </Stack>

      <Box
        sx={{
          position: "relative",
          border: error ? "2px solid #d32f2f" : isFocused ? `2px solid ${COLORS.PRIMARY_BLUE}` : "1px solid #ccc",
          borderRadius: "8px",
          p: 1.5,
          minHeight: `${minHeightPx}px`,
          backgroundColor: "#fff",
          transition: "border-color 0.2s ease",
          "&:hover": {
            borderColor: error ? "#d32f2f" : isFocused ? COLORS.PRIMARY_BLUE : "#888",
          },
        }}
      >
        {!value && (
          <Typography
            sx={{
              position: "absolute",
              top: 12,
              left: 14,
              color: "#aaa",
              fontSize: "14px",
              pointerEvents: "none",
              fontStyle: "italic",
              userSelect: "none",
            }}
          >
            {placeholder}
          </Typography>
        )}
        <Box
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={updateStateAndValue}
          onKeyUp={checkBoldState}
          onMouseUp={checkBoldState}
          onFocus={() => {
            setIsFocused(true);
            checkBoldState();
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          sx={{
            outline: "none",
            minHeight: `${minHeightPx - 24}px`,
            fontSize: "14px",
            lineHeight: 1.6,
            color: "#333",
            fontFamily: "inherit",
            wordBreak: "break-word",
            "& b, & strong": {
              fontWeight: 700,
              color: COLORS.PRIMARY_BLUE,
            },
            "& p": {
              margin: 0,
              padding: 0,
            },
          }}
        />
      </Box>
      {helperText && (
        <Typography
          variant="caption"
          sx={{
            color: error ? "error.main" : "text.secondary",
            mt: 0.5,
            display: "block",
            fontSize: "12px",
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
