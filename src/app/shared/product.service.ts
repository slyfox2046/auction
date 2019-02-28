import { Injectable } from '@angular/core';

import {Observable} from "rxjs";
// import {HttpClient} from "@angular/common/http";
// import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private products :Product[] = [
  //   new Product(1,"第一个商品",1.99,3.5,"这是第1个商品，是我在学习慕课网Angular入门实战时创建的",["电子产品","硬件设备"]),
  //   new Product(2,"第二个商品",2.99,2.5,"这是第2个商品，是我在学习慕课网Angular入门实战时创建的",["图书"]),
  //   new Product(3,"第三个商品",3.99,4.5,"这是第3个商品，是我在学习慕课网Angular入门实战时创建的",["硬件设备"]),
  //   new Product(4,"第四个商品",4.99,1.5,"这是第4个商品，是我在学习慕课网Angular入门实战时创建的",["电子产品","硬件设备"]),
  //   new Product(5,"第五个商品",5.99,3.5,"这是第5个商品，是我在学习慕课网Angular入门实战时创建的",["电子产品"]),
  //   new Product(6,"第六个商品",6.99,2.5,"这是第6个商品，是我在学习慕课网Angular入门实战时创建的",["图书"]),
  //   new Product(7,"第七个商品",4.99,3.5,"这是第7个商品，是我在学习慕课网Angular入门实战时创建的",["图书"])
  // ];

  // private  comments :Comment[] =[
  //   new Comment(1,1,"2018-07-1 22:22:23" ,"张三",3,"东西不错"),
  //   new Comment(2,1,"2018-08-1 22:22:23" ,"李四",4,"东西很不错"),
  //   new Comment(3,1,"2018-09-1 22:22:23" ,"王五",2,"东西确实不错"),
  //   new Comment(4,2,"2018-10-1 22:22:23" ,"赵六",4,"东西的确不错"),
  // ];


  constructor(private  http:HttpClient) { }


  getAllCategories():string[]{
    return ["电子产品","硬件设备","图书"];
  }

  // getProducts():Product[]{
  //   return this.products;
  // }
  // getProducts():Observable<Product[]>{
  //   return this.http.get("/api/products").map(res=>res.json());   // 这个方式大概太老了
  // }
  getProducts():Observable<Product[]>{
    // return this.http.get("/api/products").pipe(map((res:any)=>res.json()));
    return this.http.get<Product[]>("/api/products");
  }

  //根据商品id，方法相应的商品
  // getPdoduct(id:number):Product {
  //   return this.products.find((product)=>product.id==id);
  // }

  getPdoduct(id:number):Observable<Product> {
    // return this.http.get("/api/product/"+id).pipe(map((res:any)=>res.json()));
    // return this.http.get<any>("/api/product/"+id);    //这条也可以
    return this.http.get<Product>("/api/product/"+id);
  }

  // getCommentsForProductId(id:number):Comment[]{
  //   return this.comments.filter((comment:Comment)=>comment.productId == id);
  // }
  getCommentsForProductId(id:number):Observable<Comment[]>{
    // return this.http.get("/api/product/"+id+"/comments").pipe(map((res:any)=>res.json()));
    return this.http.get<Comment[]>("/api/product/"+id+"/comments");
  }
}

export class Product {
  constructor(
    public  id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>

  ){
  }
}

export class Comment {
  constructor(public id :number,
              public productId:number,
              public timestamp:string,
              public user:string,
              public rating:number,
              public content:string){

  }
}



