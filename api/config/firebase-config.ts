import admin, { credential, ServiceAccount } from "firebase-admin";

import serviceAccount from "./service-account-key.json";

export const firebaseAdmin: any = admin.initializeApp({
  credential: credential.cert(serviceAccount as ServiceAccount),
});
