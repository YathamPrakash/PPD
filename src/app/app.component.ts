import { Component ,inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './Shared/components/loader/loader.component';
import { CommonService } from './Services/common.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PPD';
  isLoading=false;
   
   constructor(private commonservice: CommonService) {
     this.isLoading = this.commonservice.isLoading();
   }
}
