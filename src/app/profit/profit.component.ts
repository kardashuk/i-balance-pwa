import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss']
})
export class ProfitComponent implements OnInit {

  @Input()  value;
  constructor() { }

  ngOnInit() {
  }

}
