/* eslint-disable @typescript-eslint/naming-convention */
import { PurchaseItem } from './purchase-item';

export interface Invoice {
    id: string;
    amount: number;
    user_id: string;
    user_name: string;
    timestamp: number;
    items: PurchaseItem[];
};
