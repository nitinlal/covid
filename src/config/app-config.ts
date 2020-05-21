import { registerAs } from '@nestjs/config';
import * as envalid from 'envalid';

export default registerAs('app', () => {
  return envalid.cleanEnv(process.env, {
    DB_URI: envalid.str(),
  });
});
