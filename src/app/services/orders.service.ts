import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Order } from '../models/order';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private obs: Observable<Order[]>;

  constructor(
    private firestore: AngularFirestore
    ) { }

  getOrders(): Observable<Order[]> {

    if(!this.obs) {
      this.obs = new Observable<Order[]>(observer => {
        this.firestore.collection<Order>('orders').snapshotChanges().pipe(
          map((res: DocumentChangeAction<Order>[]) => {
            const orders: Order[] = [];
            
            res.forEach((result: DocumentChangeAction<Order>) => {
              const data = result.payload.doc.data();
              data.id = result.payload.doc.id;
              orders.push(data);
            });

            return orders;
          })
        ).subscribe(orders => {
          observer.next(orders);
        });
      });
    } 
    return this.obs;
  }

  getById(id: string) {
    return this.firestore.doc<Order>(`orders/${id}`).snapshotChanges().pipe(
      map(res => {
        const data = new Order(res.payload.data());
        data.id = res.payload.id;
        
        if(res.payload.data().status) {
          data.status = res.payload.data().status;
        }
        

        return data;
      })
    );
  }

  createOrder(order: Order) {
    return this.firestore.collection<Order>('orders').add(order.toObj());
  }

  updateOrder(order: Order) {
    return this.firestore.doc<Order>(`orders/${order.id}`).update(order);
  }

  deleteOrder(id: string) {
    this.firestore.doc<Order>(`orders/${id}`).delete();
  }
}
