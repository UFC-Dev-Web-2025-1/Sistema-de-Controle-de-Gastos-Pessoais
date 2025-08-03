module.exports = ({ env }) => {
  // Parse APP_KEYS com múltiplas tentativas
  let appKeys = [
    'EGu8W5HAa8/CIFrTltG86g==',
    'ySb4yfZsoYRLPu7I8wgvvQ==',
    'y0LXStnIicNrRisQ/94viw==',
    'YMDqn5Tu1RVqEnaIXf9qhw=='
  ];

  try {
    // Primeira tentativa: usar env.array()
    const envKeys = env.array('APP_KEYS');
    if (envKeys && envKeys.length > 0) {
      appKeys = envKeys;
    }
  } catch (error) {
    try {
      // Segunda tentativa: parsing manual
      const keysString = env('APP_KEYS', '');
      if (keysString && keysString.length > 0) {
        appKeys = keysString.split(',').map(key => key.trim());
      }
    } catch (parseError) {
      console.log('Using fallback APP_KEYS');
    }
  }

  console.log('APP_KEYS length:', appKeys.length);
  console.log('APP_KEYS preview:', appKeys[0] ? appKeys[0].substring(0, 10) + '...' : 'none');

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: appKeys,
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
    url: env('PUBLIC_URL', ''),
    proxy: env.bool('IS_PROXIED', true),
  };
};
