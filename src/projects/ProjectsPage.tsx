import { useState } from "react";

import { MOCK_PROJECTS } from "./MockProjects"
import { Project } from "./Project";
import ProjectList from "./ProjectList";

function ProjectsPage() {
    /* now, we can pretend that the MOCK_PROJECTS array is fetched from
     * a server.
     *
     * Note that if you refresh your browser page your changes will not persist 
     * because the updates are only happening in the browser's memory. We will 
     * get a more permanent save working in a future lab when we communicate to 
     * our backend web API.
     */

    const [projects, setProjects] = useState<Project[]>([...MOCK_PROJECTS]);

    const saveProject = (project: Project) => {
        let updatedProjects = projects.map((p: Project) => {
            return p.id === project.id ? project : p;
        })
        setProjects(updatedProjects);
    };
    return (
        <>
            <h1>Project Page</h1>
            <ProjectList onSave={saveProject} projects={projects} />
        </>
    )
}

export default ProjectsPage
