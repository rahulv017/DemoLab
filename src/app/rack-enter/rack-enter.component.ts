import { Component, OnInit } from '@angular/core';
import { CellData } from '../CellData';
import { RackServiceService } from '../rack-service.service';
import { RackSample } from '../rack-sample';

@Component({
  selector: 'app-rack-enter',
  templateUrl: './rack-enter.component.html',
  styleUrls: ['./rack-enter.component.css']
})
export class RackEnterComponent implements OnInit {

  constructor(private cell:CellData,private service:RackServiceService) {
    this.select_box=null;
    this.select_can=null;
    this.select_cell=null;
    this.select_rack=null;
    this.vails=false;
    this.search=false;
    this.service.authenticate().subscribe(response=>service.JWT=response);
   }
  select_can;
  select_rack;
  select_box;
   select_cell=new Array();
  vails:boolean;
  search:boolean;
  sample;
  ngOnInit() {
  }

  onSubmit()
  {
    this.cell.canId=this.select_can;
    this.cell.rackId=this.select_rack;
    this.cell.boxId=this.select_box;
    this.cell.cellId=this.select_cell;
    this.cell.sampleNo=this.sample;
    this.service.sendRackData(this.cell).subscribe();
    alert("You have entered "+"Canister "+this.select_can+" Cells "+ this.select_cell +" Sample No "+this.sample);
    this.select_box=null;
    this.select_can=null;
    
    this.select_cell=null;
    this.select_rack=null;
  }

  onSearch()
  {
    console.log(this.sample);
    this.service.searchRack(this.sample).subscribe(response => this.fetchData(response));
    alert('OK!!');
  }

  fetchData(response:RackSample[])
  {
     console.log(response);
     alert(response);
  }

}
