import { getProjectById } from "@/lib/pocketbase";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "../../project-form";

export default async function EditProjectPage({ params }: { params: { slug: string } }) {
    const project = await getProjectById(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl mb-8">
                <Link href="/cms" className="flex items-center gap-2 text-sm hover:underline">
                    <ArrowLeft className="h-4 w-4" />
                    Back to CMS
                </Link>
                <h1 className="text-2xl font-bold mt-4">Edit Project</h1>
                <p className="text-muted-foreground">Make changes to "{project.title}"</p>
            </div>

            <div className="w-full max-w-2xl">
                <ProjectForm initialData={project} />
            </div>
        </div>
    );
}