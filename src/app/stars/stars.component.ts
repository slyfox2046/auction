import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit,OnChanges {
  // 注意输入属性和输出属性的名称要相同 rating
  @Input()
  private rating:number =0;
  @Output()
  private ratingChange : EventEmitter<number> = new EventEmitter();

  private stars :boolean[];
  @Input()
  private readonly :boolean = true;

  constructor() { }

  ngOnInit() {

  }
  ngOnChanges (changes: SimpleChanges): void {
    // 原来代码放在OnInit中，现在放这里是当输入属性rating改变时候，跟新stars的数组
    this.stars=[];
    for (let i=1;i<=5;i++) {
      this.stars.push(i>this.rating)
    }
    // this.stars = [true,true,false,true,true]
  }

  clickStar(index :number){
    //index 是从0开始的
    if (!this.readonly){
      this.rating=index+1;
      this.ngOnInit();
      this.ratingChange.emit(this.rating);
    }
  }

}
