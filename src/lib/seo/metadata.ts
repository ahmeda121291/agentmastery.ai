import { Metadata } from "next";
import { deriveCanonical } from "./canonical";

interface BuildMetadataOptions {
  title: string;
  description: string;
  routeInfo: {
    pathname: string;
    params?: Record<string, string>;
  };
  openGraph?: {
    images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  };
}

export function buildPageMetadata({
  title,
  description,
  routeInfo,
  openGraph
}: BuildMetadataOptions): Metadata {
  const canonical = deriveCanonical(routeInfo);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title,
      description,
      siteName: "AgentMastery",
      type: "website",
      ...openGraph
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}