import { https, Response } from "firebase-functions";
import { userRegister } from "../services/UserService";
import { ResponseBase } from "../models/Response";

type Req = https.Request;
type Res = Response<any>;
type RequestHandler = (request: Req, response: Res) => void | Promise<void>;

export const registerController: RequestHandler = async (request: Req, response: Res) => {
    try {
        const registerResponse = await userRegister(request);
        response.send(registerResponse);
    } catch (error) {
        const errroResponse = new ResponseBase(500, "");
        const message: string = error instanceof Error ? error.message : "Unknown error";
        errroResponse.setMessage(message);
        response.send(errroResponse);
    }
};
