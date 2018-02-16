import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { RestService } from './rest.service';

@Injectable()
export class ProjectService {

  projects: Array<Project> = [
    {"name": "Project 1", "description": "This is my first project", "lastModification": "11/11/2017"},
    {"name": "Project 2", "description": "This is my second project", "lastModification": "1/22/2018"},
    {"name": "Project 3", "description": "This is a project", "lastModification": "1/31/2018"}
  ];

  constructor(private restService: RestService) {
    /*this.getProjects().subscribe(
      (data : Array<Project>) => {
        this.projects = data;
      }, error => {
        console.log(error);
      }
    )*/
  }

  getProjects() {
    //return this.restService.get('assets/projects.json');
    return this.projects;
  }

  saveProject(project: Project) {
    this.projects.push(project);
  }

  deleteProject(project: Project) {
    this.projects = this.projects.filter(prj => prj !== project);
  }
}
