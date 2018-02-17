import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { RestService } from './rest.service';

@Injectable()
export class ProjectService {
  projects: Array<Project>
  projectsMock: Array<any> = [
    {id: 1, name: "Project 1", description: "This is my first project", lastModification: "11/11/2017", threatList: null, actionList: null},
    {id: 2, name: "Project 2", description: "This is my second project", lastModification: "1/22/2018", threatList: null, actionList: null},
    {id: 3, name: "Project 3", description: "This is a project", lastModification: "1/31/2018", threatList: null, actionList: null}
  ];

  constructor(private restService: RestService) {
    /*this.getProjects().subscribe(
      (data : Array<Project>) => {
        this.projects = data;
      }, error => {
        console.log(error);
      }
    )*/
    this.projects = this.projectsMock.filter(projectMock => projectMock);
  }

  getProjects() {
    //return this.restService.get('assets/projects.json');
    console.log(this.projects);
    return this.projects;
  }

  saveProject(project: Project) {
    this.projects.push(project);
  }

  deleteProject(project: Project) {
    this.projects = this.projects.filter(prj => prj !== project);
  }
}
