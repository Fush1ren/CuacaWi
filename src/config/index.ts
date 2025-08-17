export interface ConfigEnv {
    API_KEY: string;
    API_URL: string;
    ICON_URL: string;
    FLAG_URL: string;
    BMKG_URL: string
}

const config: ConfigEnv = {
    API_KEY: import.meta.env.VITE_APP_API_KEY,
    API_URL: import.meta.env.VITE_APP_API_URL,
    ICON_URL: import.meta.env.VITE_APP_ICON_URL,
    FLAG_URL: import.meta.env.VITE_APP_FLAG_URL,
    BMKG_URL: import.meta.env.VITE_APP_BMKG_URL,
}

export default config;