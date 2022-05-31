import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableroService } from 'src/app/services/tablero.service';

export interface DialogData {
  tituloList1: string;
  list1: IndexDescription[];
  indexSelected1: number;
  tituloList2: string;
  list2: IndexDescription[];
  indexSelected2: number;
  tituloText1: string;
  text1: string;
  tituloText2: string;
  text2: string;
  tituloText3: string;
  text3: string;
}

export interface IndexDescription {
  index: number;
  description: string;
}

@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.css'],
})
export class GeneralDialogComponent {
  public selected = 0;
  public nombre = '';
  public internData: DialogData;
  constructor(
    public dialogRef: MatDialogRef<GeneralDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.internData = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
