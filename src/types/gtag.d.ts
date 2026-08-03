// TypeScript declarations for analytics globals

interface Window {
  gtag?: {
    (command: 'config', targetId: string, config?: Record<string, unknown>): void;
    (command: 'event', eventName: string, params?: Record<string, unknown>): void;
    (command: 'consent', action: 'default' | 'update', params: Record<string, unknown>): void;
    (command: 'js', config: Date): void;
    (command: 'set', params: Record<string, unknown>): void;
  };
  fbq?: ((
    command: 'init' | 'track' | 'consent',
    value: string,
    params?: Record<string, unknown>
  ) => void) & {
    callMethod?: (...args: unknown[]) => void;
    loaded?: boolean;
    push?: (...args: unknown[]) => number;
    queue?: unknown[];
    version?: string;
  };
  _fbq?: Window['fbq'];
  _linkedin_data_partner_ids?: string[];
  dataLayer?: unknown[];
  gtag_report_conversion?: (url?: string) => boolean;
  'ga-disable-G-BGM7PRFBR7'?: boolean;
  lintrk?: ((command: 'track', params?: Record<string, unknown>) => void) & {
    q?: Array<[string, Record<string, unknown>?]>;
  };
  AwsWafIntegration?: {
    fetch: typeof fetch;
    getToken: () => Promise<string>;
    hasToken: () => boolean;
  };
  turnstile?: {
    render: (container: string | HTMLElement, options: {
      sitekey: string;
      action?: string;
      appearance?: 'always' | 'execute' | 'interaction-only';
      size?: 'normal' | 'flexible' | 'compact';
      callback?: (token: string) => void;
      'error-callback'?: (errorCode: string) => void;
      'expired-callback'?: () => void;
      'timeout-callback'?: () => void;
      'response-field'?: boolean;
    }) => string;
    reset: (widgetId?: string) => void;
    remove: (widgetId: string) => void;
  };
}
