// import { initializeApp, applicationDefault } from "firebase-admin/app";
import { https, Response } from "firebase-functions";

import { getService } from "../services/ProxyService";
import { ResponseBase, ProxyServiceResponse } from "../models/Response";

import { hasToken } from "../middleware/account";

type Req = https.Request;
type Res = Response<any>;
type RequestHandler = (request: Req, response: Res) => void | Promise<void>;

export const proxyController: RequestHandler = async (request: Req, response: Res) => {
    try {
        const tokenStatus = await hasToken(request);
        if (tokenStatus.get().code !== 0) response.send(tokenStatus);
        const method = request.method;
        switch (method) {
        case "GET": {
            const proxyResponse: ProxyServiceResponse | ResponseBase = await getService(request);
            response.send(proxyResponse);
            break;
        }
        default: {
            response.send({ code: 405, message: "Method not support." });
        }
        }
    } catch (error) {
        const errroResponse = new ResponseBase(500, "");
        const message: string = error instanceof Error ? error.message : "Unknown error";
        errroResponse.setMessage(message);
        response.send(errroResponse);
    }
};
