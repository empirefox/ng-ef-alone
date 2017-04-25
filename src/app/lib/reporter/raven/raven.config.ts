// tslint:disable:max-line-length
export interface RavenOptions {
  /** The log level associated with this event. Default: error */
  level?: string;

  /** The name of the logger used by Sentry. Default: javascript */
  logger?: string;

  /** The environment of the application you are monitoring with Sentry */
  environment?: string;

  /** The release version of the application you are monitoring with Sentry */
  release?: string;

  /** The name of the server or device that the client is running on */
  serverName?: string;

  /** List of messages to be fitlered out before being sent to Sentry. */
  ignoreErrors?: (RegExp | string)[];

  /** Similar to ignoreErrors, but will ignore errors from whole urls patching a regex pattern. */
  ignoreUrls?: (RegExp | string)[];

  /** The inverse of ignoreUrls. Only report errors from whole urls matching a regex pattern. */
  whitelistUrls?: (RegExp | string)[];

  /** An array of regex patterns to indicate which urls are a part of your app. */
  includePaths?: (RegExp | string)[];

  /** Additional data to be tagged onto the error. */
  tags?: {
    [id: string]: string;
  };

  /** set to true to get the strack trace of your message */
  stacktrace?: boolean;

  extra?: any;

  /** In some cases you may see issues where Sentry groups multiple events together when they should be separate entities. In other cases, Sentry simply doesn’t group events together because they’re so sporadic that they never look the same. */
  fingerprint?: string[];

  /** A function which allows mutation of the data payload right before being sent to Sentry */
  dataCallback?: (data: any) => any;

  /** A callback function that allows you to apply your own filters to determine if the message should be sent to Sentry. */
  shouldSendCallback?: (data: any) => boolean;

  /** By default, Raven does not truncate messages. If you need to truncate characters for whatever reason, you may set this to limit the length. */
  maxMessageLength?: number;

  /** By default, Raven will truncate URLs as they appear in breadcrumbs and other meta interfaces to 250 characters in order to minimize bytes over the wire. This does *not* affect URLs in stack traces. */
  maxUrlLength?: number;

  /** Override the default HTTP data transport handler. */
  transport?: (options: RavenTransportOptions) => void;
}

export interface RavenTransportOptions {
  url: string;
  data: any;
  auth: {
    sentry_version: string;
    sentry_client: string;
    sentry_key: string;
  };
  onSuccess: () => void;
  onFailure: () => void;
}

export class RavenConfig {
  // will replace sentry.io to localhost, uesed to raise a http error
  useLocal?: boolean;
  dsn: string;
  options?: RavenOptions;
}
