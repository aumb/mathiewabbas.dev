import PocketBase from 'pocketbase'
import { Project } from './types'


export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL)


export async function getProjectById(id: string): Promise<Project | null> {
    try {
        const record = await pb.collection('projects').getFirstListItem(`id="${id}"`, {
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

export async function incrementViews(recordId: string) {
    try {
        const record = await pb.collection('projects').getOne(recordId)
        await pb.collection('projects').update(recordId, {
            views: (record.views || 0) + 1,
            keepalive: false,
            cache: 'no-store',
        })
    } catch (error) {
        console.error('Error incrementing views:', error)
    }
}

export async function getAllProjects(): Promise<Project[]> {
    try {
        const records = await pb.collection('projects').getList(1, 50, {
            sort: '-date',
            filter: 'published = true',
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