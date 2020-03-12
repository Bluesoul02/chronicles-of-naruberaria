import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  image = './assets/deluxe-pacman.jpg';
  imageIcon = './assets/pacman.png';

  constructor() { }

  ngOnInit() {
  }

}
