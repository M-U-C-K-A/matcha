import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/auth/', '/db/'],
            },
        ],
        sitemap: 'https://matcha.app/sitemap.xml',
    }
}
