import { useState } from "react";
import { FormData, Product, ProductImage } from "@/lib/types";

const initialFormData: FormData = {
    name: "",
    website_url: "",
    dpiit_cert_number: "",
    pitch_deck_url: null,
    logo_url: null,
    banner_url: null,

    address: { street: "", city: "", state: "", pincode: "" },
    director: { name: "", email: "" },
    event_intent: { why_participate: "", expectation: "", consent_to_pay: false },
    funding_info: { funding_type: "" },
    revenue_info: { revenue_bracket: "", user_impact: 0 },
    spoc: { name: "", email: "", phone: "", position: "" },

    products: [
        {
            title: "",
            stage: "",
            users: [],
            price: 0,
            quantity: 0,
            category: "",
            description: "",
            tags: "",
            product_type: "",
            images: [],
        },
    ],
};

export const useFormData = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);

    // Root-level simple fields
    const handleRootChange = (field: keyof FormData, value: string | number | boolean | null) => {
        setFormData((prev) => ({ ...prev, [field]: value } as FormData));
    };

    // Nested sections: address, director, event_intent, funding_info, revenue_info, spoc
    const handleNestedChange = <K extends keyof FormData>(section: K, key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...(prev[section] as any), [key]: value },
        }));
    };

    // Products
    const handleProductChange = <F extends keyof Product>(
        index: number,
        field: F,
        value: Product[F]
    ) => {
        setFormData((prev) => {
            const updated = [...prev.products];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, products: updated };
        });
    };

    const handleAddProduct = () => {
        setFormData((prev) => ({
            ...prev,
            products: [
                ...prev.products,
                {
                    title: "",
                    stage: "",
                    users: [],
                    price: 0,
                    quantity: 0,
                    category: "",
                    description: "",
                    tags: "",
                    product_type: "",
                    images: [],
                },
            ],
        }));
    };

    const handleRemoveProduct = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            products: prev.products.filter((_, i) => i !== index),
        }));
    };

    return {
        formData,
        handleRootChange,
        handleNestedChange,
        handleProductChange,
        handleAddProduct,
        handleRemoveProduct,
    };
};
