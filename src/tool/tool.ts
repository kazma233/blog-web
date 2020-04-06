import { HttpHeaders } from '@angular/common/http';

export class Tool {

  public static AUTH_NAME = "auth";
  
  // 判空
  public static checkNotEmpty(val: any): boolean {
    return val != null && val !== '' && val !== undefined;
  }

  // 获得随机数
  public static getRandomNum(Min, Max): Number {
    const Range = Max - Min;
    const Rand = Math.random();
    return (Min + Math.round(Rand * Range));
  }

  public static dataToString(v: Date): string {
    if (v === null) {
      return '';
    }
    const year = v.getFullYear();
    const month = v.getMonth() + 1;
    const day = v.getDate();

    const date = year + '-' + this.check(month) + '-' + this.check(day);

    return date;
  }

  private static check(val): string {
    if (val < 10) {
      val = '0' + val;
    }
    return val;
  }

  public static getDefaultHeaders(): HttpHeaders {
    var headers = new HttpHeaders();

    var auth = localStorage.getItem(this.AUTH_NAME);
    if (!this.checkNotEmpty(auth)) {
      return headers;
    }

    return headers.append(this.AUTH_NAME, auth);
  }
  
}
