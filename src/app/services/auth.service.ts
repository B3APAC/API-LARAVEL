import { Injectable } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  app = initializeApp(environment.firebase);
  auth = getAuth();
  connected: boolean = false;
  
  // Vérification de l'état de connexion
  async isAuth(): Promise<boolean> {
    console.log(this.auth.currentUser);
    this.connected = await this.auth.currentUser ? true : false;
    return await this.auth.currentUser ? true : false;
  }

  
  // Inscription avec email/password
  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
          // On considère que l'inscription est réussie et que l'utilisateur est connecté
          const user = userCredential.user;

          //On crée un document dans la collection users avec l'uid de l'utilisateur
          const db = getFirestore(this.app);
          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, {
            mail : email,
            taille: 0,
            age: 0,
            poids: 0,
            start_date: new Date(),
            role:0
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
      });
  }

    // Connexion with email/password
  signIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
      console.log('Successfully signed in!');
      this.connected=true;
      const user = userCredential.user;
      console.log(user);
    })
    .catch(err => {
      console.log('Something is wrong:', err.message);
    });
  }



  // Disconnect the user
  signOut() {
    signOut(this.auth).then(() => {
      console.log('Successfully signed out!');
      this.connected=false;
    }).catch((error) => {
      console.log('Something is wrong:', error.message);
    });
  }

  //recup all data from the user
  async getUserData() {
    const db = getFirestore(this.app);
    const auth = this.auth.currentUser?.uid;
    if(this.auth.currentUser!=null){
      const docRef = doc(db, "users", this.auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    //on retourne un tableau vide si l'utilisateur n'est pas connecté ou que le document n'existe pas
    return [];
  }

  //set all data from the user
  async setUserData(id: string, data: any) {
    const db = getFirestore(this.app);
    const docRef = doc(db, "users", id);
    await setDoc(docRef, data);
  }
}
