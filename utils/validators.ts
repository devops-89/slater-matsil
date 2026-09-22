import { matchIsValidTel, MuiTelInputInfo } from "mui-tel-input";

// Max national digit count per country code
const COUNTRY_MAX_DIGITS: Record<string, number> = {
  IN: 10, // India: 10 digits
  US: 10, // United States: 10 digits
  CA: 10, // Canada: 10 digits
  GB: 10, // UK: 10 digits
  AU: 9,  // Australia: 9 digits
  DE: 11, // Germany: 11 digits
  FR: 9,  // France: 9 digits
  AE: 9,  // UAE: 9 digits
  SA: 9,  // Saudi Arabia: 9 digits
  SG: 8,  // Singapore: 8 digits
  NZ: 9,  // New Zealand: 9 digits
  PK: 10, // Pakistan: 10 digits
  BD: 10, // Bangladesh: 10 digits
};

// List of common allowed Top-Level Domains (TLDs)
const VALID_TLDS = new Set([
  "com", "org", "net", "edu", "gov", "mil", "int", "info", "biz", "io",
  "co", "in", "us", "uk", "ca", "au", "de", "fr", "tech", "dev", "me",
  "app", "site", "online", "store", "xyz", "ai", "llc", "inc", "law",
  "legal", "agency", "asia", "eu", "nl", "es", "it", "ch", "se", "no",
  "fi", "jp", "cn", "kr", "sg", "nz", "mx", "br", "ar", "za", "ru",
  "cc", "tv", "club", "space", "design", "digital", "global", "group",
  "world", "center", "expert", "solutions", "services", "management",
  "pro", "co.in", "co.uk", "org.uk", "com.au", "net.au", "ac.uk"
]);

/**
 * Validates phone numbers using mui-tel-input's matchIsValidTel validator
 */
export const isValidPhone = (phone: string | null | undefined): boolean => {
  if (!phone || typeof phone !== "string") return false;
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length < 10) return false;
  try {
    return matchIsValidTel(phone);
  } catch (e) {
    return digitsOnly.length >= 10;
  }
};

/**
 * Restricts phone number typing to the selected country's exact max digit length.
 */
export const sanitizePhoneInput = (value: string, info?: MuiTelInputInfo): string => {
  if (!value) return value;
  
  const countryCode = info?.countryCode || "US";
  const maxDigits = COUNTRY_MAX_DIGITS[countryCode] || 10;

  if (info && info.nationalNumber) {
    const nationalDigits = info.nationalNumber.replace(/\D/g, "");
    if (nationalDigits.length > maxDigits) {
      const trimmedNational = nationalDigits.slice(0, maxDigits);
      const callingCode = info.countryCallingCode ? `+${info.countryCallingCode}` : "";
      return `${callingCode} ${trimmedNational}`.trim();
    }
  }

  return value;
};

/**
 * Validates whether an email has a standard structure and a valid TLD.
 * Rejects invalid extensions like .commss, .orgsss, .coom, etc.
 */
export const isValidEmail = (email: string | null | undefined): boolean => {
  if (!email || typeof email !== "string") return false;

  const trimmed = email.trim();
  
  // Standard format check: <local>@<domain>.<tld>
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,10})$/;
  if (!emailRegex.test(trimmed)) return false;

  const lastDotIndex = trimmed.lastIndexOf(".");
  if (lastDotIndex === -1) return false;

  const tld = trimmed.substring(lastDotIndex + 1).toLowerCase();

  // Reject obvious repeated typos like commss, orgsss, coom, conm
  if (/(commss|orgsss|coom|conm|gmaill|outlooook|yahooss)/i.test(tld)) {
    return false;
  }

  // Reject repeated letters at the end of TLD like sss, mss, fff
  if (/(.)\1{2,}/.test(tld)) return false;
  if (tld.endsWith("mss") || tld.endsWith("sss") || tld.endsWith("mmm")) return false;

  // Check against known TLDs
  if (VALID_TLDS.has(tld)) return true;

  // Allow standard generic TLDs between 2 and 6 letters if they don't have invalid repeated characters
  return /^[a-z]{2,6}$/.test(tld);
};

/**
 * Prevents invalid TLD typing like .commss or .orgsss by cleaning up extra repeated characters after known TLDs.
 */
export const sanitizeEmailInput = (value: string): string => {
  if (!value) return value;

  let sanitized = value;
  // If user typed .commss or .coms after .com, strip the extra typo characters
  sanitized = sanitized.replace(/\.com([a-z]+)$/i, (match, extra) => {
    if (/^m+s*$/i.test(extra) || /^s+$/i.test(extra) || /^m+$/i.test(extra)) {
      return ".com";
    }
    return match;
  });

  sanitized = sanitized.replace(/\.org([a-z]+)$/i, (match, extra) => {
    if (/^s+$/i.test(extra) || /^g+$/i.test(extra)) {
      return ".org";
    }
    return match;
  });

  sanitized = sanitized.replace(/\.net([a-z]+)$/i, (match, extra) => {
    if (/^t+$/i.test(extra) || /^s+$/i.test(extra)) {
      return ".net";
    }
    return match;
  });

  return sanitized;
};
