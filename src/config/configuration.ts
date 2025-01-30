export default () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    notificationServerUrl: process.env.NOTIFICATION_SERVER_URL,
    logLevels: JSON.parse(process.env.LOG_LEVELS || '["log", "fatal", "error", "warn", "debug", "verbose"]')
  });