/**
 * Helpers pour Cloudinary
 * Gère la transformation et l'optimisation des URLs d'images Cloudinary
 */

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

/**
 * Options de transformation d'image Cloudinary
 */
export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  crop?: "fill" | "fit" | "scale" | "thumb" | "limit";
  format?: "auto" | "webp" | "jpg" | "png";
  gravity?: "auto" | "face" | "center";
  blur?: number;
}

/**
 * Transforme une URL Cloudinary avec des paramètres d'optimisation
 * @param imageUrl - URL complète Cloudinary ou juste l'ID public
 * @param options - Options de transformation
 * @returns URL transformée pour Cloudinary
 * 
 * @example
 * transformCloudinaryUrl('v1234567/destination/image.jpg', { width: 800, quality: 80 })
 * // Retourne: 'https://res.cloudinary.com/votre-cloud-name/image/upload/c_fill,w_800,q_80/v1234567/destination/image.jpg'
 */
export function transformCloudinaryUrl(
  imageUrl: string | null | undefined,
  options: CloudinaryTransformOptions = {}
): string {
  // Si l'URL est vide ou null, retourne une image placeholder
  if (!imageUrl) {
    return "/placeholder-image.jpg"; // Vous pouvez créer une vraie image placeholder
  }

  // Si l'URL est déjà une URL complète Cloudinary, on l'utilise
  if (imageUrl.startsWith("http")) {
    // Extraire le path de transformation si présent
    const urlParts = imageUrl.split("/upload/");
    if (urlParts.length === 2) {
      const [baseUrl, imagePath] = urlParts;
      const transformString = buildTransformString(options);
      return `${baseUrl}/upload/${transformString}${imagePath}`;
    }
    return imageUrl;
  }

  // Si c'est juste un path ou ID public, construire l'URL complète
  const transformString = buildTransformString(options);
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformString}${imageUrl}`;
}

/**
 * Construit la chaîne de transformation Cloudinary
 * @param options - Options de transformation
 * @returns Chaîne de transformation (ex: "c_fill,w_800,h_600,q_80,f_auto/")
 */
function buildTransformString(options: CloudinaryTransformOptions): string {
  const transforms: string[] = [];

  if (options.crop) {
    transforms.push(`c_${options.crop}`);
  }

  if (options.width) {
    transforms.push(`w_${options.width}`);
  }

  if (options.height) {
    transforms.push(`h_${options.height}`);
  }

  if (options.quality) {
    transforms.push(`q_${options.quality}`);
  } else {
    // Qualité par défaut pour optimisation
    transforms.push("q_auto");
  }

  if (options.format) {
    transforms.push(`f_${options.format === "auto" ? "auto" : options.format}`);
  } else {
    transforms.push("f_auto"); // Format automatique pour WebP si supporté
  }

  if (options.gravity) {
    transforms.push(`g_${options.gravity}`);
  }

  if (options.blur) {
    transforms.push(`e_blur:${options.blur}`);
  }

  return transforms.length > 0 ? `${transforms.join(",")}/` : "";
}

/**
 * Génère une URL optimisée pour Next.js Image component
 * Fonctionne avec le loader Cloudinary de Next.js si configuré
 * @param imageUrl - URL Cloudinary
 * @param width - Largeur désirée
 * @param height - Hauteur désirée (optionnelle)
 * @returns URL transformée
 */
export function getOptimizedImageUrl(
  imageUrl: string | null | undefined,
  width: number,
  height?: number
): string {
  return transformCloudinaryUrl(imageUrl, {
    width,
    height,
    crop: height ? "fill" : "scale",
    quality: 80,
    format: "auto",
  });
}

/**
 * Génère une URL pour les thumbnails (petites images)
 * @param imageUrl - URL Cloudinary
 * @param size - Taille du thumbnail (carré)
 * @returns URL transformée
 */
export function getThumbnailUrl(
  imageUrl: string | null | undefined,
  size: number = 300
): string {
  return transformCloudinaryUrl(imageUrl, {
    width: size,
    height: size,
    crop: "fill",
    quality: 75,
    format: "auto",
    gravity: "auto",
  });
}

