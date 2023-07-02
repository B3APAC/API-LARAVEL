import { Auth } from '@angular/fire/auth';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-user-datas',
  templateUrl: './user-datas.component.html',
  styleUrls: ['./user-datas.component.css']
})
export class UserDatasComponent {

  constructor(private formBuilder: FormBuilder, private authService : AuthService) {
    this.formControl = this.formBuilder.group({
      mail: ['', Validators.required],
      taille: [''],
      poids: [''],
      age: ['']
    });
  }
  imc =0;
  jugementCorporel: String="";
  user : User = { id: '', mail: '',  taille: '', poids: '', age: 0 };
  formControl: FormGroup;

  //init the form
  async ngOnInit() {
    await this.authService.getUserData().then((datas) => {
      if(datas != null){
        this.user = datas as User;
      }
    });
    this.imc=Number(this.user.poids)/((Number(this.user.taille)/100)*(Number(this.user.taille)/100));
    this.imc=parseInt(this.imc.toFixed(2));
    console.log(this.user);
    this.formControl.controls['mail'].setValue(this.user.mail);
    this.formControl.controls['taille'].setValue(this.user.taille);
    this.formControl.controls['poids'].setValue(this.user.poids);
    this.formControl.controls['age'].setValue(this.user.age);
  }

  //update the product
  async onSubmit() {
    if (this.formControl.valid) {
      await this.authService.setUserData(this.user.id, this.formControl.value);
      console.log(this.formControl.value);
      this.formControl.reset();
    } else {
      console.error('Le formulaire est invalide');
    }
    this.calculIMC();
  }

  calculIMC(){
    this.imc = (this.formControl.controls['poids'].value) / (((this.formControl.controls['taille'].value) / 100) * ((this.formControl.controls['taille'].value) / 100));
    this.imc=parseInt(this.imc.toFixed(2));
    if (this.imc < 18.5) {
      this.jugementCorporel = "Vous êtes en insuffisance pondérale";
    } else if (this.imc >= 18.5 && this.imc < 25) {
      this.jugementCorporel = "Vous êtes en corpulence normale";
    } else if (this.imc >= 25 && this.imc < 30) {
      this.jugementCorporel = "Vous êtes en surpoids";
    } else if (this.imc >= 30 && this.imc < 35) {
      this.jugementCorporel = "Vous êtes en obésité modérée";
    } else if (this.imc >= 35 && this.imc < 40) {
      this.jugementCorporel = "Vous êtes en obésité sévère";
    } else if (this.imc >= 40) {
      this.jugementCorporel = "Vous êtes en obésité morbide";
    }
    else {
      this.jugementCorporel = "Veuillez saisir des données valides";
    }
  }
}
