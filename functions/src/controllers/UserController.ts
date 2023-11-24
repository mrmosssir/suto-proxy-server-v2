import { https, Response } from "firebase-functions";
import { userInitData, userPlanQuato } from "../services/UserService";
import { ResponseBase } from "../models/Response";

/* eslint-disable */
const cors = require("cors")({ origin: true });

type Req = https.Request;
type Res = Response<any>;
type RequestHandler = (request: Req, response: Res) => void | Promise<void>;

// 註冊完且 Email 驗證後的初始化資料
export const initController: RequestHandler = async (request: Req, response: Res) => {
    await cors(request, response, async () => {
        try {
            const initResponse = await userInitData(request.body.uid);
            response.send(initResponse);
        } catch (error) {
            const errroResponse = new ResponseBase(500, "");
            const message: string = error instanceof Error ? error.message : "Unknown error";
            errroResponse.setMessage(message);
            response.send(errroResponse);
        }
    });
};

export const planQuatoController: RequestHandler = async (request: Req, response: Res) => {
    await cors(request, response, async () => {
        try {
            const uid = request.params[0].replace("api/plan/", "");
            const planQuatoResponse = await userPlanQuato(uid);
            response.send(planQuatoResponse);
        } catch (error) {
            const errroResponse = new ResponseBase(500, "");
            const message: string = error instanceof Error ? error.message : "Unknown error";
            errroResponse.setMessage(message);
            response.send(errroResponse);
        }
    });
};
