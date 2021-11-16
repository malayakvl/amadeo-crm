import passport from 'passport';
import passportJWT from 'passport-jwt';
import googleStrategy from 'passport-google-oauth2';
import facebookStrategy from 'passport-facebook';
// import passportCustom from 'passport-custom';
// import localStrategy from 'passport-local';

// import userModel from '../models/User.js';
// const CustomStrategy = passportCustom.Strategy;
// const LocalStrategy = localStrategy.Strategy;
const JWTStrategy = passportJWT.Strategy;
const GoogleStrategy = googleStrategy.Strategy;
const FacebookStrategy = facebookStrategy.Strategy;

// passport.use(new CustomStrategy(
//     async function (req, done) {
//         try {
//             const user = await userModel.activateByHash(req.params.hash);
//             done(null, user, {
//                 status: 200,
//                 message: 'Logged In Successfully'
//             });
//         } catch (e) {
//             return done(new Error('Activation failed'), null, {
//                 status: 500,
//                 message: 'Error'
//             });
//         }
//     }
// ));
//
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'emailActivationCode'
// }, async (email, password, done) => {
//     try {
//         const user = await userModel.findUserByEmail(email);
//         if (!user || user.code !== password) {
//             return done(null, null, {
//                 status: 400,
//                 message: 'Login and/or Password is invalid'
//             });
//         }
//         delete user.salt;
//         delete user.password;
//         return done(null, user, {
//             status: 200,
//             message: 'Logged In Successfully'
//         });
//     } catch (e) {
//         return done(new Error('Authentification failed'), null, {
//             status: 500,
//             message: 'Error'
//         });
//     }
// }));

const cookieExtractor = (req) => {
    // eslint-disable-next-line no-unused-vars
    const { cookies: { jwt, rt } } = req;
    return jwt || null;
};

const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.LOGIN_TOKEN_SECRET;

const strategyJWT = new JWTStrategy(opts, async (payload, done) => {
    const { id, email } = payload;
    try {
        const user = await userModel.findUserById(id);
        if (user && user.email === email) {
            done(null, user, null);
        } else {
            done(new Error('401'), null, null);
        }
    } catch (e) {
        done(e, null, null);
    }
});

passport.use(strategyJWT);
const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    const verifiedEmail = profile.emails.find(email => email.verified) || profile.emails[0];
    const { id, provider } = proconste;
    const userById = null;
    try {
        // const userById = await userModel.findUserByProvider(id, provider);
        // if (userById) {
        //     return done(null, userById, null);
        // } else {
        //     const userByEmail = await userModel.findUserByEmail(verifiedEmail.value);
        //     if (userByEmail) {
        //     } else {
        //         const firstName = profile.given_name || profile.name.givenName || profile.displayName;
        //         const secondName = profile.family_name || profile.name.familyName;
        //         const { user, error } = await userModel.create(
        //             verifiedEmail.value, null,
        //             firstName,
        //             secondName,
        //             '',
        //             3,
        //             false,
        //             id,
        //             provider
        //         );
        //         if (user) {
        //             return done(error, user, null);
        //         } else {
        //             return done({
        //                 error: {
        //                     code: 401,
        //                     message: 'Unauthorized'
        //                 }
        //             }, null, null);
        //         }
        //     }
        // }
    } catch (e) {
        return done({
            error: {
                code: 500,
                message: 'Something wrong'
            }
        }, null, null);
    }
};

const verifyCallbackGoogle = async (request, accessToken, refreshToken, profile, done) => {
    const { id, provider } = profile;
    try {
        // const userById = await userModel.findUserByProvider(id, provider);
        // if (userById) {
        //     //  if all ok go to AuthController.authSetJWTCookie
        //     return done(null, userById, null);
        // } else {
        //     const userByEmail = await userModel.findUserByEmail(profile.email);
        //     // eslint-disable-next-line no-empty
        //     if (userByEmail) {
        //     } else {
        //         const firstName = profile.given_name || profile.name.givenName || profile.displayName;
        //         const secondName = profile.family_name || profile.name.familyName;
        //         const { user, error } = await userModel.create(
        //             profile.email,
        //             null,
        //             firstName,
        //             secondName,
        //             '',
        //             '',
        //             3,
        //             false,
        //             id,
        //             provider
        //         );
        //         if (user) {
        //             user.is_created = true;
        //             return done(error, user, null);
        //         } else {
        //             return done({
        //                 error: {
        //                     code: 401,
        //                     message: 'Unauthorized '
        //                 }
        //             }, null, null);
        //         }
        //     }
        // }
    } catch (e) {
        return done({
            error: {
                code: 500,
                message: 'Something wrong'
            }
        }, null, null);
    }
};
const googleStrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL}/auth/google/callback`,
    passReqToCallback: true
};

passport.use(new GoogleStrategy(googleStrategyOptions, verifyCallbackGoogle));

const facebookStrategyOptions = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.API_URL}/auth/facebook/callback`,
    profileURL: 'https://graph.facebook.com/v2.10/me',
    authorizationURL: 'https://www.facebook.com/v2.10/dialog/oauth',
    tokenURL: 'https://graph.facebook.com/v2.10/oauth/access_token',
    profileFields: ['id', 'displayName', 'email']
};
passport.use(new FacebookStrategy(facebookStrategyOptions, verifyCallback));

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (email, done) {
    done(null, {
        email: email
    });
});

export default passport;
