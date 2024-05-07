import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerosRoutingModule } from './heros-routing.module';
import { HerosService } from './services/heros.service';

@NgModule({
  imports: [CommonModule, HerosRoutingModule],
  providers: [HerosService],
})
export class HerosModule {}
