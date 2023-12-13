import { Project } from './Project';

interface ProjectDetailProps {
    project: Project;
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
    return (
        <div className="row">
            <div className="col-sm-6">
                <div className="card large">
                    <img
                        className="rounded"
                        src={project.imageUrl}
                        alt={project.projectName}
                    />
                    <section className="section dark">
                        <h3 className="strong">
                            <strong>{project.projectName}</strong>
                            <p>{project.description}</p>
                            <p>Budget : {project.budget}</p>
                            <p>Signed: {project.contractSignedOn.toLocaleDateString()}</p>
                            <p>
                                <mark className="active">
                                    {' '}
                                    {project.isActive ? 'active' : 'inactive'}
                                </mark>
                            </p>
                        </h3>
                    </section>
                </div>

            </div>
        </div>

    );
}

export default ProjectDetail;
