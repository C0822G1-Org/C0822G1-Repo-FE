import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../service/blog.service';
import {Blog} from '../../entity/blog/blog';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  pageBlog: Blog[] = [];
  pageNumber: number = 0;
  totalPage: number = 0;
  blog: Blog = {};

  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(ok => {
      const id = ok.get('id');
      if (id != null) {
        this.blogService.findById(parseInt(id)).subscribe(data => {
          this.blog = data;
        });
      }
    });
  }


  ngOnInit(): void {
    this.getAllBlog();
  }

  getAllBlog() {
    this.blogService.getAllPage(this.pageNumber).subscribe(data => {
      this.pageBlog = data.content;
      console.log(this.pageBlog);
      this.pageNumber = data.number;
    });
  }


}
