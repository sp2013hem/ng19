import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { TodoStore } from '../todo.store';

@Component({
  selector: 'list',
  imports: [MatSelectionList, MatListOption],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  readonly store = inject(TodoStore);
}
