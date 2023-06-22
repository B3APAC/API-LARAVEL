import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, where, query } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { Run } from '../interfaces/run';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  constructor() {}
  app = initializeApp(environment.firebase);
  db = getFirestore(this.app);
  auth = getAuth();

  async getProjects(userId: string) {
    try {
      const projectsCol = collection(this.db, 'activities',userId,'id_user');
      const projectSnapshot = await getDocs(projectsCol);
      const projectList = projectSnapshot.docs.map(doc => {
        const data = doc.data();
        return {...data } as Run;
      });
      return projectList;
    }
    catch (error) {
      console.log(error);
    }
    return [];
  }
}
