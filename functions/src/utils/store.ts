import { initializeApp, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { credential } from "firebase-admin";
import * as keys from "../key/serviceAccount.json";

const app = initializeApp({
    credential: credential.cert(<ServiceAccount>keys),
});

export const store = getFirestore(app);
export const auth = getAuth(app);
