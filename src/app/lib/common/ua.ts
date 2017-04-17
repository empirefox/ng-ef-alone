import { UAParser } from 'ua-parser-js';

export function parseUa(uastring?: string) {
  const ua = new UAParser(uastring).getResult();
  const isAndroid = ua.os.name === 'Android';
  const isIOS = ua.os.name === 'iOS';
  const isMobileTablet = ~[UAParser.DEVICE.MOBILE, UAParser.DEVICE.TABLET].indexOf(ua.device.type);
  const isWeChat = ua.browser.name === 'WeChat';
  const isAndroidiOS = isAndroid || isIOS;
  const isMac = ua.os.name === 'Mac OS';
  const isWindowsDesktop = !isMobileTablet && /windows/i.test(ua.os.name);
  const isLinuxDesktop = !isMobileTablet && !isWindowsDesktop && !isMac && /linux/i.test(ua.os.name);

  return Object.assign(
    {
      isAndroid,
      isIOS,
      isMobileTablet,
      isWeChat,
      isAndroidiOS,
      isMac,
      isWindowsDesktop,
      isLinuxDesktop,
    }, ua);
}

export const ua = parseUa();

export function useUa(uastring: string) {
  Object.assign(ua, parseUa(uastring));
}
