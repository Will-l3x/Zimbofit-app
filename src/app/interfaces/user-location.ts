
export interface UserLocation {
    country: {
        id: string;
        name: string;
    };
    region: {
        id: string;
        name: string;
    };
    city: {
        id: string;
        name: string;
    };
    timezone: string;
}
