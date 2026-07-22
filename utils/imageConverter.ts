export const convertToWebP = (file: File, maxWidth = 1920, quality = 0.8): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Only process images (skip SVGs, PDFs, videos, etc.)
    if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return resolve(file);
        }

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file);
            }
            // Create a new File from the Blob
            const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const newFile = new File([blob], newFileName, {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(newFile);
          },
          "image/webp",
          quality
        );
      };
      img.onerror = (error) => {
        console.error("Failed to load image for WebP conversion", error);
        resolve(file); // Fallback to original file on error
      };
    };
    reader.onerror = (error) => {
      console.error("Failed to read file for WebP conversion", error);
      resolve(file); // Fallback to original file on error
    };
  });
};
