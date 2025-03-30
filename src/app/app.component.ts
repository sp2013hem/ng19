import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ListComponent } from './list/list.component';
import { ApiService } from './api.service';
import { TodoStore } from './todo.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { QueryFilter } from './model/todo.model';
import { TitleCasePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ListComponent,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    TitleCasePipe,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly filter = Object.values(QueryFilter);
  readonly store = inject(TodoStore);
  readonly as = inject(ApiService);

  ngOnInit(): void {
    this.store.load();
  }
}
