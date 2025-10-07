import PocketBase from 'pocketbase';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

        const authData = await pb.collection('users').authWithPassword(email, password);
        const cookie = pb.authStore.exportToCookie({ httpOnly: false });

        const response = NextResponse.json({ 
            success: true, 
            user: authData.record 
        });
        
        response.headers.set('Set-Cookie', cookie);
        
        return response;

    } catch (error) {
        console.error("Login API Error:", error);
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to authenticate' 
        }, { status: 401 });
    }
}