import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Project} from "../../model/project";
import {ProjectService} from "../../services/project.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  project: Project;
  private subscription: Subscription;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(
      (info: {project: Project}) => {
        console.log(info);
        this.project = info['project'];
      }
    );
  }
}
