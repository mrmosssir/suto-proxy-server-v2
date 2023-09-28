import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import { setGlobalOptions } from "firebase-functions/v2/options";

import { proxyController } from "./controllers/ProxyController";
import { registerController } from "./controllers/UserController";

setGlobalOptions({ maxInstances: 10 });

export const proxy = onRequest(proxyController);

export const register = onRequest(registerController);
