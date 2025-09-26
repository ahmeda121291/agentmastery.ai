import { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { COMPARES } from "../../src/features/compare/registry";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: "AI Tool Comparisons | AgentMastery",
    description: "Compare the best AI tools head-to-head. Detailed comparisons of features, pricing, and capabilities to help you choose the right tool.",
    routeInfo: { pathname: "/compare" }
  });
}

export default function ComparePage() {
  const sortedCompares = [...COMPARES].sort((a, b) =>
    a.canonical.localeCompare(b.canonical)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        AI Tool Comparisons
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Compare the best AI tools head-to-head to find the perfect fit for your needs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCompares.map((compare) => {
          const [tool1, tool2] = compare.canonical.split('-vs-');
          const title = `${capitalize(tool1)} vs ${capitalize(tool2)}`;

          return (
            <Link
              key={compare.canonical}
              href={`/compare/${compare.canonical}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Detailed comparison and analysis
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function capitalize(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}