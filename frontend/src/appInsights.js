import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: 'YOUR_INSTRUMENTATION_KEY',
    enableAutoRouteTracking: true, // Optionnel : pour suivre automatiquement les changements de route
  },
});

appInsights.loadAppInsights();
appInsights.trackPageView(); // Pour suivre la première page vue

export default appInsights;