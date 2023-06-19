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
  // 
  async isAuth(): Promise<boolean> {
    console.log(this.auth.currentUser);
    this.connected = await this.auth.currentUser ? true : false;
    return await this.auth.currentUser ? true : false;
  }

  // Inscription with email/password
  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          //Create the user in the database
          const db = getFirestore(this.app);
          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, {
            firstName: 'Gerard',
            lastName: 'Dupont',
            role: 0
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

    disconnect() {
      signOut(this.auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }
}
