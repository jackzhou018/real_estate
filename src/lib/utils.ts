import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatOptionalNumber(value: number | null) {
  return value === null ? "Contact for details" : formatNumber(value);
}
