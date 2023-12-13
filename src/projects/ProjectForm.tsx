import { useState } from 'react';
import { Project } from './Project';

interface ProjectFormProps {
    project: Project;
    cancelEdit: () => void;
    onSave: (project: Project) => void;
}

const ProjectForm = ({ project: initialProject, cancelEdit, onSave }: ProjectFormProps) => {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({ projectName: '', description: '', budget: '' });

    // event type set to any so that it can handle input and text area elements.
    const handleInputChange = (event: any) => {
        const { name, value, type, checked } = event.target;

        let updatedValue = type === 'checkbox' ? checked : value;

        if (type === "number") {
            updatedValue = Number(updatedValue);
        };

        const change = {
            [name]: updatedValue
        }

        let updatedProject = {
            ...project,
            ...change,
            isNew: project.isNew
        }

        setProject(updatedProject);
        setErrors(() => validateInputs(updatedProject));
    }

    const validateInputs = (project: Project) => {
        let errors: any = { projectName: '', description: '', budget: '' };


        if (project.projectName.length === 0) {
            errors.projectName = 'Name is required';
        }
        if (project.projectName.length > 0 && project.projectName.length < 3) {
            errors.projectName = 'Name needs to be at least 3 characters.';
        }
        if (project.description.length === 0) {
            errors.description = 'Description is required.';
        }
        if (project.budget === 0) {
            errors.budget = 'Budget must be more than $0.';
        }
        return errors;
    }

    const isValid = () => {

        return (
            errors.projectName.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isValid()) return;
        onSave(new Project(project));
    }

    return (
        <form
            className="input-group vertical"
            onSubmit={handleSubmit}>
            <label htmlFor="projectName">Project Name</label>
            <input
                type="text"
                name="projectName"
                placeholder="enter name"
                value={project.projectName}
                onChange={handleInputChange} />
            {errors.projectName.length > 0 && (
                <div className="card error">
                    <p>{errors.projectName}</p>
                </div>
            )}

            <label htmlFor="description">Project Description</label>
            <textarea
                name="description"
                placeholder="enter description"
                value={project.description}
                onChange={handleInputChange} />
            {errors.description.length > 0 && (
                <div className="card error">
                    <p>{errors.description}</p>
                </div>
            )}

            <label htmlFor="budget">Project Budget</label>
            <input
                type="number"
                name="budget"
                placeholder="enter budget"
                value={project.budget}
                onChange={handleInputChange} />
            {errors.budget.length > 0 && (
                <div className="card error">
                    <p>{errors.budget}</p>
                </div>
            )}

            <label htmlFor="isActive">Active?</label>
            <input
                type="checkbox"
                name="isActive"
                checked={project.isActive}
                onChange={handleInputChange} />

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button type="button" className="bordered medium" onClick={() => cancelEdit()}>cancel</button>
            </div>
        </form>
    )
}

export default ProjectForm;
