import clsx, { type ClassValue } from "clsx";

/**
 * Small helper for combining conditional class names.
 * Usage: cn("base-class", condition && "extra-class")
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
