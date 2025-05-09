import React from "react";
import { ComponentProps } from "react";
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import Head from "next/head";

// Replace with your Public API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

type BuilderPageProps = ComponentProps<typeof BuilderComponent>;

export default async function BlogArticle(props: BuilderPageProps) {
  const model = "blog-article";
  const content = await builder
    .get("blog-article", {
      prerender: false,
      // Include references, like the `author` ref
      options: { includeRefs: true },
      query: {
        // Get the specific article by handle
        "data.handle": props?.params?.page?.join("/"),
      },
    })
    .toPromise();

  return (
    <>
      <Head>
        {/* Render meta tags from custom field */}
        <title>{content?.data.title}</title>
        <meta name="description" content={content?.data.blurb} />
        <meta name="og:image" content={content?.data.image} />
      </Head>
      <div>
        <div>{content?.data.title}</div>
        {/* Render the Builder drag/droped content */}
        <RenderBuilderContent
          content={content}
          model={model}
        />
      </div>
    </>
  );
}