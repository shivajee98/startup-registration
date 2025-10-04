export type ProductImage = { url: string };

export type Product = {
    title: string;
    stage: string;
    users: string[];
    price: number;
    quantity: number;
    category: string;
    description: string;
    tags: string;
    product_type: string;
    images: ProductImage[];
};

export type Address = {
    street: string;
    city: string;
    state: string;
    pincode: string;
};

export type Director = {
    name: string;
    email: string;
};

export type EventIntent = {
    why_participate: string;
    expectation: string;
    consent_to_pay: boolean;
};

export type FundingInfo = {
    funding_type: string;
};

export type RevenueInfo = {
    revenue_bracket: string;
    user_impact: number;
};

export type Spoc = {
    name: string;
    email: string;
    phone: string;
    position: string;
};

export type FormData = {
    name: string;
    website_url: string;
    dpiit_cert_number: string;
    pitch_deck_url: string | null;
    logo_url: string | null;
    banner_url: string | null;

    address: Address;
    director: Director;
    event_intent: EventIntent;
    funding_info: FundingInfo;
    revenue_info: RevenueInfo;
    spoc: Spoc;

    products: Product[];
};
