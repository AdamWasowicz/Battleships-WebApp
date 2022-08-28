import { Component} from "@angular/core";
import { Router } from "@angular/router";


@Component({
  selector: 'app-noDataError',
  templateUrl: './noDataError.component.html',
  styleUrls: ['./noDataError.component.scss']
})
export class NoDataError {

  constructor(private router: Router) {}

  public goBackToRoot = () => this.router.navigate(['/']);
}
