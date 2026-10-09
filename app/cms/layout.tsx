import { redirect } from 'next/navigation';
import { getUserPb } from '@/lib/pocketbase-server';


export default async function CmsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    if (!(await getUserPb())) {
        redirect('/login');
    }

    return <>{children}</>;
}
