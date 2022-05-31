export interface ITipoFigura {
  id: number;
  plantilla: string;
  nombre: string;
  pasos: string[];
  parametros: number[];
  generarDibujo(relleno: boolean,colorPintarPrueba: string, texto?: string): string;
}