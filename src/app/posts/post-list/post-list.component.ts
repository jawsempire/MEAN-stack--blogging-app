import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { Post } from '../post.model';
import { PostsService } from '../post.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']

})

export class PostListComponent implements OnInit, OnDestroy {
    
    posts: Post[] = [];
    private postsSub: Subscription;

    constructor(public postsService: PostsService) {
        //dependency injection -- remember to add @Injectable to the service
        
    }

    //lifecycle hook
    ngOnInit(){
       this.postsService.getPosts();
       this.postsSub = this.postsService.getPostsUpdatedListener()
        .subscribe((posts: Post[]) => {
            this.posts = posts;
        });
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe(); //removes subscription and prevents memory leaks
    }  
    
}