declare global {
  type Recordable<T = any> = Record<string, T>;
  declare interface ImportMetaEnv {
    PUBLIC_PATH: string;
    PORT: number;
    API_BASE_URL: string;
    MOCK_ENABLED: boolean;
    MOCK_URL: string;
  }
}

export {};
