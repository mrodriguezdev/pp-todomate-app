export interface NewTask {
    title: string;
    description: string;
    creationDate: string;
    dueDate: string;
    priority: "Alta" | "Media" | "Baja";
    usuario: string;
}