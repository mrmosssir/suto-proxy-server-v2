import { https } from "firebase-functions";
import * as logger from "firebase-functions/logger";
import { auth } from "../utils/store";
import { ResponseBase } from "../models/Response";

type Req = https.Request;
type RequestHandler = (request: Req) => ResponseBase | Promise<ResponseBase>;

export const hasToken: RequestHandler = async (request: Req) => {
    try {
        const response = new ResponseBase(0, "Success");
        const token = request.header("token");
        if (!token) {
            response.setCode(403);
            response.setMessage("Permission Denied");
            return response;
        }
        const user = await auth.verifyIdToken(token);
        if (!user) {
            response.setCode(403);
            response.setMessage("Permission Denied");
            return response;
        }
        return response;
    } catch (error) {
        logger.error(error);
        const errroResponse = new ResponseBase(500, "");
        const message: string = error instanceof Error ? error.message : "Unknown error";
        errroResponse.setMessage(message);
        return errroResponse;
    }
};
