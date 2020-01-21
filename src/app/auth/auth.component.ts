import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    currentUser: any;

    constructor(
        protected fsAuth: AngularFireAuth
    ) {
    }

    ngOnInit() {
        this.fsAuth.user.subscribe(u => this.currentUser = u);
    }

    logout() {
        this.fsAuth.auth.signOut();
    }
}
