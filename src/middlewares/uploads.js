import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

// export const localUpload = multer({ dest: 'uploads/' });

export const userProfileUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/SexWise-app/*'
    }),
    preservePath: true
}).single('image');

export const userAvatarUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken:
            process.env.SAVEFILESORG_API_KEY,
        relativePath: '/SexWise-app/users/*'
    }),
    preservePath: true
}) .single("image"); 