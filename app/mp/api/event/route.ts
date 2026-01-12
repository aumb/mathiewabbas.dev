import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.text();
    const headers = new Headers();

    headers.set('User-Agent', request.headers.get('user-agent') || '');
    headers.set('X-Forwarded-For', request.headers.get('x-forwarded-for') || request.ip || '');
    headers.set('Content-Type', 'application/json');

    const resp = await fetch('https://plausible.mathiewabbas.dev/api/event', {
        method: 'POST',
        headers,
        body,
    });

    return new NextResponse(resp.body, {
        status: resp.status,
        headers: resp.headers,
    });
}
