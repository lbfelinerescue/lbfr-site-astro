import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import NetlifyCMS from 'astro-netlify-cms';

import sitemap from "@astrojs/sitemap";

const SITE_URL = 'https://www.longbeachfelines.org';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [NetlifyCMS({
    config: {
      media_folder: "public/images",
      public_folder: "/images",
      backend: {
        name: 'git-gateway',
        branch: 'main'
      },
      search: false,
      editor: {
        preview: false
      },
      collections: [{
        name: 'pages',
        description: 'Pages of the LB feline rescue website',
        extension: 'mdx',
        format: 'frontmatter',
        label: 'Edit Images',
        folder: 'src/pages',
        create: true,
        delete: true,
        filter: {
          field: "hasEditableImages",
          value: true
        },
        fields: [{
          name: 'imageOne',
          widget: 'image',
          label: 'Image One'
        }, {
          name: 'imageTwo',
          widget: 'image',
          label: 'Image Two'
        }, {
          name: 'imageThree',
          widget: 'image',
          label: 'Image Three'
        }]
      }, {
        name: 'posts',
        description: 'Blog Posts for the Cat-care section',
        extension: 'md',
        format: 'frontmatter',
        label: 'Blog Posts',
        folder: 'src/content/catcare',
        create: true,
        delete: true,
        fields: [{
          name: 'title',
          widget: 'string',
          label: 'Post Title'
        }, {
          name: 'publishedDate',
          widget: 'date',
          label: 'Post Date'
        }, {
          name: 'imageSrc',
          widget: 'image',
          label: 'Post Image'
        }, {
          name: 'imageAlt',
          widget: 'string',
          label: 'Post Image Description'
        }, {
          name: 'body',
          widget: 'markdown',
          label: 'Post Body'
        }]
      }]
    }
  }), mdx(), sitemap({
    filter: (page) => page !== `{SITE_URL}/admin`,
  })]
});