import { Component } from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: 'app-noDataError',
  templateUrl: './noDataError.component.html',
  styleUrls: ['./noDataError.component.scss']
})
export class NoDataErrorComponent {

  public GoBackToRoot = () => this.router.navigate(['/']);

  constructor(private router: Router) {}
}
