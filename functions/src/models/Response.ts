export class ResponseBase {
    constructor (private code: number, private message: string) {}
    setMessage (this: ResponseBase, message: string) {
        this.message = message;
    }
    setCode (this: ResponseBase, code: number) {
        this.code = code;
    }
    get () {
        return { code: this.code, message: this.message };
    }
}

export class ProxyServiceResponse extends ResponseBase {
    data: any;
    constructor (code: number, message: string, data?: any) {
        super(code, message);
        this.data = data;
    }
}

export class PlanResponse extends ResponseBase {
    data: any;
    constructor (code: number, message: string, data?: any) {
        super(code, message);
        this.data = data;
    }
}

export class UserTokenResponse extends ResponseBase {
    data: any;
    constructor (code: number, message: string, data?: any) {
        super(code, message);
        this.data = data;
    }
}
