import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private loadingService = inject(LoadingService);
  private detectRef = inject(ChangeDetectorRef);
  isLoading = false;
  title = 'quick-test';

  ngOnInit(): void {
    this.loadingService.isLoading.subscribe((value)=> {
      this.isLoading = value;
      this.detectRef.detectChanges();
    })
  }
}
