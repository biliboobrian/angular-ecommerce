import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Group } from '../models/group';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getGroups() {
    return this.firestore.collection<Group>('Groups').snapshotChanges().pipe(
      map((res: DocumentChangeAction<Group>[]) => {
        const groups: Group[] = [];
        res.forEach((result: DocumentChangeAction<Group>) => {
          const data = result.payload.doc.data();
          groups.push({
            id: result.payload.doc.id,
            ...data
          })
        })
        return groups;
      })
    );
  }

  getGroup(id: string) {
    return this.firestore.doc<Group>(`Groups/${id}`).snapshotChanges().pipe(
      map(result => {
        const group: Group = {
          id: result.payload.id,
          ...result.payload.data()
        } as Group;
        return group;
      })
    );
  }

  createGroup(group: Group) {
    return this.firestore.collection<Group>('Groups').add({ ...group });
  }

  updateGroup(group: Group) {
    return this.firestore.doc<Group>(`Groups/${group.id}`).update(group);
  }

  deleteGroup(id: string) {
    this.firestore.doc<Group>(`Groups/${id}`).delete();
  }
}
