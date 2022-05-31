import { ITipoFigura } from 'src/app/interfaces/i-tipoFigura';

const listaTipos: ITipoFigura[] = [
  {
    id: 0,
    nombre: 'rectangulo',
    plantilla:
      '<rect  x="[p_x]" y="[p_y]" width="[p_w]" height="[p_h]" fill="[p_c_fill]" stroke="[p_c_stroke]" style="stroke-width:2" />',
    pasos: [
      'Seleccione la esquina superir izquierda',
      'Seleccione la esquina inferior derecha',
    ],
    parametros: [-1, -1, -1, -1],
    generarDibujo(relleno: boolean, colorPintarPrueba: string): string {
      let x_min = Math.min(this.parametros[0], this.parametros[2]),
        y_min = Math.min(this.parametros[1], this.parametros[3]);
      let f = this.plantilla
        .replace('[p_x]', x_min + '')
        .replace('[p_y]', y_min + '')
        .replace(
          '[p_w]',
          Math.abs(this.parametros[0] - this.parametros[2]) + ''
        )
        .replace(
          '[p_h]',
          Math.abs(this.parametros[1] - this.parametros[3]) + ''
        )
        .replace('[p_c_fill]', relleno ? colorPintarPrueba : 'none')
        .replace('[p_c_stroke]', colorPintarPrueba);
      this.parametros = this.parametros.map(() => -1);
      return f;
    },
  },
  {
    id: 1,
    nombre: 'circulo',
    plantilla:
      '<circle cx="[p_x]" cy="[p_y]" r="[p_r]" fill="[p_c_fill]" stroke="[p_c_stroke]" stroke-width="2"/>',
    pasos: [
      'Seleccione el extremo medio izquierdo',
      'Seleccione el extremo medio derecho',
    ],
    parametros: [-1, -1, -1, -1],
    generarDibujo(relleno: boolean, colorPintarPrueba: string): string {
      let x_c = (this.parametros[0] + this.parametros[2]) / 2;
      let y_c = (this.parametros[1] + this.parametros[3]) / 2;
      let x_i = this.parametros[0];
      let y_i = this.parametros[1];
      let radio = Math.sqrt(Math.pow(x_c - x_i, 2) + Math.pow(y_c - y_i, 2));
      let f = this.plantilla
        .replace('[p_x]', x_c + '')
        .replace('[p_y]', y_c + '')
        .replace('[p_r]', radio + '')
        .replace('[p_c_fill]', relleno ? colorPintarPrueba : 'none')
        .replace('[p_c_stroke]', colorPintarPrueba);
      this.parametros = this.parametros.map(() => -1);
      return f;
    },
  },
  {
    id: 2,
    nombre: 'linea',
    plantilla:
      '<line  x1="[p_x1]" y1="[p_y1]" x2="[p_x2]" y2="[p_y2]"' +
      'stroke="[p_c_stroke]" stroke-width="2" />',
    pasos: ['Seleccione el punto de inicio', 'Seleccione el punto de fin'],
    parametros: [-1, -1, -1, -1],
    generarDibujo(relleno: boolean, colorPintarPrueba: string): string {
      let f = this.plantilla
        .replace('[p_x1]', this.parametros[0] + '')
        .replace('[p_y1]', this.parametros[1] + '')
        .replace('[p_x2]', this.parametros[2] + '')
        .replace('[p_y2]', this.parametros[3] + '')
        .replace('[p_c_stroke]', colorPintarPrueba);
      this.parametros = this.parametros.map(() => -1);
      return f;
    },
  },
  {
    id: 3,
    nombre: 'curva',
    plantilla:
      '<polyline  points="[x],[y]" fill="none" stroke="[p_c_stroke]" stroke-width="2" />',
    pasos: ['Seleccione el punto de inicio', 'Seleccione el punto de fin'],
    parametros: [
      -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    ],
    generarDibujo(relleno: boolean, colorPintarPrueba: string): string {
      let f = this.plantilla;
      const tam = this.parametros.filter((xy: number) => xy !== -1).length / 2;
      for (let i = 0; i < tam; i++) {
        f = f
          .replace('[x]', '[p_x1]')
          .replace('[y]', '[p_y1] [x],[y]')
          .replace('[p_x1]', this.parametros[i * 2] + '')
          .replace('[p_y1]', this.parametros[i * 2 + 1] + '');
      }
      f = f.replace('[x],[y]', ' ').replace('[p_c_stroke]', colorPintarPrueba);

      this.parametros = this.parametros.map(() => -1);
      return f;
    },
  },
  {
    id: 4,
    nombre: 'punto',
    plantilla:
      '<circle  cx="[p_x]" cy="[p_y]" r="1" fill="[p_c_stroke]" stroke="[p_c_stroke]" stroke-width="1"/>',
    pasos: ['Seleccione el punto de inicio', 'Seleccione el punto de fin'],
    parametros: [-1, -1],
    generarDibujo(relleno: boolean, colorPintarPrueba: string): string {
      let f = this.plantilla
        .replace('[p_x]', this.parametros[0] + '') //todo logica para curva
        .replace('[p_y]', this.parametros[1] + '')
        .replace('[p_c_stroke]', colorPintarPrueba);
      this.parametros = this.parametros.map(() => -1);
      return f;
    },
  },
  {
    id: 5,
    nombre: 'Texto',
    //plantilla: '<circle cx="[p_x]" cy="[p_y]" r="1" fill="[p_c_stroke]" stroke="[p_c_stroke]" stroke-width="1"/>',
    plantilla:
      '<text  x="[p_x]" y="[p_y]" fill="[p_c_stroke]" stroke-width="1">[p_texto]</text>',
    pasos: ['Seleccione el punto de inicio'],
    parametros: [-1, -1],
    generarDibujo(
      relleno: boolean,
      colorPintarPrueba: string,
      texto: string
    ): string {
      let f = this.plantilla
        .replace('[p_x]', this.parametros[0] + '') //todo logica para curva
        .replace('[p_y]', this.parametros[1] + '')
        .replace('[p_c_stroke]', colorPintarPrueba)
        .replace('[p_texto]', texto);
      this.parametros = this.parametros.map(() => -1);
      return f;
    },
  },
];

export default listaTipos;
