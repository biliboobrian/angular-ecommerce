import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Group } from '../models/group';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private obs: Observable<Group[]>;
  
  constructor(
    private firestore: AngularFirestore
  ) { }

  getGroups(): Observable<Group[]> {
    if(!this.obs) {
      this.obs = new Observable<Group[]>(observer => {
     this.firestore.collection<Group>('groups').snapshotChanges().pipe(
      map((res: DocumentChangeAction<Group>[]) => {
        const groups: Group[] = [];
        res.forEach((result: DocumentChangeAction<Group>) => {
          const data = result.payload.doc.data();
          groups.push({
            id: result.payload.doc.id,
            ...data
          })
        });
        return groups;
          })
        ).subscribe(products => {
          observer.next(products);
        });
      });
    } 
    return this.obs;
  }

  createGroup(group: Group) {
    return this.firestore.collection<Group>('groups').add({ ...group });
  }

  updateGroup(group: Group) {
    return this.firestore.doc<Group>(`groups/${group.id}`).update(group);
  }

  deleteGroup(id: string) {
    this.firestore.doc<Group>(`groups/${id}`).delete();
  }
}
