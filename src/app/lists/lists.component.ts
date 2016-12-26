// Add the RxJS Observable operators.
import '../rxjs-operators';

import { Component } from '@angular/core';
import {MdIconRegistry} from '@angular/material';

@Component({
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  providers: [MdIconRegistry]
})
export class ListsComponent {
  navItems = [
    {name: '人脉列表', route: 'index'},
    {name: '群落列表', route: 'group'},
    {name: '精准列表', route: 'precision'},
    {name: '注册', route: '/register/step1'},
    {name: '设置', route: '/set/index'},
    {name: 'Gestures', route: '/notice/1'},
    {name: 'Grid List', route: '/notice/2'}
  ];
  upTop() {
    console.log('"upTop down!"');
  }
}


