import { HttpParams } from '@angular/common/http';

export class Query {
    param: HttpParams;
    
    pageNo: number = 1;

    public init() {
        this.param = new HttpParams();

        this.param = this.param.append("pageNo", this.pageNo.toString());
    }


}