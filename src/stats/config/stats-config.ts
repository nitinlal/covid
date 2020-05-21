import { registerAs } from '@nestjs/config';
import * as envalid from 'envalid';

export const loadAndValidate = () => {
  return envalid.cleanEnv(process.env, {
    STATS_URI: envalid.str(),
  });
};

export default registerAs('stats', () => loadAndValidate());
