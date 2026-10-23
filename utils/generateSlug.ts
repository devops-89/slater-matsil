export function generateSlug(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateProfessionalSlug(userOrName: any): string {
  if (!userOrName) return "";

  if (typeof userOrName === "object" && userOrName !== null) {
    // If user object has firstName and lastName, combine them directly
    const firstName = (userOrName.firstName || "").trim();
    const lastName = (userOrName.lastName || "").trim();

    if (firstName && lastName) {
      return generateSlug(`${firstName} ${lastName}`);
    }
    if (firstName) return generateSlug(firstName);
    if (lastName) return generateSlug(lastName);

    // Fallback to fullName / name
    const rawFullName = (userOrName.fullName || userOrName.name || "").split(",")[0].trim();
    // Exclude middle initials (e.g. "A." in "Brian A. Carlson")
    const parts = rawFullName.split(/\s+/).filter((part: string) => !/^[a-zA-Z]\.?$/.test(part));
    if (parts.length >= 2) {
      return generateSlug(`${parts[0]} ${parts[parts.length - 1]}`);
    }
    return generateSlug(rawFullName || (userOrName.id ? String(userOrName.id) : ""));
  }

  if (typeof userOrName === "string") {
    const cleanName = userOrName.split(",")[0].trim();
    const parts = cleanName.split(/\s+/).filter((part: string) => !/^[a-zA-Z]\.?$/.test(part));
    if (parts.length >= 2) {
      return generateSlug(`${parts[0]} ${parts[parts.length - 1]}`);
    }
    return generateSlug(cleanName);
  }

  return "";
}
