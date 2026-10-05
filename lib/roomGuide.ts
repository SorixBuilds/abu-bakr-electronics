export type Sun = "shaded" | "normal" | "very";
export type People = "1-2" | "3-4" | "5+";

export interface RoomInput {
  size: number;
  sun: Sun;
  people: People;
}

/** General industry rule of thumb — a guide only. */
export function suggestTons({ size, sun, people }: RoomInput) {
  let tons = size <= 140 ? 1 : size <= 240 ? 1.5 : size <= 340 ? 2 : 2.5;
  if (sun === "very") tons += 0.5;
  if (people === "5+") tons += 0.5;
  tons = Math.min(tons, 4);
  return tons;
}

export const tonLabel = (t: number) => (t >= 3 ? "3+ ton" : `${t} ton`);

/** Value used for /shop/cooling?tonnage= deep links (matches product filters). */
export const tonFilter = (t: number) => (t >= 2.5 ? "2.5+" : String(t));

export const explain = (t: number, i: RoomInput) => {
  if (t >= 3) return "A large or demanding space — an advisor will help you choose between larger splits and floor-standing units.";
  const bits: string[] = [];
  bits.push(`About ${i.size} sq ft`);
  if (i.sun === "very") bits.push("strong sun");
  if (i.people === "5+") bits.push("a full room");
  return `${bits.join(", ")} — a ${tonLabel(t)} unit should hold the room comfortably.`;
};

export const sunLabels: Record<Sun, string> = { shaded: "Shaded", normal: "Normal", very: "Very sunny / top floor" };
