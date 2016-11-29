import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params } from '@angular/router';
import { TitleService }     from '../../share/title.service';
import 'rxjs/add/operator/switchMap';

import { List } from './list';
import { ListService } from './lists.service';
@Component({
  selector: 'app-lists-view',
  templateUrl: './lists-view.component.html',
  styleUrls: ['./lists-view.component.css'],
  providers: [ListService, TitleService]
})
export class ListsViewComponent implements OnInit {
  errorMessage: string;
  lists: List[];
  constructor(
    private title: TitleService,
    private route: ActivatedRoute,
    private router: Router,
    private listService: ListService
    ) { }
  ngOnInit() {
    this.route.params
      .subscribe(p => {
          console.log('params', p );
      });
    this.getLists();
  }
  getLists() {
    this.listService.getLists()
      .subscribe(
      lists => this.lists = lists,
      error => this.errorMessage = <any>error);
  }
  onScrollDown() {
    console.log('scrolled!!');
    this.listService.getLists()
      .subscribe(
      lists => {
        lists.forEach(element => {
          this.lists.push(element);
        });
      },
      error => this.errorMessage = <any>error);
  }
  getDetail(){
    this.router.navigate(['/detail', 1]);
  }
}
