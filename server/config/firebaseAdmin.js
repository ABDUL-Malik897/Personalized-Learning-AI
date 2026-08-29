const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const firebaseAdminApp = initializeApp({
    credential: applicationDefault(),
    projectId: "personalized-learning-ai-eb970",
});

const firebaseAdminAuth = getAuth(firebaseAdminApp);

module.exports = firebaseAdminAuth;