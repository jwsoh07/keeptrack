import { Project } from "./Project";

export class ProjectAPI {
    private baseUrl: string;
    private url: string;

    constructor() {
        this.baseUrl = 'http://localhost:4000';
        this.url = `${this.baseUrl}/projects`;
    }

    translateStatusToErrorMessage(status: number) {
        switch (status) {
            case 401:
                return 'Please login again.';
            case 403:
                return 'You do not have permission to view the project(s).';
            default:
                return 'There was an error retrieving the project(s). Please try again.';
        }
    }

    checkStatus(response: any) {
        if (response.ok) {
            return response;
        } else {
            const httpErrorInfo = {
                status: response.status,
                statusText: response.statusText,
                url: response.url,
            };
            console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

            let errorMessage = this.translateStatusToErrorMessage(httpErrorInfo.status);
            throw new Error(errorMessage);
        }
    }

    parseJSON(response: Response) {
        return response.json();
    }

    delay(ms: number) {
        return function (x: any): Promise<any> {
            return new Promise((resolve) => setTimeout(() => resolve(x), ms));
        };
    }

    convertToProjectModels(data: any[]): Project[] {
        let projects: Project[] = data.map((item) => new Project(item));
        return projects;
    }

    get(page = 1, limit = 20) {
        return fetch(`${this.url}?_page=${page}&_limit=${limit}&_sort=name`)
            .then(this.delay(600))
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.convertToProjectModels)
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error retrieving the projects. Please try again.'
                );
            });
    }

    put(project: Project) {
        return fetch(`${this.url}/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(this.checkStatus)
            .then(this.parseJSON)
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error updating the project. Please try again.'
                );
            });
    }

    find(id: number) {
        return fetch(`${this.url}/${id}`)
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then((item) => new Project(item));
    }
}
