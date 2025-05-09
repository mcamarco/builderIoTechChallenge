import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

// export const revalidate = 500;

export default async function Page(props: PageProps) {
  const urlPath = "/" + (props?.params?.page?.join("/") || "");

  const pageContent = await builder
    .get("page", {
      userAttributes: { urlPath },
    })
    .toPromise();

    const model = "announcement-bar";
    const content = await builder
      // Get the page content from Builder with the specified options
      .get("announcement-bar", {
        userAttributes: {
          // Use the page path specified in the URL to fetch the content
          urlPath: "/" + (props?.params?.page?.join("/") || ""),
        },
        // Set prerender to false to return JSON instead of HTML
        prerender: false,
      })
      // Convert the result to a promise
      .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={blogArticleContent} model="blog-article" />
      <RenderBuilderContent content={pageContent} model="page" options={{ enrich: true }} />
    </>
  );
}
