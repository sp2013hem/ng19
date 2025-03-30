import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Order, QueryFilter, Todo } from './model/todo.model';
import { computed, inject } from '@angular/core';
import { ApiService } from './api.service';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  value: string | null;
  selectedTodo: Todo | null;
  refiners: {
    query: QueryFilter;
    order: Order;
  };
}

const intialState: TodosState = {
  todos: [],
  value: null,
  loading: false,
  selectedTodo: null,
  refiners: { query: QueryFilter.ALL, order: Order.ASC },
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(intialState),
  withComputed(({ todos, refiners }) => ({
    count: computed(() => todos().length),
    completedCount: computed(
      () => todos().filter((todo) => todo.completed).length
    ),
    incompletedCount: computed(
      () => todos().filter((todo) => !todo.completed).length
    ),
    refinedTodos: computed(() => {
      const direction = refiners().order === Order.ASC ? 1 : -1;
      const temp = todos().sort(
        (a, b) => direction * a.title.localeCompare(b.title)
      );

      if (refiners().query === QueryFilter.ALL) {
        return temp;
      }
      if (refiners().query === QueryFilter.COMPLETED) {
        return temp.filter((todo) => todo.completed);
      }
      if (refiners().query === QueryFilter.INCOMPLETED) {
        return temp.filter((todo) => !todo.completed);
      }
      return temp;
    }),
  })),
  withMethods((store, as = inject(ApiService)) => ({
    load: async () => {
      patchState(store, { loading: true });

      const todos = await as.getTodos();

      patchState(store, { todos: [...todos], loading: false });
    },
    toggle: async (id: number) => {
      patchState(store, { loading: true });

      await as.toggleTodo(id);
      const todos = await as.getTodos();

      patchState(store, { todos: [...todos], loading: false });
    },
    setValue: async (value: any) => {
      if (!value.target.value) {
        return;
      }
      patchState(store, { loading: true });
      const todo = await as.addTodo(value.target.value);
      patchState(store, {
        todos: [...store.todos(), todo],
        loading: false,
        value: '',
      });
    },
    setQuery: async (type: QueryFilter) => {
      patchState(store, {
        todos: [],
        loading: true,
      });

      const todos = await as.getTodos();

      patchState(store, {
        todos: [...todos],
        loading: false,
        refiners: { ...store.refiners(), query: type },
      });
    },
  }))
);
