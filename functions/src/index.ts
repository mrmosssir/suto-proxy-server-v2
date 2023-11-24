import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import { setGlobalOptions } from "firebase-functions/v2/options";

import { proxyController } from "./controllers/ProxyController";
import { initController, planQuatoController } from "./controllers/UserController";

setGlobalOptions({ maxInstances: 10 });

export const proxy = onRequest(proxyController);

export const init = onRequest(initController);

export const plan = onRequest(planQuatoController);
