const router = require("express").Router();
const googleUser = require("../models/googleAuthUsers.js");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");
require("dotenv").config();

//middleware
router.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEYS],
  })
);
router.use(passport.initialize());
router.use(passport.session());

//Passport Login starts here
//Google Auth
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  googleUser.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await googleUser.findOne({
        googleId: profile.id,
        userName: profile.displayName,
        email: profile.emails,
        profileImage: profile.photos,
      });

      if (existingUser) {
        done(null, existingUser);
      } else {
        const user = await new googleUser({
          googleId: profile.id,
          userName: profile.displayName,
          email: profile.emails,
          profileImage: profile.photos,
        }).save();
        done(null, user);
      }
    }
  )
);

router.get(
  "api/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("api/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/dashboard");
});

router.get("api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("api/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
