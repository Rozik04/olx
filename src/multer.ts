import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerCon = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
};





