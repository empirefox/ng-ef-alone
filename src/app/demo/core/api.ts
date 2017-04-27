import { apis } from './api/api';

export * from './api/api';
export * from './api/go-consts/enum';
export * from './api/trans';
export * from './api/go-consts/pipe';

export const api = apis('http://127.0.0.1:4200/fixture/api', '.json');
