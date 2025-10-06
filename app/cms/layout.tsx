import { pb } from '@/lib/pocketbase';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase'


export default async function CmsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    console.log("--- CMS Layout: Checking Auth ---");

    const cookieStore = cookies();
    const authCookie = cookieStore.get('pb_auth');


    try {
        if (authCookie) {
            const authData = JSON.parse(authCookie.value);
            pb.authStore.save(authData.token, authData.record);
        }
    } catch (e) {
        console.error("Auth refresh failed:", e);
        pb.authStore.clear();
    }
    
    if (!pb.authStore.isValid) {
        redirect('/login');
    }

    return <>{children}</>;
}