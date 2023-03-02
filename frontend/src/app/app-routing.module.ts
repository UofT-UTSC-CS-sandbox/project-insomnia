import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatherGameComponent } from './components/gather-game/gather-game.component';

const routes: Routes = [
  { path: 'gather-game', component: GatherGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
