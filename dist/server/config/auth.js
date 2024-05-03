"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
// declare global {
//   namespace Express {
//     interface User {
//       email: string;
//       id?: number;
//     }
//   }
// }
// export const authMiddleware = new LocalStrategy(
//   async (email, password, done) => {
//     try {
//       const user = await prisma.user.findFirst({
//         where: { email },
//       });
//       if (!user) {
//         return done(null, false, { message: "Username not found!" });
//       }
//       if (!bcrypt.compare(password, user.password!)) {
//         return done(null, false, { message: "Password Incorrect!" });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   }
// );
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await prisma.user.findFirst({ where: { id: Number(id) } });
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });
