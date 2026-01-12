import { NextRequest, NextResponse } from 'next/server';

function getClientIp(request: NextRequest): string {
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    if (cfConnectingIp) return cfConnectingIp;

    const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for');
    if (vercelForwardedFor) return vercelForwardedFor.split(',')[0].trim();

    const xForwardedFor = request.headers.get('x-forwarded-for');
    if (xForwardedFor) return xForwardedFor.split(',')[0].trim();

    const xRealIp = request.headers.get('x-real-ip');
    if (xRealIp) return xRealIp;

    if (request.ip) return request.ip;

    return '';
}

export async function POST(request: NextRequest) {
    const body = await request.text();
    const clientIp = getClientIp(request);
    const userAgent = request.headers.get('user-agent') || '';

    const headers = new Headers();
    headers.set('User-Agent', userAgent);
    headers.set('X-Forwarded-For', clientIp);
    headers.set('Content-Type', 'application/json');

    const plausibleUrl = process.env.PLAUSIBLE_API_URL || 'https://plausible.io/api/event';

    const resp = await fetch(plausibleUrl, {
        method: 'POST',
        headers,
        body,
    });

    return new NextResponse(resp.body, {
        status: resp.status,
        headers: resp.headers,
    });
}
