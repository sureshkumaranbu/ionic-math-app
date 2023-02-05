import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.example.dailymoments',
  appName: 'daily-moments',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    "url": "http://localhost:8100",
    "cleartext": true
  }
};

export default config;
