import { registerAs } from '@nestjs/config';
import * as envalid from 'envalid';

export const loadAndValidate = () => {
  return envalid.cleanEnv(process.env, {
    STATES_URI: envalid.str(),
  });
};

export default registerAs('states', () => loadAndValidate());
