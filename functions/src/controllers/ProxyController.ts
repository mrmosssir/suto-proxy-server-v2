// import { initializeApp, applicationDefault } from "firebase-admin/app";
import { https, Response } from "firebase-functions";

/* eslint-disable */
const cors = require("cors")({ origin: true });

import { getProxyListService, addProxyService, deleteProxyService, getService } from "../services/ProxyService";
import { ResponseBase, ProxyServiceResponse } from "../models/Response";

import { hasToken } from "../middleware/account";

type Req = https.Request;
type Res = Response<any>;
type RequestHandler = (request: Req, response: Res) => void | Promise<void>;

export const proxyListController: RequestHandler = async (request: Req, response: Res) => {
    await cors(request, response, async () => {
        try {
            const uid = request.params[0].replace("api/proxy-list/", "");
            const proxyListResponse = await getProxyListService(uid);
            response.send(proxyListResponse);
        } catch (error) {
            const errroResponse = new ResponseBase(500, "");
            const message: string = error instanceof Error ? error.message : "Unknown error";
            errroResponse.setMessage(message);
            response.send(errroResponse);
        }
    });
}

export const proxyDetailController: RequestHandler = async (request: Req, response: Res) => {
    await cors(request, response, async () => {
        try {
            const form = request.body;
            switch (request.method.toUpperCase()) {
                case "POST":
                    const proxyResponse: ResponseBase = await addProxyService(form.name, form.uid);
                    response.send(proxyResponse);
                    break;
                case "DELETE":
                    const proxyDeleteResponse: ResponseBase = await deleteProxyService(form.uid, form.pid);
                    response.send(proxyDeleteResponse);
                    break;
                default:
                    response.send({ code: 405, message: "Method not support." });
            }
        } catch (error) {
            const errroResponse = new ResponseBase(500, "");
            const message: string = error instanceof Error ? error.message : "Unknown error";
            errroResponse.setMessage(message);
            response.send(errroResponse);
        }
    }); 
}

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
