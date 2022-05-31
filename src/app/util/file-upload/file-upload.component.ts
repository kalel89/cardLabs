import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  @Output() emiterfigura: EventEmitter<string> = new EventEmitter<string>();

  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable

  // Inject service
  constructor() {}

  ngOnInit(): void {}

  // On file Select
  onChange(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, 'UTF-8');
    fileReader.onload = () => {
      this.emiterfigura.emit(fileReader.result?.toString());
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }

  // OnClick of button Upload
  onUpload() {
    /*this.loading = !this.loading;
		console.log(this.file);
		this.fileUploadService.upload(this.file).subscribe(
			(event: any) => {
				if (typeof (event) === 'object') {

					// Short link via api response
					this.shortLink = event.link;

					this.loading = false; // Flag variable
				}
			}
		);*/
  }
}
