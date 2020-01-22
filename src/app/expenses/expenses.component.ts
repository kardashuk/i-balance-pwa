import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit, OnChanges {
    @Input() report: any;
    chartLabels = [];
    chartData = [];

    expenses = [];
    expensesOrdered = [];
    colors = [];
    totals = {
        month: 0,
        prev: 0,
        avg: 0,
    };
    excluded = {};

    constructor() {
        this.colors = [
            '#4CAF50', // food
            '#FF9800', // birth
            '#795548', // utils
            '#F44336', // cloth
            '#E91E63', // health
            '#009688', // metro
            '#827717', // hobby
            '#9C27B0', // health
            '#673AB7', // home
            '#00BCD4', // wc
            '#CDDC39', // others
            '#03A9F4', // travels
            '#FFC107',
            '#9E9E9E',
            '#03A9F4',
        ];
    }

    ngOnInit() {
        this.expenses = this.expensesOrder(this.report.avg_expenses);
        this.expensesOrdered = this.expenses.map(e => e.name);
        this.chartLabels = this.expensesOrdered.map(this.cat2label);
        this.buildChartData();
        this.buildTotals();

    }

    ngOnChanges() {
        this.buildChartData();
        this.buildTotals();
    }

    buildTotals() {
        this.totals.month = this.seriesByCat(this.report.expenses).reduce(this.sumMoney, 0);
        this.totals.prev = this.seriesByCat(this.report.prev_expenses).reduce(this.sumMoney, 0);
        this.totals.avg = this.seriesByCat(this.report.avg_expenses).reduce(this.sumMoney, 0);
    }

    buildChartData() {
        this.chartData = [
            this.seriesByCat(this.report.expenses, true),
            this.seriesByCat(this.report.prev_expenses, true),
            this.seriesByCat(this.report.avg_expenses, true),
        ];
    }

    expensesOrder = (exp) => {
        let expenses = [];
        for (const i in exp) {
            if (exp.hasOwnProperty(i)) {
                expenses.push({
                    name: i,
                    value: exp[i],
                    order: i === 'Expenses:Travels' ? -1 : parseFloat(exp[i])
                });
            }
        }
        expenses = expenses.sort((a, b) => a.order > b.order ? -1 : (a.order === b.order ? 0 : 1));
        return expenses;
    }

    cat2label = cat => cat.replace('Expenses:', '').replace('\\u0421', 'C');

    seriesByCat = (exp, exclude = false) => this.expensesOrdered.map(cat => exclude && this.excluded[cat] ? '0.00' :  exp[cat]);

    sumMoney = (a, b) => (parseFloat(a) + parseFloat(b)).toFixed();

    toggleCat(cat) {
        this.excluded[cat] = !this.excluded[cat];
        this.buildChartData();
    }
}
