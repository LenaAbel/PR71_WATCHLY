import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-btn',
  templateUrl: './return-btn.component.html',
  styleUrls: ['./return-btn.component.css']
})
/**
 * Component to display a button that navigates back to the previous page.
 * The button uses the browser's history API to go back to the last visited page.
 */
export class ReturnBtnComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToPreviousPage(){
    window.history.back();
  }

}
