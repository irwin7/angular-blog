import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  imports:[
    HttpClientModule,
    CKEditorModule
  ],
  exports:[
    HttpClientModule,
    CKEditorModule
  ]
})

export class SharedModule {}