import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterStateSnapshot} from "@angular/router";
import {Product, ProductService,Comment} from "../shared/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // productTitle:string;
  product:Product;
  comments:Comment[];

  constructor(private routeInfo:ActivatedRoute,
              private productService:ProductService) { }

  ngOnInit() {
    let productId:number = this.routeInfo.snapshot.params.productId;
    console.log("获得productId：",productId);
    this.product = this.productService.getPdoduct(productId);

    this.comments = this.productService.getCommentsForProductId(productId);
  }

}
