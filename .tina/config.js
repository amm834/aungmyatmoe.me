import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
    branch,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    token: process.env.TINA_TOKEN,
    build: {
        publicFolder: 'public',
        outputFolder: 'admin'
    },
    media: {
        tina: {
            mediaRoot: 'uploads',
            publicFolder: 'public'
        }
    },
    search: {
        tina: {
            indexerToken: process.env.TINA_SEARCH_TOKEN,
            stopwordLanguages: ['eng']
        },
        indexBatchSize: 100,
        maxSearchIndexFieldLength: 100
    },
    schema: {
        collections: [
            {
                name: 'articles',
                label: 'Articles',
                path: 'contents',
                format: 'mdx',
                ui: {
                    filename: {
                        slugify: (values) => {
                            return `${values?.title
                                ?.toLowerCase()
                                .trim()
                                .replace(/[^\w\s-]/g, '')
                                .replace(/[\s_-]+/g, '-')
                                .replace(/^-+|-+$/g, '')}`;
                        }
                    }
                },
                fields: [
                    {
                        type: 'string',
                        name: 'title',
                        label: 'Title',
                        isTitle: true,
                        required: true
                    },
                    {
                        type: 'string',
                        name: 'description',
                        label: 'Description',
                        require: true
                    },
                    {
                        type: 'string',
                        name: 'excerpt',
                        label: 'Excerpt',
                        required: true
                    },
                    {
                        type: 'datetime',
                        name: 'date',
                        label: 'Date',
                        required: true
                    },
                    {
                        type: 'rich-text',
                        name: 'body',
                        label: 'Body',
                        isBody: true
                    }
                ]
            }
        ]
    }
});
