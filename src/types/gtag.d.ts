// TypeScript declarations for analytics globals

interface Window {
  gtag?: {
    (command: 'config', targetId: string, config?: Record<string, unknown>): void;
    (command: 'event', eventName: string, params?: Record<string, unknown>): void;
    (command: 'js', config: Date): void;
    (command: 'set', params: Record<string, unknown>): void;
  };
  fbq?: ((
    command: 'init' | 'track',
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
  dataLayer?: unknown[];
  gtag_report_conversion?: (url?: string) => boolean;
}
