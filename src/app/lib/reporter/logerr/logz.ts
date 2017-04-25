import { isHttps } from '../../common';
import { LogerrConfig } from './logerr.config';

export const LOGZ_IO_CONFIG: LogerrConfig = {
  url: `${window.location.protocol}//listener.logz.io:${isHttps ? '8091' : '8090'}`,
  messageKey: 'message',
};
