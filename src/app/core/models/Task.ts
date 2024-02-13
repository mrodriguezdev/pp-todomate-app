export interface Task {
    id: number;
    title: string;
    description: string;
    creationDate: Date;
    dueDate: Date;
    priority: "Alta" | "Media" | "Baja";
    completed: boolean;
    usuario: string;
}