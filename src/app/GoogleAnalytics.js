export default function sitemap() {
  const URL = process.env.NEXT_PUBLIC_URL_CLI;
  return [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: URL + "/humor",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
