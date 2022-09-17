import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Post } from "./interfaces";
import { FbCreateResponse } from "./interfaces";

@Injectable()
export class PostsService {
  constructor(
    private http: HttpClient
  ) { }

  create(post: Post):any {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response:any) => {
          return {
            ...post,
            id: response.name,
            date: new Date(response.date)
          }
        })
      )
  }

}