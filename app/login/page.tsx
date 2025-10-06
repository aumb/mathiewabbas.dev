import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PocketBase from 'pocketbase';
import { LoginForm } from './login-form';

export default async function LoginPage() {
    const cookieStore = cookies();
    const authCookie = cookieStore.get('pb_auth');

    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

    if (authCookie) {
        try {
            const authData = JSON.parse(authCookie.value);
            pb.authStore.save(authData.token, authData.record);

            if (pb.authStore.isValid) {
                await pb.collection('users').authRefresh();
            }
        } catch (_) {
            pb.authStore.clear();
        }

        if (pb.authStore.isValid) {
            redirect('/cms');
        }
    }

    return <LoginForm />;
}