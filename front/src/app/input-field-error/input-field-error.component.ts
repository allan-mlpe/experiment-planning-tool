import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-field-error',
  templateUrl: './input-field-error.component.html',
  styleUrls: ['./input-field-error.component.css']
})
export class InputFieldErrorComponent implements OnInit {

  @Input()
  message: string;

  @Input()
  showError: boolean;

  constructor() { }

  ngOnInit() {
  }

}
