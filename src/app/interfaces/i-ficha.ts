import { Graficos } from './i-graficos';

export interface Ficha {
  id: number;
  nombre: string;
  zindex: number;
  estado: string;
  reverso: string;
  anverso: string;
  reversoGrafico: Graficos[];
  anversoGrafico: Graficos[];
  x: number;
  y: number;
  width: number;
  height: number;
  inmovible: number;
  insubible: number;
}
