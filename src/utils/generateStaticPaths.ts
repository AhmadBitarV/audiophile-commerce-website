import { useStoryblokApi } from "@storyblok/astro";
import isPreview from "./isPreview";
import { languages } from "./languages";

export default async function generateStaticPaths() {
  const storyblokApi = useStoryblokApi();
  const links = await storyblokApi.getAll("cdn/links", {
    version: isPreview() ? "draft" : "published",
  });
  let paths: unknown[] = [];
  links
    .filter((link) => !link.is_folder)
    .forEach((link: { slug: string }) => {
      languages.forEach((language) => {
        let slug = link.slug === "home" ? undefined : link.slug;
        let full_url = language === "en" ? slug : `${language}/${slug ?? ""}`;

        paths.push({
          props: { language, slug },
          params: {
            slug: full_url,
          },
        });
      });
    });
  return paths;
}
