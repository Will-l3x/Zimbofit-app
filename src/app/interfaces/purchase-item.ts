/* eslint-disable @typescript-eslint/naming-convention */

export interface PurchaseItem {
    id: string;
    name: string;
    type: string;
    item_id: string;
    subtype?: string;
    price: number;
    user_id: string;
    user_name: string;
    timestamp: number;
    comments?: string;
};
