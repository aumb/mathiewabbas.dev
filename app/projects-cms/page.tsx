import { getAllProjects } from "@/lib/pocketbase";
import { ProjectList } from "./project-list";

export default async function ProjectsRankPage() {
    const projects = await getAllProjects('rank');

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <ProjectList initialProjects={projects} />
        </div>
    );
}