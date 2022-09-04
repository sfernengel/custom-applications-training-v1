import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptions}
 */
const config = {
  name: 'Training Custom App',
  entryPointUriPath,
  cloudIdentifier: 'gcp-eu',
  env: {
    development: {
      initialProjectKey: 'sunrise-0519-poc',
    },

    production: {
      applicationId: 'TODO',
      url: 'https://custom-app-sevtap.vercel.app',
    },
  },

  oAuthScopes: {
    view: ['view_products', 'view_shopping_lists'],
    manage: ['manage_products', 'manage_shopping_lists'],
  },

  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'Custom Application 0902',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },

  submenuLinks: [
    {
      uriPath: 'channels',
      defaultLabel: 'Channels',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'shopping-lists',
      defaultLabel: 'Shopping lists',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'add-shopping-list',
      defaultLabel: 'Add a shopping list',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'external-api',
      defaultLabel: 'Make an external API call',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
  ],
};

export default config;
