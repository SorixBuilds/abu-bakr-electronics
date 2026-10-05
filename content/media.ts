/**
 * Hero media (Asset Plan A-01 / A-01p). Drop the encoded files into /public/video and set the paths.
 * While null, the hero renders the §14.3 fallback: an animated dark interior-light gradient.
 */
export const heroMedia = {
  desktop: null as string | null, // "/video/hero.mp4"
  mobile: null as string | null, // "/video/hero-mobile.mp4"
  poster: null as string | null, // "/video/hero-poster.webp"
  posterMobile: null as string | null, // "/video/hero-poster-mobile.webp"
};

/** Showroom / CTA photography (A-14, A-15, A-16). null → atmospheric scene. */
export const editorialMedia = {
  showroomLarge: null as string | null,
  showroomSmall: null as string | null,
  finalCta: null as string | null,
  climateRoom: null as string | null,
  mobilityHero: null as string | null,
};
