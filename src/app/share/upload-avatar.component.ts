import { Component, ElementRef, Renderer, ViewChild, EventEmitter, Input,  Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'http://test.irenmai.top/index.php?s=/Home/Test/saveImg';

@Component({
    selector: 'app-avatar-upload',
    template: `
  <div [hidden]="status==0?false:true" class="weui-uploader__input-box">
    <input id="uploaderInput" 
            #fileInput
            ng2FileSelect 
            [uploader]="uploader" 
            class="weui-uploader__input" 
            type="file" (change)="getImgUrl()" accept="image/*"  />
  </div>
  <div *ngFor="let item of uploader.queue"  [hidden]="status==0?true:false">
  <li *ngIf="item.isError" class="weui-uploader__file weui-uploader__file_status"  
  (click)="alterAvatar(fileInput)" 
  [ngStyle]="{'background-image': 'url(' + filePreviewPath.changingThisBreaksApplicationSecurity + ')'}">
      <div class="weui-uploader__file-content">
           <i class="weui-icon-warn"></i>
      </div>
  </li>
  <li *ngIf="item.isUploading" class="weui-uploader__file weui-uploader__file_status" 
  [ngStyle]="{'background-image': 'url(' + filePreviewPath.changingThisBreaksApplicationSecurity + ')'}">
      <div class="weui-uploader__file-content">{{uploader.progress}}%</div>
  </li>
  <li *ngIf="item.isSuccess" class="weui-uploader__file" (click)="alterAvatar(fileInput)"
  [ngStyle]="{'background-image': 'url(' + filePreviewPath.changingThisBreaksApplicationSecurity + ')'}"></li>
  </div>
  <li *ngIf="preImgUrl" class="weui-uploader__file" (click)="alterAvatar(fileInput)"
  [ngStyle]="{'background-image': 'url(' + preImgUrl + ')'}"></li>
  `
})

export class UploadAvatarComponent {
    @Input() status: number ;
    @Input() preImgUrl: string = null;

    @Output() res = new EventEmitter<any>();
    public uploader: FileUploader = new FileUploader({ url: URL });
    public filePreviewPath: SafeUrl;
    @ViewChild('fileInput') fileInput: ElementRef;
    constructor(
        private sanitizer: DomSanitizer,
        private renderer: Renderer
        ) {
            this.uploader.onAfterAddingFile = (fileItem) => {
            this.filePreviewPath  = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
            };
    }

    getImgUrl() {
        this.status = 1;
        this.preImgUrl = null;
        this.uploader.queue[0].upload();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.res.emit(response);
          //  console.log('ImageUpload:uploaded:', item, status, response);
        };
        // console.log( this.filePreviewPath );
    }

    alterAvatar(fileInput: Element) {
        // from http://stackoverflow.com/a/32010791/217408
        let event = new MouseEvent('click', {bubbles: true});
        this.renderer.invokeElementMethod(
            this.fileInput.nativeElement, 'dispatchEvent', [event]);
        }

}

