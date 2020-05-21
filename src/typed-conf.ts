import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import appConf from './config/app-config';

@Injectable()
export class AppConf{
    constructor(@Inject(appConf.KEY) private conf: ConfigType<typeof appConf>) {

    }
    
    // get(key: keappConf) {
    //     this.conf[key];        
    //  }
 }