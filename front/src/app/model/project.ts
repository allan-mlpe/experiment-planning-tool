export class Project {
    name: string;
    description: string;
    lastModification: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;

        const auxDate = new Date();
        this.lastModification = `${auxDate.getMonth()+1}/${auxDate.getDate()}/${auxDate.getFullYear()}`;    
    }
}
