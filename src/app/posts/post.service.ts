import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'; //allows for event driven features; observables


import { Post } from './post.model';


@Injectable({providedIn: 'root'})
export class PostsService {
   private posts: Post[] = [];
   private postsUpdated = new Subject<Post[]>();

   constructor(private http: HttpClient) {}

   getPosts() {
    //good idea to return a copy of posts because it prevents un wanted
    //manipulation of posts in the components that use this service   
   
    // return [...this.posts]; //spread operator to send a copy of the array 

    //here, we don't unsubscribe because http is part of angular already and 
    //angular handles this for us.
    //get extracts and formats the data (from json to javascript)
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
            .subscribe((postData) => {
               this.posts = postData.posts;
               this.postsUpdated.next([...this.posts]);
            });

    
   }

   getPostsUpdatedListener() {
       return this.postsUpdated.asObservable();
   }

   addPost(title: string, content: string) {
       //initially have no id -- hasn't been created on the server yet
       const post: Post = {id: null, title : title, content : content}
       this.http.post<{message:string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
            console.log(responseData.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
       
   }

}

