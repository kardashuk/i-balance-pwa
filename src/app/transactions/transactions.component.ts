import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

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

    expensesCategories = [];
    @ViewChild('name', {static: false}) nameElement: ElementRef;

    constructor(protected db: AngularFirestore) {
        this.items = this.db.collection('changes').valueChanges()
            .pipe(
                map(c => c.sort((a: any, b: any) => a.date > b.date ? -1 : a.date === b.date ? 0 : 1))
            );
        const expensesUid = '7e0211c4-c931-9961-93a0-09ed9d0463b1';
        this.db.collection('reports').valueChanges().subscribe((r: any) => {
            console.log(r);
            this.expensesCategories = r[0].categories.filter(c => c.parent === expensesUid);
        });
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
        setTimeout(() => { // this will make the execution after the above boolean has changed
            this.nameElement.nativeElement.focus();
        }, 0);
    }

    addTransaction() {
        const time = new Date(this.transaction.date + (new Date()).toISOString().substr(10)).getTime();
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
