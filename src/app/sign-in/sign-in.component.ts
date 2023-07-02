import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AngularFireAuth]
})
export class SignInComponent {

  error: boolean = false;
  //on instancie le formulaire de connexion
  signInForm: FormGroup;
  //on récupère les données de connexion
  auth = getAuth();

  //on injecte le formBuilder et le service d'authentification
  constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router) {
    this.signInForm = this.formBuilder.group({
      //on définit les champs et les restrictions du formulaire
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  //On vérifie si l'utilisateur est connecté
  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        //si l'utilisateur est connecté on le redirige vers le dashboard
        console.log(user);
        console.log("L'utilisateur est connecté");
        this.router.navigate(['/dashboard']);
      } else {
        //sinon on affiche un message dans la console
        console.log("L'utilisateur n'est pas connecté");
      } 
    });
  }

  //Quand on clic sur connexion on vérifie si le formulaire est valide
  onSubmit() {
    if (this.signInForm.valid) {
      //si le formulaire est valide on appelle la méthode signIn du service d'authentification 
      //qui nous retourne un boolean pour savoir si la connexion se fait correctement
      this.authService.signIn(this.signInForm.value.email, this.signInForm.value.password);
      if(this.authService.connected){
        this.authService.connected = true;
        this.router.navigate(['/dashboard']);
      }
      //si la connexion ne se fait pas correctement on affiche un message d'erreur
      else{
        this.error=true;
      }
    }
    //sinon on affiche un message dans la console et un message d'erreur
    else (console.log("form non valide"));
  }

}