// app/blog/page.tsx
import React from "react";
import Link from "next/link";
import { builder } from "@builder.io/sdk";

builder.init(process.env.);

const ARTICLES_PER_PAGE = 30;

export default async function BlogList() {
  const pageNumber = 1;

  const articles = await builder.getAll("blog-article", {
    options: { includeRefs: true },
    omit: "data.blocks",
    limit: ARTICLES_PER_PAGE,
    offset: (pageNumber - 1) * ARTICLES_PER_PAGE,
  });

  return (
    <div className="grid gap-6 p-4">
      {articles.map((item) => (
        <Link key={item.id} href={`/blog/${item.data.handle}`}>
          <div className="border p-4 rounded shadow w-full max-w-md">
            <img src={item.data.image} alt={item.data.title} className="w-full h-48 object-cover" />
            <h2 className="text-xl font-semibold mt-2">{item.data.title}</h2>
            <p className="text-sm text-gray-600">{item.data.blurb}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
