import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/project';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { ModalService } from '../services/modal.service';
import { ToastFactory } from '../shared/toast-factory';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Array<Project>;

  constructor(private projectService: ProjectService, protected modalService: ModalService) { }

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
    let subsc: Subscription = this.modalService.showModal("Remove Project", `"${project.name}" will be deleted. Are you sure?`)
      .subscribe(
        data => {
          if(data) {
            this.projectService.deleteProject(project);
            this.projects = this.projectService.getProjects();
            ToastFactory.successToast(`"${project.name}" deleted successfuly.`)
          }
          subsc.unsubscribe();
        }
      );
  }

}
