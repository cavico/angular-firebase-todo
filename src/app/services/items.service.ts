import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Item } from 'src/app/common/interface';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {

  uid: string;
  collection = this.afs.collection<Item>('items', (x) => x);

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.afAuth.user.subscribe(
      user => {
        this.uid = user.uid;
      }
    );
  }

  list() {
    return this.afs
      .collection<Item>('items')
      .snapshotChanges();
  }

  async create(data: Item): Promise<DocumentReference> {
    data.uid = this.uid;
    return await this.collection.add(data);
  }

  async update(data, value) {
    return await this.collection
      .doc(data.payload.doc.id)
      .set(value, { merge: true });
  }

  async delete(data) {
    return await this.collection.doc(data.payload.doc.id).delete();
  }
}
