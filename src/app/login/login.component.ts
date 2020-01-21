import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    auth = {
        username: '',
        password: ''
    };

    constructor(
        protected fsAuth: AngularFireAuth
    ) {
    }

    ngOnInit() {
    }

    login() {
        this.fsAuth.auth.signInWithEmailAndPassword(this.auth.username, this.auth.password);
    }

}
