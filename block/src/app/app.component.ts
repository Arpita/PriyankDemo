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
  allApartmentUnits: any = [];
  count: any = {}
  constructor(private httpservice: HttpService) {

  }

  ngOnInit() {
    this.getAllUnits()
    this.getCount()
  }

  getCount() {
    this.httpservice.getCount().subscribe(r => {
      this.count = r;
    })
  }

  saveApartment() {
    this.postdata = {
      apartmentName: this.apartmentName,
      totalBlocks: this.totalBlocks,
      totalTowers: this.totalTowers,
      totalFloors: this.totalFloors,
      totalUnits: this.totalUnits
    }
    this.httpservice.saveApartment(this.postdata).subscribe(r => {
      this.getAllUnits()
    });
  }

  getAllUnits() {
    this.httpservice.getAllUnits().subscribe(res => {
      this.allApartmentUnits = res;
    })
  }

  updateStatus(unit) {
    let status_id = 0;
    let status = ''
    if (unit.status_id == 1) {
      status_id = 2
      status = 'Booked'
    } else if (unit.status_id == 2) {
      status_id = 3
      status = 'Sold'
    }
    this.httpservice.updateStatus({ unit_name: unit.unit_name, status, status_id }).subscribe(r => {
      console.log('re', r)
      this.getAllUnits()
    })
  }

}
