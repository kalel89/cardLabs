import { Baraja } from './i-baraja';

export interface Juego {
  id: number;
  nombre: string;
  barajas: Baraja[];
}
