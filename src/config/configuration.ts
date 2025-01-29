export default () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    notificationServerUrl: process.env.NOTIFICATION_SERVER_URL,
  });