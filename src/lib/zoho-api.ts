
import { NextRequest } from 'next/server';

export const DOMAIN_NAME = 'amariscalpcare.zohoecommerce.com';
export const BASE_URL = 'https://commerce.zoho.com/storefront/api/v1';

export const getHeaders = (cookieHeader: string | null) => ({
  'domain-name': DOMAIN_NAME,
  'Content-Type': 'application/json',
  ...(cookieHeader ? { Cookie: cookieHeader } : {}),
});

// Helper to get all cookies from response, clean them, and return as array
export const getCleanizedCookies = (res: Response): string[] => {
    let cookies: string[] = [];
    
    // Try standard API first
    if (typeof res.headers.getSetCookie === 'function') {
        cookies = res.headers.getSetCookie();
    } else {
        // Fallback: split by comma (imperfect for dates, but Zoho cookies usually simple)
        // Better fallback: rely on node-fetch raw headers if available, but for now simple split
        const val = res.headers.get('set-cookie');
        if (val) {
            // Basic split, might need regex if cookies contain comma in dates
            // But Zoho usually sends multiple Set-Cookie headers which fetch merges with comma
            cookies = val.split(/,(?=\s*[^;=]+=[^;]+)/g); 
        }
    }

    return cookies.map(c => {
        // Remove Domain, Secure, and SameSite attributes to ensure localhost compatibility
        return c.replace(/Domain=[^;]+;?/gi, '')
                .replace(/Secure;?/gi, '')
                .replace(/SameSite=[^;]+;?/gi, '')
                .trim();
    }).filter(Boolean);
};

// Helper to update headers with new cookies from a response
// Now handles MULTIPLE cookies
export const updateCookieInHeaders = (res: Response, headers: Record<string, string>) => {
    const newCookies = getCleanizedCookies(res);
    
    if (newCookies.length > 0) {
         console.log('[Zoho API] Received new Set-Cookies:', newCookies.length);
         
         let currentCookies = headers['Cookie'] || '';
         
         newCookies.forEach(cookieStr => {
             const cookieValue = cookieStr.split(';')[0]; // key=value
             const cookieName = cookieValue.split('=')[0].trim();
             
             // Remove existing cookie with same name
             const regex = new RegExp(`(?:^|;\\s*)${cookieName}=[^;]*`, 'g');
             currentCookies = currentCookies.replace(regex, '').trim();
             
             // Cleanup semicolons
             if (currentCookies.startsWith(';')) currentCookies = currentCookies.substring(1).trim();
             if (currentCookies.endsWith(';')) currentCookies = currentCookies.substring(0, currentCookies.length - 1).trim();
             
             if (currentCookies) {
                 currentCookies = `${currentCookies}; ${cookieValue}`;
             } else {
                 currentCookies = cookieValue;
             }
         });

         headers['Cookie'] = currentCookies;
         return currentCookies;
    }
    return null;
};
