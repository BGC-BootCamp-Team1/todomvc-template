import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reloadable-area',
  templateUrl: './reloadable-area.component.html',
  styleUrl: './reloadable-area.component.css'
})
export class ReloadableAreaComponent {
  @Input() size = 30;
  @Input() loading = false;
}
