import { FormData, Product, ProductImage } from "./types";

export const normalizeFormData = (formData: FormData) => {
    // Normalize products (ensure numbers and images objects)
    const products = formData.products.map((p) => ({
        title: p.title,
        stage: p.stage,
        users: Array.isArray(p.users) ? p.users : [],
        price: Number(p.price) || 0,
        quantity: Number(p.quantity) || 0,
        category: p.category,
        description: p.description,
        tags: p.tags,
        product_type: p.product_type,
        images: (p.images || []).map((img) =>
            typeof (img as any) === "string" ? { url: img as any } : { url: (img as ProductImage).url }
        ),
    }));

    const payload = {
        name: formData.name,
        website_url: formData.website_url,
        dpiit_cert_number: formData.dpiit_cert_number,
        pitch_deck_url: formData.pitch_deck_url,
        logo_url: formData.logo_url,
        banner_url: formData.banner_url,

        address: {
            street: formData.address.street,
            city: formData.address.city,
            state: formData.address.state,
            pincode: formData.address.pincode,
        },

        director: {
            name: formData.director.name,
            email: formData.director.email,
        },

        event_intent: {
            why_participate: formData.event_intent.why_participate,
            expectation: formData.event_intent.expectation,
            consent_to_pay: formData.event_intent.consent_to_pay,
        },

        funding_info: {
            funding_type: formData.funding_info.funding_type,
        },

        revenue_info: {
            revenue_bracket: formData.revenue_info.revenue_bracket,
            user_impact: Number(formData.revenue_info.user_impact) || 0,
        },

        spoc: {
            name: formData.spoc.name,
            email: formData.spoc.email,
            phone: formData.spoc.phone,
            position: formData.spoc.position,
        },

        products,
    };

    return payload;
};

export const submitFormData = async (payload: any) => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    if (!serverUrl) {
        throw new Error("NEXT_PUBLIC_SERVER_URL is not defined in environment variables.");
    }

    const res = await fetch(serverUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server responded with ${res.status}: ${errText}`);
    }

    return await res.json();
};
