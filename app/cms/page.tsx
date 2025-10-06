import { getAllProjects } from "@/lib/pocketbase";
import { ProjectList } from "./project-list";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout_button";

export default async function CmsPage() {
    const projects = await getAllProjects('rank');
    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">CMS</h1>

                <div className="flex items-center gap-2">
                    <Link href="/cms/add">
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Project
                        </Button>
                    </Link>
                    
                    <LogoutButton />
                </div>
            </div>
            <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
                <ProjectList initialProjects={projects} />
            </div>
        </div>
    );
}