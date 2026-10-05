export interface City {
  name: string;
  lat: number;
  lon: number;
  major?: boolean;
  /** label placement relative to node */
  anchor?: "start" | "end";
  /** vertical label nudge to avoid collisions */
  dy?: number;
}

export const origin: City = { name: "Lahore", lat: 31.5204, lon: 74.3587, major: true };

export const cities: City[] = [
  { name: "Karachi", lat: 24.8607, lon: 67.0011, major: true, anchor: "end" },
  { name: "Islamabad", lat: 33.6844, lon: 73.0479, major: true, anchor: "start", dy: 4 },
  { name: "Rawalpindi", lat: 33.5651, lon: 73.0169, anchor: "end", dy: 14 },
  { name: "Faisalabad", lat: 31.4504, lon: 73.135, major: true, anchor: "end" },
  { name: "Multan", lat: 30.1575, lon: 71.5249, major: true, anchor: "end" },
  { name: "Peshawar", lat: 34.0151, lon: 71.5249, major: true, anchor: "end" },
  { name: "Quetta", lat: 30.1798, lon: 66.975, major: true, anchor: "end" },
  { name: "Sialkot", lat: 32.4945, lon: 74.5229, anchor: "start", dy: -8 },
  { name: "Gujranwala", lat: 32.1877, lon: 74.1945, anchor: "start", dy: 6 },
  { name: "Hyderabad", lat: 25.396, lon: 68.3578, anchor: "start" },
  { name: "Bahawalpur", lat: 29.3544, lon: 71.6911, anchor: "start" },
  { name: "Sukkur", lat: 27.7052, lon: 68.8574, anchor: "start" },
  { name: "Abbottabad", lat: 34.1688, lon: 73.2215, anchor: "start" },
];

export const contactCities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Bahawalpur",
  "Sukkur",
  "Abbottabad",
  "Other",
];
