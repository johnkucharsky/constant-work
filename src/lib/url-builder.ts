import { LOCAL_API_URL } from "@/lib/api";

export const url = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  uri: string,
  data?: T,
): URL => {
  const url = new URL(uri, LOCAL_API_URL);

  if (data !== undefined) {
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  return url;
};
