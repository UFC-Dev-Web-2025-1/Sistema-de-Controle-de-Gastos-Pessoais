'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Configurar permissões públicas automaticamente
    try {
      const pluginStore = strapi.store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
      });

      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({
          where: {
            type: 'public',
          },
        });

      if (publicRole) {
        const publicPermissions = await strapi
          .query('plugin::users-permissions.permission')
          .findMany({
            where: {
              role: publicRole.id,
            },
          });

        // Definir permissões para cada content type
        const contentTypes = ['api::despesa.despesa', 'api::cartao.cartao', 'api::saldo.saldo'];
        const actions = ['find', 'findOne', 'create', 'update', 'delete'];

        for (const contentType of contentTypes) {
          for (const action of actions) {
            const existingPermission = publicPermissions.find(
              perm => perm.action === `${contentType}.${action}`
            );

            if (!existingPermission) {
              await strapi.query('plugin::users-permissions.permission').create({
                data: {
                  action: `${contentType}.${action}`,
                  subject: contentType,
                  properties: {},
                  conditions: [],
                  role: publicRole.id,
                  enabled: true,
                },
              });
            } else if (!existingPermission.enabled) {
              await strapi.query('plugin::users-permissions.permission').update({
                where: { id: existingPermission.id },
                data: { enabled: true },
              });
            }
          }
        }

        console.log('✅ Permissões públicas configuradas automaticamente');
      }
    } catch (error) {
      console.error('❌ Erro ao configurar permissões:', error);
    }
  },
};
