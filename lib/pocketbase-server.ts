import { cookies } from 'next/headers'
import PocketBase from 'pocketbase'
import { cache } from 'react'

// Server-only PocketBase clients. Don't import this from client components.

// The signed-in CMS user, from the pb_auth cookie set by /api/login.
// Returns null when there's no cookie or PocketBase rejects its token.
// cache() shares one check between the CMS layout and page in a render.
export const getUserPb = cache(async (): Promise<PocketBase | null> => {
    const authCookie = cookies().get('pb_auth')
    if (!authCookie) return null

    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
    try {
        const authData = JSON.parse(authCookie.value)
        pb.authStore.save(authData.token, authData.record)
        // isValid only checks the token's expiry; authRefresh has PocketBase verify it.
        await pb.collection('users').authRefresh()
        return pb
    } catch (error) {
        pb.authStore.clear()
        return null
    }
})

let servicePb: PocketBase | null = null

// A server-side account for writes that anonymous visitors cause, such as view
// counts, so the projects collection doesn't have to accept anonymous updates.
export async function getServicePb(): Promise<PocketBase> {
    if (servicePb?.authStore.isValid) return servicePb

    const email = process.env.POCKETBASE_SERVICE_EMAIL
    const password = process.env.POCKETBASE_SERVICE_PASSWORD
    if (!email || !password) {
        throw new Error('POCKETBASE_SERVICE_EMAIL and POCKETBASE_SERVICE_PASSWORD must be set')
    }

    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
    pb.autoCancellation(false)
    await pb.collection('users').authWithPassword(email, password)
    servicePb = pb
    return pb
}
