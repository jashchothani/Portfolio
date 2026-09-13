export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export const API_URL: string = (
  (import.meta.env.VITE_API_URL as string | undefined) || "http://localhost:5000"
).replace(/\/+$/, "");
