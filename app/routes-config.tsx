import {join} from 'path';

import {glob} from 'glob';
import {ensureRootRouteExists, getRouteIds, getRouteManifest} from 'remix-custom-routes';

//
//

export const routes = async () => {
  const appDir = join(process.cwd(), 'app');

  ensureRootRouteExists(appDir);

  const files = glob.sync(['routes/*.{ts,tsx,md,mdx}', 'routes/*/*.{ts,tsx,md,mdx}'], {
    cwd: appDir,
  });

  const routeIds = getRouteIds(files, {
    indexNames: ['index', 'route', '_index', '_route'],
  }).map(([id, file]) => ['$lang.' + id, file]) as [string, string][];

  return getRouteManifest(routeIds);
};
