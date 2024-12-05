export interface Project {
    id: string;
    title: string;
    description: string;
    content: string;
    repository: string | null;
    publishedAt: string | null;
    views: number | null;
    rank: number | null;
    image: string | null;
    url: string | null;
    date: string | null;
    published: boolean | null;
} 