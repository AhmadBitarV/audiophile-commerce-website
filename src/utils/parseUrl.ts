import { languages } from "./languages";

export default function parseUrl(url: string) {
  let urlToArray = url?.split("/");
  let defaultLang = "en";
  let isKnownLang = languages.some((l) => l === urlToArray?.[0]);
  let currentLang = url && isKnownLang ? urlToArray[0] : defaultLang;
  let slug = url
    ? isKnownLang
      ? urlToArray?.slice(1)?.join("/") || undefined
      : urlToArray?.join("/")
    : undefined;

  return { language: currentLang, slug };
}
