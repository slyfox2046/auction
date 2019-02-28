import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from "../shared/product.service";
import {FormControl,FormGroup} from "@angular/forms";
// import 'rxjs/Rx';
import {debounceTime} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // private products:Array<Product>;
  private products:Observable<Product[]>; // 这里改成了流

  // private keyword:string ;

  private titleFilter:FormControl = new FormControl();

  private imgUrl = "http://placehold.it/320x150";

  constructor(private productService :ProductService) {
/*
    this.titleFilter.valueChanges
    // .debounceTime(500)
    .pipe(debounceTime(500))
      .subscribe(
        value => this.keyword= value
      );
*/




  }

  ngOnInit() {
    // this.products = [
    //   new Product(1,"第一个商品",1.99,3.5,"这是第1个商品，是我在学习慕课网Angular入门实战时创建的",["电子产品","硬件设备"]),
    //   new Product(2,"第二个商品",2.99,2.5,"这是第2个商品，是我在学习慕课网Angular入门实战时创建的",["图书"]),
    //   new Product(3,"第三个商品",3.99,4.5,"这是第3个商品，是我在学习慕课网Angular入门实战时创建的",["硬件设备"]),
    //   new Product(4,"第四个商品",4.99,1.5,"这是第4个商品，是我在学习慕课网Angular入门实战时创建的",["电子产品","硬件设备"]),
    //   new Product(5,"第五个商品",5.99,3.5,"这是第5个商品，是我在学习慕课网Angular入门实战时创建的",["电子产品"]),
    //   new Product(6,"第六个商品",6.99,2.5,"这是第6个商品，是我在学习慕课网Angular入门实战时创建的",["图书"])
    //
    // ]
    // this.products.push(new Product(7,"第七个商品",4.99,3.5,"这是第7个商品，是我在学习慕课网Angular入门实战时创建的",["图书"]) )

  this.products = this.productService.getProducts();

  //订阅search按钮的流
    this.productService.searchEvent.subscribe(
      params=>this.products = this.productService.search(params)
    );
  }



}


