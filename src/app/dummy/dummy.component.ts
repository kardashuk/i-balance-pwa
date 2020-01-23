import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {combineLatest} from 'rxjs';

@Component({
    selector: 'app-dummy',
    templateUrl: './dummy.component.html',
    styleUrls: ['./dummy.component.scss']
})

export class DummyComponent implements OnInit {
    reports;

    constructor(db: AngularFirestore) {
        this.reports = combineLatest(
            db.collection('reports').valueChanges(),
            db.collection('changes').valueChanges(),
            this.applyChanges
        );
    }

    ngOnInit() {
    }

    applyChanges = (reports, changes) => {
        const report = {
            ...reports[0],
            expenses: {...reports[0].expenses},
            balance: {...reports[0].balance}
        };
        changes.forEach(c => {
            report.balance['₴'] = (parseFloat(report.balance['₴']) - parseFloat(c.amount)).toFixed(2);
            report.expenses[c.to] = (parseFloat(report.expenses[c.to]) + parseFloat(c.amount)).toFixed(2);
        });
        return [report];
    };
}
