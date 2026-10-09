import PocketBase from 'pocketbase'
import { Project } from './types'


export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)


// Pass an authenticated client (see lib/pocketbase-server.ts) to read drafts.
export async function getProjectById(id: string, client: PocketBase = pb): Promise<Project | null> {
    try {
        const record = await client.collection('projects').getOne(id, {
            keepalive: false,
            cache: 'no-store',
        })
        return {
            id: record.id,
            title: record.title,
            description: record.description,
            content: record.content,
            repository: record.repository,
            publishedAt: record.created,
            views: record.views || 0,
            rank: record.rank,
            image: record.image,
            url: record.url,
            published: record.published,
            date: record.date
        };
    } catch (error) {
        console.error('Error fetching project:', error)
        return null
    }
}

export async function getAllProjects(sort: string = '-date', includeDrafts = false, client: PocketBase = pb): Promise<Project[]> {
    try {
        const records = await client.collection('projects').getList(1, 50, {
            sort: sort,
            ...(includeDrafts ? {} : { filter: 'published = true' }),
            keepalive: false,
            cache: 'no-store',
        });

        return records.items.map(record => ({
            id: record.id,
            slug: record.slug,
            title: record.title,
            description: record.description,
            content: record.content,
            repository: record.repository,
            publishedAt: record.created,
            featured: record.featured,
            views: record.views || 0,
            rank: record.rank,
            image: record.image,
            url: record.url,
            published: record.published,
            date: record.date
        }));
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}
