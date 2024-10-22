import { type ClassValue, clsx } from "clsx";
import slugify from "slugify";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSlug(s: string) {
  return slugify(s, { lower: true, remove: /[/*+~.,<>()'"!:@]/g });
}

export function groupBy<T, K extends keyof unknown>(
  list: T[],
  key: (i: T) => K,
) {
  return list.reduce((groups, item) => {
    const nKey = key(item);
    if (!groups.has(nKey)) {
      groups.set(nKey, [item]);
    } else {
      groups.get(nKey)?.push(item);
    }
    return groups;
  }, new Map<K, T[]>());
}
