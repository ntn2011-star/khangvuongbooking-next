import type { MetadataRoute } from 'next';
import { SITE_URL } from './content';
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/administrator', '/Administrator', '/api/', '/wp-admin', '/wp-login.php'] }], sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL }; }
