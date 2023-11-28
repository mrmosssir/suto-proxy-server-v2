export interface Quota { level: string, requests: number, proxys: number };

export type QuotaMap = {
    requests: QuotaMapItem,
    proxys: QuotaMapItem
};

export type QuotaMapItem = {
    name: string,
    unit?: string,
    cycle: string,
    icon?: string
};