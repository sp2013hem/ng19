export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
}
export enum QueryFilter {
  ALL = 'all',
  COMPLETED = 'completed',
  INCOMPLETED = 'incompleted',
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}
