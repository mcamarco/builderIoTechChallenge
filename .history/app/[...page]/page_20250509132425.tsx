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

  const announce = await builder
    .get("announcement-bar", {
      userAttributes: { urlPath },
    })
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={blogArticleContent} model="blog-article" />
      <RenderBuilderContent content={pageContent} model="page" options={{ enrich: true }} />
    </>
  );
}
