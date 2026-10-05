/**
 * Every photo and video used outside product data (V2 §4). All paths are checked by
 * scripts/check-assets.mjs before each build — a missing file fails the build.
 *
 * Sources: Pexels (free commercial licence) and Jinpeng Pakistan model images
 * (pitch use only — client to request the dealer media kit for production).
 */
export const heroMedia = {
  video: "/video/hero.mp4",
  videoMobile: "/video/hero-mobile.mp4",
  poster: "/video/hero-poster.jpg",
  posterMobile: "/video/hero-poster-mobile.jpg",
};

export const categoryImages = {
  cooling: "/images/categories/climate.jpg",
  refrigeration: "/images/categories/freshness.jpg",
  "home-appliances": "/images/categories/living.jpg",
  electronics: "/images/categories/electronics.jpg",
  mobility: "/images/mobility/thrill.png",
} as const;

export const editorialMedia = {
  climateRoom: "/images/products/ac-room.jpg",
  fridgeBlack: "/images/products/fridge-black.jpg",
  fridgeSteel: "/images/products/fridge-sbs.jpg",
  kitchenDark2: "/images/lifestyle/kitchen-dark-2.jpg",
  kitchenDark3: "/images/lifestyle/kitchen-dark-3.jpg",
  livingNight: "/images/lifestyle/living-night.jpg",
  livingCity: "/images/lifestyle/living-city.jpg",
  showroom1: "/images/showroom/showroom-1.jpg",
  showroom2: "/images/showroom/showroom-2.jpg",
};

export const mobilityImage = (slug: string) => `/images/mobility/${slug}.png`;
