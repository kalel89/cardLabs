import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ColorPickerModule } from 'ngx-color-picker';
import { NgxColorsModule } from 'ngx-colors';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthInterceptor } from './auth-interceptor';
import { AuthoComponent } from './auth/auth.component';
import { CartaComponent } from './components/carta/carta.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BarajaComponent } from './components/baraja/baraja.component';
import { PanelConfigComponent } from './components/panel-config/panel-config.component';
import { TableroFichasComponent } from './tablero-fichas/tablero-fichas.component';
import { PanelCreacionCartasComponent } from './scenes/panel-creacion-cartas/panel-creacion-cartas.component';
import { FileUploadComponent } from './util/file-upload/file-upload.component';
import { GeneralDialogComponent } from './util/general-dialog/general-dialog.component';

import { GenericTableComponent } from './util/tabla/generic-table/generic-table.component';
import { TableExpandableRowsExample } from './util/tabla/general-tabla/general-tabla.component';
import { PanelCreacionBandejaComponent } from './scenes/panel-creacion-bandeja/panel-creacion-bandeja.component';
import { PanelCargarDatosComponent } from './scenes/panel-cargar-datos/panel-cargar-datos.component';
import { PanelSetteoInicialComponent } from './scenes/panel-setteo-inicial/panel-setteo-inicial.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatNativeDateModule,
    MatSelectModule,
    MatGridListModule,
    MatListModule,
    ColorPickerModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    NgxColorsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatStepperModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    //HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    //)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  declarations: [
    AppComponent,
    MessagesComponent,
    AuthoComponent,
    CartaComponent,
    TableroComponent,
    BarajaComponent,
    PanelConfigComponent,
    TableroFichasComponent,
    PanelCreacionCartasComponent,
    FileUploadComponent,
    GeneralDialogComponent,
    TableExpandableRowsExample,
    PanelCreacionBandejaComponent,
    GenericTableComponent,
    PanelCargarDatosComponent,
    PanelSetteoInicialComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
