import { ProjectForm } from "../project-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AddProjectPage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl mb-8">
                <Link href="/cms" className="flex items-center gap-2 text-sm hover:underline">
                    <ArrowLeft className="h-4 w-4" />
                    Back to CMS
                </Link>
                <h1 className="text-2xl font-bold mt-4">Add New Project</h1>
                <p className="text-muted-foreground">Fill out the form below to add a new project to your portfolio.</p>
            </div>

            <div className="w-full max-w-2xl">
                <ProjectForm />
            </div>
        </div>
    );
}