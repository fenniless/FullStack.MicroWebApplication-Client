import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";

@Component({
    selector: 'app-main-window',
    templateUrl: './main-window.component.html',
    styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {
    userId: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
        this.route.params.subscribe(routeParams => this.userId = routeParams.id);
        console.log(this.userId);
    }

    reload(e: string){
        this.router.navigate([`mainwindow/${this.userId}`])
    }




}
