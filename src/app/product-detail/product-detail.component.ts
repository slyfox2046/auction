import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterStateSnapshot} from "@angular/router";
import {Product, ProductService,Comment} from "../shared/product.service";
// import {Observable} from "rxjs";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // productTitle:string;
  product:Product;
  comments:Comment[];

  newRating :number =5;
  newComment :string ="";

  isCommentHidden = true;

  constructor(private routeInfo:ActivatedRoute,
              private productService:ProductService) { }

  ngOnInit() {
    let productId:number = this.routeInfo.snapshot.params.productId;
    console.log("获得productId：",productId);
    //手工订阅
    this.productService.getPdoduct(productId).subscribe(
      product => this.product = product
    );

    this.productService.getCommentsForProductId(productId).subscribe(
      comments => this.comments = comments
    );
  }

  addComment(){
    let comment = new Comment(0,this.product.id,new Date().toISOString(),"SomeOne",this.newRating,this.newComment);
    this.comments.unshift(comment);

    let sum = this.comments.reduce((sum,comment)=>sum+comment.rating,0);
    this.product.rating = sum/this.comments.length;

    //恢复成默认值
    this.newComment= null;
    this.newRating = 5;

  //  提交后算平均星集


  }

}
