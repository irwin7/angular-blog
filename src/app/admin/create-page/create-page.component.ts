import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces';
import * as CustomBuild from 'src/app/shared/ckeditor5/build/ckeditor';
import { PostsService } from 'src/app/shared/posts.service';



@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup | any

  public Editor = CustomBuild;

  constructor(
    private postsSerice: PostsService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required, ),
      author: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date()
    }
    this.postsSerice.create(post).subscribe(() =>{
      this.form.reset()
    })
    console.log(post);
    

  }

}
