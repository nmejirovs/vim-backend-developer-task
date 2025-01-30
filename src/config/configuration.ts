export default () => ({
    port: parseInt(process.env.PORT || '8080', 10),
    notificationServerUrl: (process.env.NOTIFICATION_SERVER_URL || 'http://localhost:5001/'),
    logLevels: JSON.parse(process.env.LOG_LEVELS || '["log", "fatal", "error", "warn", "debug", "verbose"]')
  });