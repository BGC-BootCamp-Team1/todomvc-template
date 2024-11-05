import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() size: number = 40;
  @Input() boderSize: number = 15

  get boderTop():string{
      return `${this.boderSize}px solid rgb(176, 223, 127)`;
  }

  get boder():string{
    return `${this.boderSize}px solid #f3f3f3`;
  }

}
