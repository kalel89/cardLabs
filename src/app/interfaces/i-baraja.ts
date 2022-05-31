
import { Ficha } from './i-ficha';
export interface Baraja {
  nombre: string;
  cartas: Ficha[];
  pos_x: number;
  pos_y: number;
  id: number;
}
