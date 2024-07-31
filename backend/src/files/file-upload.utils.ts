import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { join } from 'path';
import * as process from 'process';

export const storage = diskStorage({
  destination: join(process.cwd(), 'uploads'), //  todo change on env var
  filename: (req, file, callback) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    callback(null, fileName);
  },
});

export const fileFilter = (
  req: any,
  file: Express.Multer.File,
  callback: any,
) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Unsupported file type'), false);
  }
  callback(null, true);
};
