// import { response } from "express";
import { ResponseBase, ProxyServiceResponse, PlanResponse } from "../models/Response";

import { auth, store } from "../utils/store";

type UserServiceHandler = (token?: string, params?: string, form?: userData) =>
    ResponseBase | Promise<ResponseBase> |
    ProxyServiceResponse | Promise<ProxyServiceResponse>;

type UserIsExistsHandler = (email: string) => ResponseBase | Promise<ResponseBase>;

type UserInitDataHandler = (uid: string) => ResponseBase | Promise<ResponseBase>;

type UserPlanQuatoHandler = (uid: string) =>
    ResponseBase | Promise<ResponseBase> |
    PlanResponse | Promise<PlanResponse>;

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

export const planNotFound: UserServiceHandler = () => {
    const message = "The provided plan does not correspond to a valid plan, please contact customer service.";
    const response = new ResponseBase(404, message);
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

export const userIsExists: UserIsExistsHandler = async (email: string) => {
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

export const userInitData: UserInitDataHandler = async (uid: string) => {
    try {
        const response = new ResponseBase(0, "Success");
        if (!uid) return permissionDenied();
        store.collection("user").doc(uid).set({ plan: "free" });
        return response;
    } catch (error) {
        const errroResponse = new ResponseBase(500, "");
        const message: string = error instanceof Error ? error.message : "Unknown error";
        errroResponse.setMessage(message);
        return errroResponse;
    }
};

export const userPlanQuato: UserPlanQuatoHandler = async (uid: string) => {
    try {
        const response = new PlanResponse(0, "Success");
        if (!uid) return permissionDenied();

        const userDoc = store.collection("user").doc(uid);
        const userDocData = await userDoc.get();
        if (!userDocData.exists) return permissionDenied();

        const userData = userDocData.data();
        if (!userData) return permissionDenied();

        const planDoc = store.collection("plans").doc(userData.plan);
        const planDocData = await planDoc.get();
        if (!planDocData.exists) return planNotFound();

        const planData = planDocData.data();
        response.data = planData;
        return response;
    } catch (error) {
        const errroResponse = new ResponseBase(500, "");
        const message: string = error instanceof Error ? error.message : "Unknown error";
        errroResponse.setMessage(message);
        return errroResponse;
    }
};
