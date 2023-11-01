import { https } from "firebase-functions";
import { sha256 } from "js-sha256";

import { ResponseBase, ProxyServiceResponse, UserTokenResponse } from "../models/Response";

import { auth, store } from "../utils/store";

type Req = https.Request;

type UserServiceHandler = (token?: string, params?: string, form?: userData) =>
    ResponseBase | Promise<ResponseBase> |
    ProxyServiceResponse | Promise<ProxyServiceResponse>;

type UserTokenHandler = (request: Req) =>
    ResponseBase | Promise<ResponseBase> |
    UserTokenResponse | Promise<UserTokenResponse>;

type userIsExistsHandler = (email: string) => ResponseBase | Promise<ResponseBase>;

export type userData = {
    email: string,
    username: string,
    password: string
};

export const permissionDenied: UserServiceHandler = () => {
    const message = "You do not have permission to access this resource.\nPlease verify if the token is correct or join us.";
    const response = new ResponseBase(403, message);
    return response;
};

export const routeNotFound: UserServiceHandler = () => {
    const message = "The provided route param does not correspond to a valid URL.";
    const response = new ResponseBase(404, message);
    return response;
};

export const userBadRequest: UserServiceHandler = (methodMessage?: string) => {
    const message = `Bad Request${methodMessage ? ": " : ""}${ methodMessage }`;
    const response = new ResponseBase(400, message);
    return response;
};

export const userRouteIsExists: UserServiceHandler = async (token?: string, params?: string) => {
    const response = new ProxyServiceResponse(0, "Success");

    if (!token) return permissionDenied();
    const userDoc = store.collection("user").doc(token);
    const userData = await userDoc.get();
    if (!userData.exists) return permissionDenied();

    if (!params) return routeNotFound();
    const userRouteDoc = userDoc.collection("routes").doc(params);
    const userRouteData = await userRouteDoc.get();
    if (!userRouteData.exists) return routeNotFound();

    const routeData = userRouteData.data();
    if (!routeData) return routeNotFound();

    response.data = { url: routeData.path, headers: routeData.headers };

    return response;
};

export const userIsExists: userIsExistsHandler = async (email: string) => {
    const response = new ResponseBase(0, "Success");
    try {
        const record = await auth.getUsers([{ email }]);
        if (!Array(record)[0].users.length) return response;
        response.setCode(409);
        response.setMessage("The email address is not available.");
        return response;
    } catch (error) {
        const errroResponse = new ResponseBase(500, "");
        const message: string = error instanceof Error ? error.message : "Unknown error";
        errroResponse.setMessage(message);
        return errroResponse;
    }
};

export const userRegister: UserTokenHandler = async (request: Req) => {
    try {
        const response = new UserTokenResponse(0, "Success");
        const form = request.body.form;
        if (!form) return userBadRequest("User data cannot empty.");
        if (!form.email) return userBadRequest("Email cannot empty.");
        if (!form.username) return userBadRequest("Username cannot empty.");
        if (!form.password) return userBadRequest("Password cannot empty.");
        const isExists = await userIsExists(form.email);
        if (isExists.get().code !== 0) return isExists;
        const record = await auth.createUser({
            email: form.email,
            emailVerified: false,
            password: sha256(form.password),
            displayName: form.username,
            disabled: true,
        });
        const token = await auth.createCustomToken(record.providerData[0].uid);
        response.data = { token };
        response.setMessage("Register success.");
        return response;
    } catch (error) {
        const errroResponse = new ResponseBase(500, "");
        const message: string = error instanceof Error ? error.message : "Unknown error";
        errroResponse.setMessage(message);
        return errroResponse;
    }
};
