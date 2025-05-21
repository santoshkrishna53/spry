export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    dueDate: Date;
}  