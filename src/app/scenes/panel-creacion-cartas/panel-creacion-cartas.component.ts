import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ficha } from '../../interfaces/i-ficha';
import { MatDialog } from '@angular/material/dialog';
import * as configuracionesPanel from '../../util/interfaces/tipo-figura';
import { Graficos } from 'src/app/interfaces/i-graficos';
import { TableroService } from 'src/app/services/tablero.service';
import {
  IndexDescription,
  GeneralDialogComponent,
} from 'src/app/util/general-dialog/general-dialog.component';
import { MatStepper } from '@angular/material/stepper';
import { Directionality } from '@angular/cdk/bidi';
import crearArchivo from 'src/app/util/interfaces/cargar-archivo-utils';
import Util from 'src/app/util/interfaces/cargar-archivo-utils';

@Component({
  selector: 'app-panel-creacion-cartas',
  templateUrl: './panel-creacion-cartas.component.html',
  styleUrls: ['./panel-creacion-cartas.component.css'],
})
export class PanelCreacionCartasComponent implements OnInit, AfterViewInit {
  @ViewChild('misvg') misvg: ElementRef;
  @ViewChild('stepper') public myStepper: MatStepper;
  texto = '';
  relleno = false;
  vista_previa = false;
  panelOpenState = false;
  message = 'Empty';
  selected = 0;
  mensajes = 0;
  colorPintarOficial = 'RoyalBlue';
  colorPintarPrueba = 'RoyalBlue';
  listaTipos = configuracionesPanel.default;

  ficha_modelo: Ficha = {
    id: 0,
    nombre: 'vacio',
    anverso: '',
    reverso: '',
    x: 50,
    y: 270,
    width: 1000,
    height: 600,
    zindex: 0,
    estado: '1',
    reversoGrafico: [],
    anversoGrafico: [],
    inmovible: 0,
    insubible: 0,
  };

  setLadoFicha(lado: string) {
    if (this.ficha_modelo.estado === '1') {
      this.ficha_modelo.anverso = lado;
    } else {
      this.ficha_modelo.reverso = lado;
    }
    this.ficha_modelo = JSON.parse(JSON.stringify(this.ficha_modelo));
  }

  crearArchivoPropiedad(nombre: string, blob: any) {
    Util.crearArchivo(nombre, blob);
  }

  voltear() {
    this.ficha_modelo.estado = this.ficha_modelo.estado === '1' ? '0' : '1';
    this.renderizado();
  }

  getParametros(): boolean[] {
    if (this.selected != -1) {
      let arr: boolean[] = [];
      this.listaTipos[this.selected].parametros.forEach(
        (value: number, index: number, arrat: number[]) => {
          if (index % 2 === 0) {
            arr.push(value === -1);
          }
        }
      );
      return arr;
    }
    return [];
  }

  accionTipoFigura(index: number) {
    if (index === this.listaTipos[5].id) {
      this.popupTextoParaPintar();
    }
  }

  setLadoFichaMeta(lado: Graficos[]) {
    if (this.ficha_modelo.estado === '1') {
      this.ficha_modelo.anversoGrafico = JSON.parse(JSON.stringify(lado));
    } else {
      this.ficha_modelo.reversoGrafico = JSON.parse(JSON.stringify(lado));
    }
  }

  getListaGraficos(): Graficos[] {
    return this.ficha_modelo.estado === '1'
      ? this.ficha_modelo.anversoGrafico
      : this.ficha_modelo.reversoGrafico;
  }

  listaDibujo: Graficos[] = [
    {
      codigo:
        '<svg border="black" width="' +
        this.ficha_modelo.width +
        'px" height="' +
        this.ficha_modelo.height +
        'px" viewBox="0 0 ' +
        this.ficha_modelo.width +
        ' ' +
        this.ficha_modelo.height +
        '">',
      dibujar: true,
      estado: 'guardado',
      id: 0,
      parametros: [],
      idTipoFigura: -1,
    },
    {
      codigo: '</svg>',
      dibujar: true,
      estado: 'guardado',
      id: 1,
      parametros: [],
      idTipoFigura: -1,
    },
  ];

  @HostListener('dblclick', ['$event'])
  clickEvent(event: any) {
    this.agregarfigura();
  } 

  constructor(public dialog: MatDialog, public tableroService: TableroService) {
    this.selected = -1;
    this.misvg = new ElementRef('');
    this.setLadoFichaMeta(this.listaDibujo);
    this.ficha_modelo.estado = '0';
    this.setLadoFichaMeta(this.listaDibujo);
    this.myStepper = MatStepper.prototype;
  }

  pasosProgresion(select: number, paso: number) {
    return this.listaTipos[select].parametros[paso * 2] > -1 ? 'green' : 'red';
  }

  duplicar(indexOriginal: Graficos) {
    const variacion = 3;
    if (indexOriginal.id > 1) {
      let index = JSON.parse(JSON.stringify(indexOriginal));
      for (let i = 1; i < index.parametros.length; i = i + 2) {
        index.parametros[i] = index.parametros[i] + variacion;
        index.parametros[i + 1] = index.parametros[i] + variacion;
      }

      let figuraConcreta = this.listaTipos[index.idTipoFigura];
      figuraConcreta.parametros = index.parametros;
      index.codigo = figuraConcreta.generarDibujo(
        this.relleno,
        this.colorPintarPrueba,
        this.texto
      );
      index.id = Util.getNextIndex(this.getListaGraficos());
      this.getListaGraficos().push(index);
      this.renderizado();
    } else {
      alert('no puedes eliminar el marco');
    }
  }

  mover(index: Graficos, move: string) {
    const variacion = 3;
    if (index.id > 1) {
      switch (move) {
        case '1':
          for (let i = 1; i < index.parametros.length; i = i + 2) {
            index.parametros[i] = index.parametros[i] - variacion;
          }
          break;
        case '2':
          for (let i = 1; i < index.parametros.length; i = i + 2) {
            index.parametros[i] = index.parametros[i] + variacion;
          }
          break;
        case '3':
          for (let i = 0; i < index.parametros.length; i = i + 2) {
            index.parametros[i] = index.parametros[i] + variacion;
          }
          break;
        case '4':
          for (let i = 0; i < index.parametros.length; i = i + 2) {
            index.parametros[i] = index.parametros[i] - variacion;
          }
          break;
      }

      let figuraConcreta = this.listaTipos[index.idTipoFigura];
      figuraConcreta.parametros = index.parametros;
      index.codigo = figuraConcreta.generarDibujo(
        this.relleno,
        this.colorPintarPrueba,
        this.texto
      );
      this.renderizado();
    } else {
      alert('no puedes eliminar el marco');
    }
  }

  ngAfterViewInit() {
    this.renderizado();
  }
  ngOnInit(): void {}

  private renderizado(): void {
    let pintada =
      '<svg border="black" width="' +
      this.ficha_modelo.width +
      ' " height="' +
      this.ficha_modelo.height +
      ' " viewBox="0 0 ' +
      this.ficha_modelo.width +
      ' ' +
      this.ficha_modelo.height +
      '">';
    const size = this.getListaGraficos().length;
    for (var i = 2; i < size; i++) {
      if (this.getListaGraficos()[i].dibujar) {
        pintada = pintada + this.getListaGraficos()[i].codigo;
      }
    }
    pintada = pintada + '</svg>';
    this.misvg.nativeElement.innerHTML = pintada;
    this.setLadoFicha(pintada);
  }

  click(algo: any) {
    //debugger;
    let x = algo.layerX;
    let y = algo.layerY;
    if (this.selected > -1) {
      let sise = this.listaTipos[this.selected].parametros.length / 2;
      let i = 0;
      for (; i < sise; i++) {
        if (this.listaTipos[this.selected].parametros[i * 2] === -1) {
          this.listaTipos[this.selected].parametros[i * 2] = x;
          this.listaTipos[this.selected].parametros[i * 2 + 1] = y;
          break;
        }
      }
      this.myStepper.next();
      if (i + 1 === sise) {
        this.agregarfigura();
      }
    }
  }

  onmouseup(algo: any) {}

  onmousedown(algo: any) {}

  eliminarFiguraDeLaLista(index: Graficos) {
    if (index.id > 1) {
      this.setLadoFichaMeta(
        this.getListaGraficos().filter((g) => g.id != index.id)
      );
      this.renderizado();
    } else {
      alert('no puedes eliminar el marco');
    }
  }

  agregarfigura() {
    if (this.selected > -1) {
      let f = this.obtenerNuevaFigura();
      f.id = Util.getNextIndex(this.getListaGraficos());
      this.getListaGraficos().push(f);
      console.log('this.getListaGraficos()');
      console.log(this.getListaGraficos());
      this.renderizado();
      this.myStepper.reset();
    } else {
      alert('No has seleccionado una figura pra dibujar');
    }
  }

  ocultarFigura(index: Graficos) {
    if (index.id > 1) {
      index.dibujar = !index.dibujar;
      this.renderizado();
    } else {
      alert('no puedes eliminar el marco');
    }
  }

  cargarFile(obj: string) {
    try {
      let graficos: Graficos[] = JSON.parse(obj ? obj : '');
      let size = this.getListaGraficos().length;
      graficos = graficos
        .filter((x) => x.id > 1)
        .map((y) => {
          return { ...y, id: (y.id = size + y.id) } as Graficos;
        });
      graficos = this.getListaGraficos().concat(graficos);
      this.setLadoFichaMeta(graficos);
      this.renderizado();
      return;
    } catch (e: any) {
      console.log('no fue una imagen');
    }
    try {
      let f: Ficha = JSON.parse(obj ? obj : '');
      this.ficha_modelo = f;
      this.renderizado();
      return;
    } catch (e: any) {}
    alert('No graficos');
  }

  obtenerNuevaFigura(): Graficos {
    let figuraConcreta = this.listaTipos[this.selected];
    let idTipoFigura = this.selected;
    let parametrosGuardar = JSON.parse(
      JSON.stringify(figuraConcreta.parametros)
    );
    let figura = figuraConcreta.generarDibujo(
      this.relleno,
      this.colorPintarPrueba,
      this.texto
    );
    return {
      codigo: figura,
      dibujar: true,
      estado: 'grabado',
      id: -1,
      parametros: parametrosGuardar,
      idTipoFigura: idTipoFigura,
    };
  }

  subir(figura: Graficos): void {
    let index = this.getListaGraficos().indexOf(figura);
    if (index > 2) {
      let a = this.getListaGraficos()[index - 1];
      this.getListaGraficos()[index - 1] = figura;
      this.getListaGraficos()[index] = a;
      this.renderizado();
    } else {
      alert('no se puede subir mas');
    }
  }

  popupTextoParaPintar(): void {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '500px',
      data: { text1: this.texto ? this.texto : 'ingresa texto' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.texto = result.text1;
    });
  }

  popupNombreDeFicha(): void {
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '500px',
      data: {
        text1: this.texto ? this.texto : 'Ingresa el nombre de la ficha:',
      },
    });

    dialogRef.afterClosed().subscribe((nombre) => {
      this.ficha_modelo.nombre = nombre;
      Util.crearArchivo(nombre, this.ficha_modelo);
    });
  }

  popupSeleccionBaraja(): void {
    let listaBandeja: IndexDescription[] = [
      this.tableroService.barajaMaestra,
    ].map((x) => {
      return { index: x.id, description: x.nombre } as IndexDescription;
    });
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '500px',
      data: {
        tituloList1: 'Seleccione una baraja',
        tituloText1: 'Ingrese un nombre',
        list1: listaBandeja,
        text1: 'Ingrese un nombre',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.indexSelected1 >= 0) {
        this.ficha_modelo.nombre = result.text1;
        this.tableroService.addFichaABarajaMaestra(this.ficha_modelo);
      } else {
        alert('Se necesita una baraja para guardar la ficha dentro.');
      }
    });
  }
}
