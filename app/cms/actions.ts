"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PocketBase from "pocketbase";

interface ProjectFormData {
    title: string;
    description: string;
    content: string;
    repository: string;
    url: string;
    published: boolean;
    date: string; 
}

export async function createProject(formData: ProjectFormData) {
    const cookieStore = cookies();
    const authCookie = cookieStore.get('pb_auth');

    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

    try {
        if (authCookie) {
            const authData = JSON.parse(authCookie.value);
            pb.authStore.save(authData.token, authData.record);
        }

        if (!pb.authStore.isValid) {
            throw new Error("User is not authenticated");
        }
        await pb.collection('users').authRefresh();

        const highestRankedProjects = await pb.collection('projects').getList(1, 1, {
            sort: '-rank',
        });
        const highestRank = highestRankedProjects.items[0]?.rank ?? -1;
        const newRank = highestRank + 1;
        
        const data = {
            ...formData,
            rank: newRank,
        };

        const newRecord = await pb.collection('projects').create(data);

        revalidatePath('/cms');
        revalidatePath('/projects');
        revalidatePath(`/project/${newRecord.slug}`);

        return { success: true, message: "Project created successfully!", record: newRecord };

    } catch (error: any) {
        console.error("Failed to create project:", error);
        return { success: false, message: `Failed to create project: ${error.message}` };
    }
}

export async function updateProject(id: string, formData: ProjectFormData) {
    const cookieStore = cookies();
    const authCookie = cookieStore.get('pb_auth');

    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

    try {
        if (authCookie) {
            const authData = JSON.parse(authCookie.value);
            pb.authStore.save(authData.token, authData.record);
        }

        if (!pb.authStore.isValid) throw new Error("User not authenticated");
        await pb.collection('users').authRefresh();
        
        const updatedRecord = await pb.collection('projects').update(id, formData);

        revalidatePath('/cms');
        revalidatePath('/projects');
        revalidatePath(`/project/${updatedRecord.slug}`);

        return { success: true, message: "Project updated successfully!", record: updatedRecord };

    } catch (error: any) {
        console.error("Failed to update project:", error);
        return { success: false, message: `Failed to update project: ${error.message}` };
    }
}

export async function logout() {
    const cookieStore = cookies();
    cookieStore.delete('pb_auth');

    revalidatePath('/cms');

    redirect('/');
}