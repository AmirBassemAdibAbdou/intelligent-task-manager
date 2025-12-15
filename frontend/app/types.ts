export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface TaskInput {
  id?: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}