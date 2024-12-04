// shared/types.ts
export type DetectionStatus = 0 | 1; // Example: 0 = inactive, 1 = active

// shared/helpers.ts
export const formatDateKey = (date: Date): string => {
  return `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
};
