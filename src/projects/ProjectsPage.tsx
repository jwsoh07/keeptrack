import { useEffect, useState } from "react";

import { MOCK_PROJECTS } from "./MockProjects";
import { Project } from "./Project";
import ProjectList from "./ProjectList";
import { ProjectAPI } from "./projectAPI";

function ProjectsPage() {
    /* now, we can pretend that the MOCK_PROJECTS array is fetched from
     * a server.
     *
     * Note that if you refresh your browser page your changes will not persist 
     * because the updates are only happening in the browser's memory. We will 
     * get a more permanent save working in a future lab when we communicate to 
     * our backend web API.
     */
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const api = new ProjectAPI();
                const data = await api.get(currentPage);
                if (currentPage === 1) {
                    setProjects(data);
                } else {
                    setProjects((projects) => [...projects, ...data]);
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, [currentPage]);

    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    }

    const saveProject = (project: Project) => {
        let updatedProjects = projects.map((p: Project) => {
            return p.id === project.id ? project : p;
        })
        setProjects(updatedProjects);
    };

    return (
        <>
            <h1>Project Page</h1>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse "></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}
            <ProjectList onSave={saveProject} projects={projects} />

            {!loading && !error && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group fluid">
                            <button className="button default" onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {loading &&
                (<div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>)}

        </>
    )
}

export default ProjectsPage
