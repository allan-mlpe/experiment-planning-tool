import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;

  projects: Array<Project>;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    /*this.projectService.getProjects().subscribe(
      (data: Array<Project>) => {
        this.projects = data;
      },
      error => {
        console.log(error);
      }
    );*/
    this.projects = this.projectService.getProjects();
  }

  editProject() {
    console.log("Edit project");
  }

  removeProject(project: Project) {
    this.confirmModal.create("Remove Project", `"${project.name}" will be deleted. Are you sure?`);
    this.confirmModal.openModal();
    let subsc: Subscription = this.confirmModal.confirm.subscribe(
      data => {
        if(data) {
          this.projectService.deleteProject(project);
          this.projects = this.projectService.getProjects();
        }
        subsc.unsubscribe();
      }
    );
  }

}
