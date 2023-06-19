import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { RunService } from '../services/run.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private runService: RunService,private authService:AuthService) { }
  myRunData: any = [];
  ngOnInit() {
    if(this.authService.auth.currentUser != null){
      this.runService.getProjects(this.authService.auth.currentUser.uid).then((data) => {
        this.myRunData = data;
      });
    }
  }
}
