import { Component, Input, OnChanges, OnInit } from "@angular/core";
import IShip from "../../assets/IShip";


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnChanges{

  renderText = (): string => {

    if (this.X == '0' && this.Y == '0') {
      this.corner = true;
      return ' ';
    }

    if (this.X == '0') {
      this.corner = true;
      return this.Y;
    }

    if (this.Y == '0') {
      this.corner = true;
      return String.fromCharCode(+this.X + +'A'.charCodeAt(0) - 1);
    }

    if (this.ship == null && this.isHit == true) {
      return 'X';
    }

    if (this.ship != null) {
      return this.ship.className[0];
    }

    return '?';
  }

  //Input
  @Input() X: string = '';
  @Input() Y: string = '';
  @Input() ship: IShip = null;
  @Input() isHit: boolean = false;

  //Variables
  corner: boolean = false;
  text = ''
  cn = '';
  className: string = '';


  ngOnInit(): void {

    this.text = this.renderText();

    this.cn = this.ship != null
    ? this.ship.className[0]
    : '';

    this.className = `Grid ${this.cn} ${this.corner ? 'GridCorner' : ''} ${this.isHit ? 'isHit' : ''} ${this.ship != null ? 'Ship' : ''}`;
  }

  ngOnChanges(): void {
    this.text = this.renderText();

    this.className = `Grid ${this.cn} ${this.corner ? 'GridCorner' : ''} ${this.isHit ? 'isHit' : ''} ${this.ship != null ? 'Ship' : ''}`;
  }
}
