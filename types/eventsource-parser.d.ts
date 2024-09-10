declare module 'eventsource-parser' {
    export function createParser(onParse: (event: ParsedEvent | ReconnectInterval) => void): {
      feed: (chunk: string) => void;
      reset: () => void;
    };
  
    export type ParsedEvent = {
      type: 'event';
      data: string;
      event?: string;
      id?: string;
    };
  
    export type ReconnectInterval = {
      type: 'reconnect-interval';
      value: number;
    };
  }

