import { Component, Input, OnInit, inject } from '@angular/core';
import { IconsLoadService } from './services/icons-load.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent implements OnInit {
  @Input() name = '';
  @Input() size = '16';
  svgContent = '';
  private iconsLoadService = inject(IconsLoadService);

  ngOnInit(): void {
    this.loadIcon();
  }

  private loadIcon(): void {
    if (this.name) {
      this.iconsLoadService.getIcon(this.name).subscribe((svg: string) => {
        this.svgContent = svg;
        this.size = this.size + 'px';
      });
    }
  }
}
