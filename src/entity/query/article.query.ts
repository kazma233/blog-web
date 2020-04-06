import { Query } from './query';
import { HttpParams } from '@angular/common/http';

export class ArticleQuery extends Query {

    public toHttpParams(): HttpParams {
        super.init();

        return this.param;
    }

}