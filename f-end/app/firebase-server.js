export const fBPrivateKey =
  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDmBIv4xiQ4dgsZ\npyGST0M5DWRWoPeV0IK32RPy2Xj4mIIMbqCDqC4n55ghL/2bJIvrR5tpVRTfCzyJ\nDaS10tUAC/dw1QDdPdxOnD4XHPFuzO6Fj9x41op5SFujz21lbWwMexjRIcesNZR7\nLpl01eEv0wjvt1q1mE0OSKZfLvP3/VKLr+hY1PeFT/yngL0lcuFnFHtAYs8qJKFh\n1zxxm5qgQTnnX/+7TaYwXKQp4Z3ULnZx7zLFaaSUjvRpP8o5X19UbDPaYDbSJ3+l\nUC/mpzk2S1yTb4yUw+AvzPRwnsdVA+FKN8X7sLDqIsVXd9/xU16jBrr/eduKcwsp\ntUlL9rrDAgMBAAECggEAFSzopee31erSwsh8HWK7/DibZXjpfMVMA24x7p15YYlz\nZNRFEAR08KowJdNWiZMnvmqX3W6TvqTjgcqGa1FpgoOXgq+upgTX5J9wUo27kZ5p\nfFTuJcG6ex003TPEt8hcYMRvAxxqVr7oAx8bHtfBz2FM5U9VQ8/YPYRlV0Xp995m\n+fnogft7UZ0Dp0KLBufU+ebWC+Mem239nRMeRKs4KOjVVQzQ2oMN//mtNR5k989E\n+OA4asyYoecyf3SSKdSalyFm1U74IKZr92F5utDpsS+qdaiN+KiQkbyV/ZXwHkDz\nQARmdoWWqUM/EzxYJy3lkXjTXg7rjPTLqw6KwEAu4QKBgQD85G/IDC9R0wNbLpZN\nbEfU1I1QWOwigoA4iTcTnHc+WWm1gkYiJ/kRIfPRYo7bQnP7RZE6r3f6PAsfvx7+\nXsk2lHtV/ilkZ52gDiFoH4LiMrdUf9MPT0OwlOZo5rM/WSSBqvoVhD/iCUhUJ99/\nMyWA4ICgfRj9ZSMXrEtTDXiQXQKBgQDo2CZkefa4UdNWcVrPRdxqWyZB7XezOPT7\n7FbPZa79Vs9x7aM0VTckSagi/vP3NAfmCVp2kk77JDDRnDGWO36bNiAi4R3BSkvI\n8NlOPkn/O/toiWKEH0MIhwzqChCD5wH9bJCitUZFOXs2eCYCkQCTKi4YLjYkaqh2\nv8uW6RxFnwKBgB9CiYK75tmBcOfDgXa+jL6FK5aj90Roxzq102YMMD03xjZWjR7J\nvCLfBIl8WlZGB5omxkXvzK/U3jclY8pjoxGpFvnROgKcQEK5nG2Hf6FATaMXTdqV\nnLNmJHkRE1UgSr/wh4tDVrY1GYi1iQ3rH5anqZ6s9/rSlpzlgkYY4y9NAoGAY8hF\nY6eUoFaIf7HiHZMtqvJWycfvFQHikpcseIJ15CEwkv0ohIPENqvN/vlNKXHFtMHr\nX4bBjARtW1ZZNa1XS0J9sRTRwISLR5hXN52f7l4RFjJR4pbXDi95zE311+DGTIka\nzm9qpr3EXIpOl6j2GxrnV/ttvltqyEDXCVvqfrcCgYEAm9OLQ494pT2DXix36lUa\nxm8WNVXsOYjcJgtJOXQ1cnYOG8vPGbkaamLprcqi+WhvdRvY30nMUEJqL4EvE5Sd\nAMmEskmuxO2GTOe0SJLNDXEwD+EPlHiHX6sp931IK0Jy4rSyqlluzpC5ksahmgpP\nQ/xa+NSd1kUTc9P0xeEahyk=\n-----END PRIVATE KEY-----\n";

// // lib/auth.js
// import serviceAccount from './tcd-pvtk.json'; // Path to your service account JSON file
// import { authMiddleware } from 'next-firebase-auth-edge';

// // Initialize authMiddleware with Firebase Admin configuration
// const admin = authMiddleware({
//   apiKey: process.env.FIREBASE_API_KEY, // Use environment variable for sensitive data
//   cookieName: "AuthToken",
//   cookieSignatureKeys: [process.env.COOKIE_SIGNATURE_KEY], // Use environment variable for security key
//   cookieSerializeOptions: {
//     path: "/",
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     maxAge: 12 * 60 * 60 * 24, // Twelve days
//   },
//   serviceAccount, // Directly pass the entire service account object
// });

// export default admin;

// app/firebase-auth.js
// import { init } from "next-firebase-auth-edge";
// import { verifyIdToken } from 'next-firebase-auth-edge/lib/auth'; // Correct import
// import { initAuth } from 'next-firebase-auth-edge';

// export const initAuth = () => {
//   init({
//     cookieName: "fireBaseToken",
//     cookieSignatureKeys:"9f8b0b66cd7137f96c7a8f1b26ad65ab452e4a1e8f4ed6f53691bf3a0b848dea97dbf888709cc1477d1df2e253b7f4f65e2f4bf01f3fbbc9161766a72608a23d",
//     firebaseAdminInitConfig: {
//       credential: {
//         projectId: "tech-dose-images",
//         clientEmail:
//           "firebase-adminsdk-wjajv@tech-dose-images.iam.gserviceaccount.com",
//         privateKey: privateKey.replace(/\\n/g, "\n"),
//       },
//     },
//     firebaseClientInitConfig: {
//       apiKey: "AIzaSyAH1_axiE7RCq4VEtVPpSwIG_kJDrSBPlI",
//       authDomain: "tech-dose-images.firebaseapp.com",
//       projectId: "tech-dose-images",
//     },
//   });
// };
