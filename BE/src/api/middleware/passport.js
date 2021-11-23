import passport from 'passport';
import localStrategy from 'passport-local';
import userModel from '../models/User.js';
const LocalStrategy = localStrategy.Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await userModel.findUserByEmail(email);
        if (!user || !userModel.validatePassword(password, user.salt, user.password)) {
            return done(null, null, {
                status: 400,
                message: 'Login and/or Password is invalid'
            });
        }
        // delete user.salt;
        // delete user.password;
        // console.log(FgRed, '--- login LocalStrategy---');
        // console.log(FgRed, user.email);
        return done(null, user, {
            status: 200,
            message: 'Logged In Successfully'
        });
    } catch (e) {
        return done(new Error('Authentification failed'), null, {
            status: 500,
            message: 'Error'
        });
    }
}));

// const cookieExtractor = (req) => {
//     console.log("Cookies", req.headers.cookie);
//     console.log(req.cookie);
//
//     return jwt || null;
// };
// const opts = {};
// opts.jwtFromRequest = cookieExtractor;
// opts.secretOrKey = process.env.LOGIN_TOKEN_SECRET;
// /**
//  * Check is user logged by jwt passportstrategy
//  * @type {JwtStrategy}
//  */
// const strategyJWT = new JWTStrategy(opts, async (payload, done) => {
//     const { id, email } = payload;
//     try {
//         const user = await User.findUserById(id, false);
//         if (user && user.email === email) {
//             const settings = await Settings.getSettings();
//             user.settings = settings;
//             done(null, user, null);
//         } else {
//             done(new Error('401'), null, null);
//         }
//     } catch (e) {
//         done(e, null, null);
//     }
// });
// passport.use(strategyJWT);

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (email, done) {
    done(null, {
        email: email
    });
});

export default passport;
