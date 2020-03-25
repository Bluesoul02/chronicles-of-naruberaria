import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <img src="./assets/404.png" style="width: 100%">
  `,
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}
