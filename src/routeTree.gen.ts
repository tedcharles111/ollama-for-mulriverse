import { Route as rootRoute } from './routes/__root'; import { Route as IndexRoute } from './routes/index'; import { Route as LoginRoute } from './routes/login'; import { Route as RegisterRoute } from './routes/register'; import { Route as ChatIdRoute } from './routes/c.$chatId'; import { Route as SettingsRoute } from './routes/settings';

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  LoginRoute,
  RegisterRoute,
  ChatIdRoute,
  SettingsRoute
]);