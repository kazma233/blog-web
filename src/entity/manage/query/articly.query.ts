import { HttpParams } from '@angular/common/http';
import { Tool } from 'src/tool/tool';
import { Query } from 'src/entity/query/query';

export class ArticleQuery extends Query {

    id: string;
    title: string;
    tags: string;
    category: string;
    status: string;

    public toHttpParams(): HttpParams {
        super.init();

        if (Tool.checkNotEmpty(this.category)) {
            this.param = this.param.append("category", this.category);
        }

        if (Tool.checkNotEmpty(this.id)) {
            this.param = this.param.append("id", this.id);
        }

        if (Tool.checkNotEmpty(this.title)) {
            this.param = this.param.append("title", this.title);
        }

        if (Tool.checkNotEmpty(this.tags)) {
            this.param = this.param.append("tags", this.tags);
        }

        if (Tool.checkNotEmpty(this.status)) {
            this.param = this.param.append("status", this.status);
        }
        
        return this.param;
    }
}