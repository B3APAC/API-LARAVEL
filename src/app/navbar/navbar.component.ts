import { signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  constructor(private authService : AuthService, private router:Router) { }

  username: string="";
  showMenu : boolean = false;
  auth : Auth=getAuth();

  ngOnInit(){
    if(this.authService.auth.currentUser != null){
      this.username=this.authService.auth.currentUser.email as string;
    }
  }

  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }

  signOut(){
    this.authService.signOut();
    console.log("Déconnexion");
    this.router.navigate(['/signIn']);
  }
}