import axios from "axios";
import { https } from "firebase-functions";

import { ResponseBase, ProxyListResponse, ProxyServiceResponse } from "../models/Response";
import { store } from "../utils/store";

import { userRouteIsExists, permissionDenied } from "./UserService";

type Req = https.Request;

type ProxyListHandler = (uid: string) => ResponseBase | ProxyListResponse | Promise<ResponseBase> | Promise<ProxyListResponse>;

type ProxyServiceHandler = (request: Req) => ResponseBase | ProxyServiceResponse | Promise<ResponseBase> | Promise<ProxyServiceResponse>;

export const getProxyListService: ProxyListHandler = async (uid: string) => {
    const response = new ProxyListResponse(0, "Success");
    if (!uid) return permissionDenied();

    const userProxySnapshot = await store.collection("user-proxy").doc(uid).get();
    if (!userProxySnapshot.exists) {
        response.data = [];
        return response;
    }
    const userProxyData = await userProxySnapshot.data();
    const list = userProxyData ? userProxyData.list : [];
    response.data = list;

    return response;
}

export const getService: ProxyServiceHandler = async (request: Req) => {
    try {
        const token: string | undefined = request.header("user_token");
        const pathArr = request.params[0].split("/");
        const userRouteExists: ProxyServiceResponse | ResponseBase = await userRouteIsExists(token, pathArr[0]);
        const userRouteExistsData = userRouteExists.get();
        if (userRouteExistsData.code !== 0) return userRouteExists;

        if (userRouteExists instanceof ProxyServiceResponse) {
            const thirdApiPath = userRouteExists.data.url;
            const thirdApiHeaderMapping = userRouteExists.data.headers;
            const headers: any = {};
            thirdApiHeaderMapping.forEach((item: string) => {
                headers[item] = request.header(item);
            });

            const params = [...pathArr];
            params.splice(0, 1);
            const paramString = `/${params.join("/")}`;
            const thirdApiResponse = await axios.get(`${thirdApiPath}${paramString}`, { params: request.query, headers });
            const response = new ProxyServiceResponse(0, "Success");
            if (thirdApiResponse.status !== 200) {
                response.setCode(thirdApiResponse.data.code ?? thirdApiResponse.status);
                response.setMessage(thirdApiResponse.data.message ?? `${thirdApiPath} occur unknown error.`);
                return response;
            }
            response.data = thirdApiResponse.data;
            return response;
        }
        return userRouteExists;
    } catch (error) {
        console.log(error);
        const errroResponse = new ResponseBase(500, "");
        const message: string = error instanceof Error ? error.message : "Unknown error.";
        errroResponse.setMessage(message);
        return errroResponse;
    }
};
