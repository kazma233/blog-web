import { HttpParams } from '@angular/common/http';
import { Tool } from 'src/tool/tool';
import { Query } from 'src/entity/query/query';

export class CommentQuery extends Query {
    nickname: string;
    content: string;
    articleTitle: string;

    public toHttpParams(): HttpParams {
        super.init();

        if (Tool.checkNotEmpty(this.nickname)) {
            this.param = this.param.append("nickname", this.nickname);
        }

        if (Tool.checkNotEmpty(this.content)) {
            this.param = this.param.append("content", this.content);
        }

        if (Tool.checkNotEmpty(this.articleTitle)) {
            this.param = this.param.append("articleTitle", this.articleTitle);
        }

        return this.param;
    }

}