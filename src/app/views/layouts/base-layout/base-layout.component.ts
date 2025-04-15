import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  imports: [RouterOutlet],
  templateUrl: './base-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseLayoutComponent { }
