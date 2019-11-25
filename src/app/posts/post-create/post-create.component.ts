import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'

import { PostsService } from '../post.service'



@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']

}
)

export class PostCreateComponent  {
    //property, a variable in the class
    
    enteredTitle = '';
    enteredContent = '';
    

    constructor(public postsService: PostsService ) { }

    onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }       
        this.postsService.addPost(form.value.title, form.value.content)
        form.resetForm();
    }

    
    
    // onAddPost(userText : HTMLTextAreaElement) {
    //     console.dir(userText); //.dir() shows all possible properties for a HTMLTextAreaElement
    //     this.freshPost = userText.value;
    // }
}