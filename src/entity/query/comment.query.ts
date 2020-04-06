import { Query } from './query';
import { HttpParams } from '@angular/common/http';
import { Tool } from 'src/tool/tool';

export class CommentQuery extends Query {
    articleId: string = null;

    public toHttpParams(): HttpParams {
        super.init();

        if (Tool.checkNotEmpty(this.articleId.toString())) {
            this.param = this.param.append("articleId", this.articleId.toString());
        }

        return this.param;
    }

}