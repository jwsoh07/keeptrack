import { Link } from 'react-router-dom';

import { Project } from './Project';

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
}

function limitTextCharacters(limit: number, text: string) {
    return text.slice(0, limit) + '...';
}

const ProjectCard = ({ project, onEdit }: ProjectCardProps) => {


    const handleEditClick = (projectBeingEdited: Project) => {
        onEdit(project);
    };

    console.log('i am re-rendered');


    return (
        <div className="card" key={project.id}>{project.projectName}
            <img src={project.imageUrl} alt={project.projectName} />
            <section className='section dark'>
                <Link to={'/projects/' + project.id}>
                    <h5 className="strong">
                        <strong>{project.projectName}</strong>
                    </h5>
                    <p>{limitTextCharacters(60, project.description)}</p>
                    <p>Budget : {project.budget.toLocaleString()}</p>
                </Link>
                <button className=" bordered" onClick={() => handleEditClick(project)}>
                    <span className="icon-edit "></span>
                    Edit
                </button>
            </section>
        </div>
    )
}

export default ProjectCard
