import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Array<any> = [
    {
      name: "My First Project",
      lastModification: "12/02/2018"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  editProject() {
    console.log("Edit project");
  }

  removeProject() {
    console.log("Remove project");
  }

}
