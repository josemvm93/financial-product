import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { LoadingComponent } from '../loading/loading.component';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LoadingComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(private loadingService: LoadingService) {}

  get loading$(): Observable<boolean> {
    return this.loadingService.loading$;
  }
}
