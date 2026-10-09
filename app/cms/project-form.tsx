"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "./actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Project } from "@/lib/types";

interface ProjectFormProps {
    initialData?: Project;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const isEditMode = !!initialData;

    const [published, setPublished] = useState(initialData?.published || false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);

        const formData = new FormData(event.currentTarget);
        // An empty date shows the project as "SOON".
        const date = formData.get('date') as string;
        const projectData = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            content: formData.get('content') as string,
            repository: formData.get('repository') as string,
            url: formData.get('url') as string,
            published: published,
            date: date ? new Date(date).toISOString() : null,
        };

        const result = isEditMode
            ? await updateProject(initialData.id, projectData)
            : await createProject(projectData);

        if (result.success) {
            router.push('/cms');
        } else {
            setError(result.message);
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required defaultValue={initialData?.title} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required defaultValue={initialData?.description} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea id="content" name="content" rows={10} required defaultValue={initialData?.content} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="repository">Repository</Label>
                <Input id="repository" name="repository" placeholder="owner/repo" defaultValue={initialData?.repository ?? ""} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="url">Website</Label>
                <Input id="url" name="url" type="url" placeholder="https://" defaultValue={initialData?.url ?? ""} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="date">Date (leave empty for SOON)</Label>
                <Input id="date" name="date" type="date" defaultValue={
                        initialData
                            ? initialData.date?.split(" ")[0] ?? ""
                            : new Date().toISOString().split("T")[0]
                    } />
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                    id="published"
                    name="published"
                    className="data-[state=unchecked]:bg-zinc-700"
                    checked={published}
                    onCheckedChange={setPublished}
                />
                <Label htmlFor="published">Published</Label>
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                    ? isEditMode ? 'Updating...' : 'Creating...'
                    : isEditMode ? 'Update Project' : 'Create Project'}
            </Button>
        </form>
    );
}