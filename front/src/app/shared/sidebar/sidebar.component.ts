import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    $(document).ready(function(){
      $(".button-collapse").sideNav();
      $('.parallax').parallax();
      $(".dropdown-button").dropdown({
        hover: false
      });
    });
  }

  logout() {
    this.authService.doLogout();
    this.router.navigate(['/login']);
  }
}
