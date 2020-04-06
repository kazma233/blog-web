import { HttpParams } from '@angular/common/http';
import { Tool } from 'src/tool/tool';
import { Query } from 'src/entity/query/query';

export class ArticleQuery extends Query {
    categoryId: string;

    title: string;
    articleState: string;
    archiveDate: string;
    year: string;

    public toHttpParams(): HttpParams {
        super.init();

        if (Tool.checkNotEmpty(this.categoryId)) {
            this.param = this.param.append("categoryId", this.categoryId);
        }

        if (Tool.checkNotEmpty(this.title)) {
            this.param = this.param.append("title", this.title);
        }

        if (Tool.checkNotEmpty(this.articleState)) {
            this.param = this.param.append("articleState", this.articleState);
        }

        if (Tool.checkNotEmpty(this.year)) {
            this.param = this.param.append("year", this.year);
        }
        return this.param;
    }
}