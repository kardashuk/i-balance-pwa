import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent implements OnInit {
    emptyTransaction = {
        date: new Date().toISOString().substr(0, 10),
        from: 'Assets:Cash',
        to: 'Expenses:Food',
        name: '',
        amount: null
    };
    items: Observable<any[]>;
    showForm = false;
    transaction = {...this.emptyTransaction};

    constructor(protected db: AngularFirestore) {
        this.items = this.db.collection('changes').valueChanges();
    }

    ngOnInit() {
    }

    removeTransaction(item) {
        if (confirm('Are you sure want to remove `' + item.name + '`?')) {
            this.db.collection('changes').doc(this.uid(item)).delete();
        }
    }

    newTransaction() {
        this.showForm = true;
        this.transaction = {...this.emptyTransaction};
    }

    addTransaction() {
        const time = new Date(this.transaction.date).getTime();
        const transaction = {...this.transaction, date: time};
        this.db.collection('changes')
            .doc(this.uid(transaction)).set(transaction)
            .catch(e => alert(e));
        this.showForm = false;
    }

    uid(item) {
        return item.name + ':' + item.date + ':' + item.amount;
    }
}
