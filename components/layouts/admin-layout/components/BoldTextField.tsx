import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Stack, Typography, Tooltip } from "@mui/material";
import { FormatBold, FormatItalic } from "@mui/icons-material";
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

export const isHtmlEmpty = (html?: string) => {
  if (!html) return true;
  const clean = html.replace(/<[^>]*>/g, "").replace(/&nbsp;|\u200B|\s+/g, "");
  return clean.length === 0;
};

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
  const [isItalic, setIsItalic] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      const currentHtml = editorRef.current.innerHTML;
      const normalizedValue = value || "";
      if (currentHtml !== normalizedValue) {
        editorRef.current.innerHTML = isHtmlEmpty(normalizedValue) ? "" : normalizedValue;
      }
    }
  }, [value]);

  const updateStateAndValue = () => {
    if (editorRef.current) {
      let html = editorRef.current.innerHTML;
      if (isHtmlEmpty(html)) {
        html = "";
      }
      onChange(html);
      checkFormatState();
    }
  };

  const checkFormatState = () => {
    try {
      setIsBold(!!document.queryCommandState("bold"));
      setIsItalic(!!document.queryCommandState("italic"));
    } catch {
      setIsBold(false);
      setIsItalic(false);
    }
  };

  const handleToggleBold = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand("bold", false);
      checkFormatState();
      updateStateAndValue();
    }
  };

  const handleToggleItalic = (e: React.MouseEvent) => {
    e.preventDefault();
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand("italic", false);
      checkFormatState();
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

        <Stack direction="row" spacing={1} alignItems="center">
          <Tooltip title="Bold (B)">
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
              Bold
            </Button>
          </Tooltip>

          <Tooltip title="Italic (I)">
            <Button
              size="small"
              variant={isItalic ? "contained" : "outlined"}
              color="primary"
              startIcon={<FormatItalic />}
              onMouseDown={handleToggleItalic}
              sx={{
                textTransform: "none",
                py: 0.3,
                px: 1.5,
                fontSize: "12px",
                height: "28px",
                fontStyle: "italic",
                backgroundColor: isItalic ? COLORS.PRIMARY_BLUE : "transparent",
                color: isItalic ? "#fff" : COLORS.PRIMARY_BLUE,
                fontWeight: 600,
                borderColor: COLORS.PRIMARY_BLUE,
                "&:hover": {
                  backgroundColor: isItalic ? COLORS.PRIMARY_BLUE : "rgba(27, 54, 93, 0.08)",
                },
              }}
            >
              Italic
            </Button>
          </Tooltip>
        </Stack>
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
        {(!value || isHtmlEmpty(value)) && (
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
          onKeyUp={checkFormatState}
          onMouseUp={checkFormatState}
          onFocus={() => {
            setIsFocused(true);
            checkFormatState();
          }}
          onBlur={() => {
            setIsFocused(false);
            if (editorRef.current && isHtmlEmpty(editorRef.current.innerHTML)) {
              editorRef.current.innerHTML = "";
              onChange("");
            }
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
            "& i, & em": {
              fontStyle: "italic",
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
