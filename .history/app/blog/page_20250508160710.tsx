// app/blog/page.tsx

import React from "react";
import Link from "next/link";
import { builder } from "@builder.io/sdk";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

const ARTICLES_PER_PAGE = 30;

export default async function Blog() {
  const pageNumber = 1;
  const articles = await builder.getAll("blog-article", {
    options: { includeRefs: true },
    omit: "data.blocks",
    limit: ARTICLES_PER_PAGE,
    offset: (pageNumber - 1) * ARTICLES_PER_PAGE,
  });

  return (
    <div>
      {articles.map((item) => (
        <Link key={item.id} href={`/blog/${item.data.handle}`}>
          <div style={{ overflow: "hidden", width: 300 }}>
            <div style={{ width: 300, height: 200 }}>
              <img src={item.data.image} alt={item.data.title} />
            </div>
            <h3>{item.data.title}</h3>
            <p>{item.data.blurb}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
