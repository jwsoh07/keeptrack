import { useState } from 'react';

import { Project } from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
    projects: Project[];
    onSave: (project: Project) => void;
}

// TODO: Try to see if you can optimise performance by reducing unnecessary renders 
// on the ProjectCard

function ProjectList({ projects, onSave }: ProjectListProps) {
    const [projectBeingEdited, setProjectBeingEdited] = useState({});

    const onEdit = (project: Project) => {
        setProjectBeingEdited(project);
    };

    const cancelEdit = () => {
        setProjectBeingEdited({});
    }


    const items = projects.map(project => (
        <div key={project.id} className="cols-sm">
            {projectBeingEdited === project ?
                <ProjectForm
                    project={project}
                    onSave={onSave}
                    cancelEdit={cancelEdit} /> :
                <ProjectCard
                    onEdit={onEdit}
                    project={project} />
            }
        </div>
    ));
    return (
        <div className="row">{items}</div>
    );
}

export default ProjectList;
