import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import NetlifyCMS from 'astro-netlify-cms';

// https://astro.build/config
export default defineConfig({
  integrations: [
    NetlifyCMS({
      config: {
        media_folder: "public/images",
        backend: {
          name: 'git-gateway',
          branch: 'main',
        },
        collections: [
          {
            name: 'posts',
            label: 'All Pages',
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
        ],
      },
    }),
    mdx(),
  ],
});
