import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'block';

  apartmentName: any = ''
  totalBlocks = 0
  totalTowers = 0
  totalFloors = 0
  totalUnits = 0
  postdata : any = {}

  constructor(private httpservice: HttpService) {

  }

  ngOnInit() {
    this.getAllUnits()
  }

  saveApartment() {
    this.postdata = {
      apartmentName: this.apartmentName,
      totalBlocks: this.totalBlocks,
      totalTowers: this.totalTowers,
      totalFloors: this.totalFloors,
      totalUnits: this.totalUnits
    }
    this.httpservice.saveApartment(this.postdata).subscribe();
  }

  getAllUnits() {
    this.httpservice.getAllUnits().subscribe()
  }

}
