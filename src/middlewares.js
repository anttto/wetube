import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
    }
});

const isHeroku = process.env.NODE_ENV === "production";

const s3ImageUploader = multerS3({
    s3: s3,
    bucket: 'antoverotube/images',
    acl: 'public-read',
});

const s3VideoUploader = multerS3({
    s3: s3,
    bucket: 'antoverotube/videos',
    acl: 'public-read',
});


export const localMiddleare = (req, res, next) => {
    res.locals.siteName = "Wetube";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    res.locals.isHeroku = isHeroku;
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        req.flash("info", "로그인 해주세요.");
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        req.flash("info", "로그인 상태입니다.");
        return res.redirect("/");
    }
};

export const avatarUpload = multer({
    dest: "uploads/avatars/",
    limits: {
        fileSize: 3000000,
    },
    storage: isHeroku ? s3ImageUploader : undefined,
});

export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {
        fileSize: 40000000,
    },
    storage: isHeroku ? s3VideoUploader : undefined,
});

export const sharedbufferMiddleware = (req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
};

// export const s3DeleteAvatarMiddleware = (req, res, next) => {
//     if (!req.file) {
//         console.log("aaaa");
//         return next();
//     }
//     s3.deleteObject(
//         {
//             Bucket: `antoverotube/images`,
//             Key: req.session.user.avatarUrl.split('/')[2],
//         },
//         (err, data) => {
//             if (err) {
//                 throw err;
//             }
//             console.log(`s3 deleteObject`, data);
//         }
//     );
//     console.log("success");
//     next();
// };

