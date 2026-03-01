import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zhenming.liuyao',
  appName: 'ZhenMing',
  webDir: 'dist',
  server: {
    // In production, remove this block to use bundled web assets
    // For development, uncomment to use live reload:
    // url: 'http://YOUR_IP:6600',
    // cleartext: true
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'ZhenMing'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1f2937',
      showSpinner: false
    },
    StatusBar: {
      style: 'Dark'
    }
  }
};

export default config;
