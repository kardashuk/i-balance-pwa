import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

    @Input() report: any;

    constructor() {
    }

    ngOnInit() {
    }

}
