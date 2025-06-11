export interface Report {
    id: number;
    name: string;
    surname: string;
    description: string;
    creationDate: string; // formato ISO 8601
    status: 'Pendiente' | 'Resuelta' | 'Cancelada';
  }