import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-dummy',
    templateUrl: './dummy.component.html',
    styleUrls: ['./dummy.component.scss']
})

export class DummyComponent implements OnInit {

    items: Observable<any[]>;

    constructor(db: AngularFirestore) {
        this.items = db.collection('reports').valueChanges();
    }

    ngOnInit() {
    }
}
