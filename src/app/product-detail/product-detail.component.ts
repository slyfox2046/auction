import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterStateSnapshot} from "@angular/router";
import {Product, ProductService,Comment} from "../shared/product.service";
import {WebSocketService} from "../shared/web-socket.service";
import {Subscription} from "rxjs";
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

  isWatched :boolean= false;
  currentBid :number ;

  subscription  :Subscription;
  constructor(private routeInfo:ActivatedRoute,
              private productService:ProductService,
              private wsService:WebSocketService
  ) { }


  ngOnInit() {
    let productId:number = this.routeInfo.snapshot.params.productId;
    console.log("获得productId：",productId);
    //手工订阅
    this.productService.getPdoduct(productId).subscribe(
      product => {
        this.product = product;
        this.currentBid = product.price;
      }
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

  watchProduct(){
    if (this.subscription){
      //取消流的订阅
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription =null;
    }else{
      this.isWatched = true;
      //socket 服务
      this.subscription = this.wsService.createObservableSocket("ws://localhost:8085",this.product.id)
        .subscribe(
          products =>{
            console.log(products);
            // let product =JSON.parse(products).find(p=>p.productId === this.product.id); //原来返回的时候是字符串，需要转换一下
            let product =products.find(p=>p.productId === this.product.id);
            console.log(product);
            this.currentBid = product.bid;
          }
        );
    }

  }

}
