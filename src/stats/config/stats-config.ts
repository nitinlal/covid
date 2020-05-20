import { registerAs } from '@nestjs/config';
import * as envalid from 'envalid';

export const loadAndValidate = () => {
  const env = envalid.cleanEnv(process.env, {
    STATS_URI: envalid.str(),
  });
  return registerAs('stats', () => ({
    ...env,
  }));
};
