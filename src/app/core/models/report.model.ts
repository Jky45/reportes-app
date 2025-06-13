export enum ReportStatus {
  Pendiente = 'Pendiente',
  Resuelta = 'Resuelta',
  Cancelada = 'Cancelada'
}

export interface Report {
    id: number;
    name: string;
    surname: string;
    description: string;
    creationDate: string; 
    status: ReportStatus;
  }