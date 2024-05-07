import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';

const PIPES = [SafeHtmlPipe];

@NgModule({
  declarations: PIPES,
  imports: [CommonModule],
  exports: PIPES,
})
export class PipesModule {}
