import { type ClassValue, clsx } from "clsx";
import slugify from "slugify";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSlug(s: string) {
  return slugify(s, { lower: true, remove: /[/*+~.,<>()'"!:@]/g });
}
