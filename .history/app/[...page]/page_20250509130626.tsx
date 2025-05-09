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

  const blogArticleContent = await builder
    .get("blog-article", {
      userAttributes: { urlPath },
    })
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model="blog-article" />
      <RenderBuilderContent content={content} model={builderModelName} options={{ enrich: true }} />
    </>
  );
}
