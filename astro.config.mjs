import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import NetlifyCMS from 'astro-netlify-cms';

// https://astro.build/config
export default defineConfig({
  integrations: [
    NetlifyCMS({
      config: {
        media_folder: "public/images",
        public_folder: "/images",
        backend: {
          name: 'git-gateway',
          branch: 'main',
        },
        search: false,
        collections: [
          {
            name: 'pages',
            description: 'Pages of the LB feline rescue website',
            extension: 'mdx',
            format: 'frontmatter',
            label: 'Navigation Pages',
            folder: 'src/pages',
            create: true,
            delete: true,
            fields: [
              { name: 'title', widget: 'string', label: 'Post Title' },
              { name: 'layout', widget: 'string', label: 'Post Layout' },
              { name: 'bannerTitle', widget: 'string', label: 'Banner Title' },
              { name: 'bannerText', widget: 'string', label: 'Banner Text' },
              { name: 'body', widget: 'markdown', label: 'Post Body' },
            ],
          },
          {
            name: 'posts',
            description: 'Blog Posts for the Cat-care section',
            extension: 'md',
            format: 'frontmatter',
            label: 'Blog Posts',
            folder: 'src/content/catcare',
            create: true,
            delete: true,
            fields: [
              { name: 'title', widget: 'string', label: 'Post Title' },
              { name: 'publishedDate', widget: 'date', label: 'Post Date' },
              { name: 'imageSrc', widget: 'image', label: 'Post Image' },
              { name: 'imageAlt', widget: 'string', label: 'Post Image Description' },
              { name: 'body', widget: 'markdown', label: 'Post Body' },
            ],
          }
        ],
      },
    }),
    mdx(),
  ],
});
