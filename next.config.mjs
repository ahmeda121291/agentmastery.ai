import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        source: '/blog/aiseo-vs-getgenie',
        destination: '/compare/aiseo-vs-getgenie',
        permanent: true,
      },
      {
        source: '/compare/_data',
        destination: '/compare',
        permanent: true,
      },
      {
        source: '/compare/_lib',
        destination: '/compare',
        permanent: true,
      },
      {
        source: '/compare/_:path*',
        destination: '/compare',
        permanent: true,
      },
    ]
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, [remarkToc, { heading: 'contents' }]],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})

export default withMDX(nextConfig)