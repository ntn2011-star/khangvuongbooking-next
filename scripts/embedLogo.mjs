import { readFileSync, writeFileSync } from 'node:fs';

const source = '/home/ubuntu/webdev-static-assets/khangvuongbooking-logo.webp';
const target = '/home/ubuntu/khangvuongbooking-next/app/logo-data.ts';
const base64 = readFileSync(source).toString('base64');
writeFileSync(target, `/** Logo do chủ sở hữu cung cấp, nhúng trực tiếp để không phụ thuộc storage proxy. */\nexport const KVBK_LOGO_DATA_URI = 'data:image/webp;base64,${base64}' as const;\n`);
console.log(target);
