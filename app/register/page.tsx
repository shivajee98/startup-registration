"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, MapPin, DollarSign, Users, FileText, User, UserCheck, AArrowUp } from "lucide-react";
import { UploadButton } from "@/components/ui/UploadButtons";

type ProductImage = { url: string };

type Product = {
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

type Address = {
    street: string;
    city: string;
    state: string;
    pincode: string;
};

type Director = {
    name: string;
    email: string;
};

type EventIntent = {
    why_participate: string;
    expectation: string;
    consent_to_pay: boolean;
};

type FundingInfo = {
    funding_type: string;
};

type RevenueInfo = {
    revenue_bracket: string;
    user_impact: number;
};

type Spoc = {
    name: string;
    email: string;
    phone: string;
    position: string;
};

type FormData = {
    name: string;
    website_url: string;
    dpiit_cert_number: string;
    pitch_deck_url: string | null;
    logo_url: string | null;
    banner: string | null;

    address: Address;
    director: Director;
    event_intent: EventIntent;
    funding_info: FundingInfo;
    revenue_info: RevenueInfo;
    spoc: Spoc;

    products: Product[];
};

const revenueBrackets = [
    "0-5L INR",
    "5L-25L INR",
    "25L-50L INR",
    "50L-1Cr INR",
    "1Cr-5Cr INR",
    "5Cr+ INR",
];

const fundingTypes = [
    "None",
    "Bootstrapped",
    "Government Grant",
    "Pre-Seed",
    "Seed",
    "Angel",
    "Series A",
    "Series B",
    "VC",
    "Venture Debt",
];

const productStages = ["Idea", "Prototype", "MVP", "Pilot", "Beta", "Released"];

const productCategories = ["Manufacturing", "Hardware", "Software", "Education", "Health", "Electronics", "Fashion", "Other"];

const productTypes = ["Product", "Service"];

export default function StartupRegistrationForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        website_url: "",
        dpiit_cert_number: "",
        pitch_deck_url: null,
        logo_url: null,
        banner: null,

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
    });
    // put this at the top where you initialize formData

    // VVVVV FOR TESTING TIME VVVVV
    // const [formData, setFormData] = useState({
    //     name: "Acme Innovations Pvt. Ltd.",
    //     website_url: "https://acme.in",
    //     dpiit_cert_number: "DPIIT-2025-XYZ",
    //     pitch_deck_url: "https://cdn.test/pitchdeck.pdf",
    //     logo_url: "https://cdn.test/logo.png",
    //     banner: "https://cdn.test/banner.png",

    //     address: {
    //         street: "221B Startup Lane",
    //         city: "Bengaluru",
    //         state: "Karnataka",
    //         pincode: "560001",
    //     },

    //     director: {
    //         name: "Ravi Kumar",
    //         email: "ravi.kumar@acme.in",
    //     },

    //     event_intent: {
    //         why_participate: "Showcase our SaaS platform to VCs",
    //         expectation: "Networking and early adopters",
    //         consent_to_pay: true,
    //     },

    //     funding_info: {
    //         funding_type: "Seed",
    //     },

    //     revenue_info: {
    //         revenue_bracket: "₹25L–₹1Cr",
    //         user_impact: 15000,
    //     },

    //     spoc: {
    //         name: "Anita Sharma",
    //         email: "anita.sharma@acme.in",
    //         phone: "+91-9876543210",
    //         position: "Operations Manager",
    //     },

    //     products: [
    //         {
    //             title: "AI Analytics Dashboard",
    //             stage: "MVP",
    //             users: ["SMBs", "Startups"],
    //             price: 1999,
    //             quantity: 50,
    //             category: "Software",
    //             description: "Cloud-based AI analytics tool for SMEs.",
    //             tags: "ai,analytics,dashboard",
    //             product_type: "Digital",
    //             images: [
    //                 { url: "https://cdn.test/product1.png" },
    //                 { url: "https://cdn.test/product2.png" },
    //             ],
    //         },
    //         {
    //             title: "IoT Device Tracker",
    //             stage: "Prototype",
    //             users: ["Manufacturers"],
    //             price: 4999,
    //             quantity: 20,
    //             category: "Hardware",
    //             description: "IoT device for real-time asset tracking.",
    //             tags: "iot,hardware,tracking",
    //             product_type: "Physical",
    //             images: [{ url: "https://cdn.test/iot.png" }],
    //         },
    //     ],
    // });


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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
            banner: formData.banner,

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
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

        if (!serverUrl) {
            throw new Error("NEXT_PUBLIC_SERVER_URL is not defined in environment variables.");
        }
        try {
            const res = await fetch(serverUrl, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(payload),
            })
            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Server responded with ${res.status}: ${errText}`);
            }

            const result = await res.json();
            console.log("Success:", result);
            alert("Registration successful!");
        } catch (error) {
            console.error("Submission failed:", error);
            alert("Something went wrong during submission.");
        }

        console.log("Submitting payload:", payload);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Startup Registration</h1>
                    <p className="text-gray-600">Register your startup for the event</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Startup Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                Basic Information
                            </CardTitle>
                            <CardDescription>Provide basic details about the startup</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="startup_name">Startup Name *</Label>
                                    <Input
                                        id="startup_name"
                                        value={formData.name}
                                        onChange={(e) => handleRootChange("name", e.target.value)}
                                        placeholder="Enter startup name"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="websiteURL">Website URL</Label>
                                    <Input
                                        id="websiteURL"
                                        type="url"
                                        value={formData.website_url}
                                        onChange={(e) => handleRootChange("website_url", e.target.value)}
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="dpiit_cert_number">DPIIT Number</Label>
                                    <Input
                                        id="dpiit_cert_number"
                                        value={formData.dpiit_cert_number}
                                        onChange={(e) => handleRootChange("dpiit_cert_number", e.target.value)}
                                        placeholder="DPIIT Cert Number"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label>Pitch Deck PDF *</Label>
                                <UploadButton
                                    label="Upload Pitch Deck (PDF)"
                                    accept="application/pdf"
                                    multiple={false}
                                    onUploaded={([url]) => handleRootChange("pitch_deck_url", url ?? null)}
                                />
                                {formData.pitch_deck_url && (
                                    <p className="mt-1 text-sm text-green-600">Uploaded: {formData.pitch_deck_url}</p>
                                )}
                            </div>

                            <div>
                                <Label>Startup Logo *</Label>
                                <UploadButton
                                    label="Upload Startup Logo"
                                    accept="image/*"
                                    multiple={false}
                                    onUploaded={([url]) => handleRootChange("logo_url", url ?? null)}
                                />
                                {formData.logo_url && (
                                    <img
                                        src={formData.logo_url}
                                        alt="Logo Preview"
                                        className="mt-2 w-24 h-24 object-contain border rounded"
                                    />
                                )}
                            </div>

                            <div>
                                <Label>Startup Banner *</Label>
                                <UploadButton
                                    label="Upload Banner Image"
                                    accept="image/*"
                                    multiple={false}
                                    onUploaded={([url]) => handleRootChange("banner", url ?? null)}
                                />
                                {formData.banner && (
                                    <img
                                        src={formData.banner}
                                        alt="Banner Preview"
                                        className="mt-2 w-full h-32 object-cover border rounded"
                                    />
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Address */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Address
                            </CardTitle>
                            <CardDescription>Provide address details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="street">Street Address *</Label>
                                <Input
                                    id="street"
                                    value={formData.address.street}
                                    onChange={(e) => handleNestedChange("address", "street", e.target.value)}
                                    placeholder="Enter street address"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="city">City *</Label>
                                    <Input
                                        id="city"
                                        value={formData.address.city}
                                        onChange={(e) => handleNestedChange("address", "city", e.target.value)}
                                        placeholder="Enter city"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="state">State *</Label>
                                    <Input
                                        id="state"
                                        value={formData.address.state}
                                        onChange={(e) => handleNestedChange("address", "state", e.target.value)}
                                        placeholder="Enter state"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="pincode">Pincode *</Label>
                                    <Input
                                        id="pincode"
                                        value={formData.address.pincode}
                                        onChange={(e) => handleNestedChange("address", "pincode", e.target.value)}
                                        placeholder="Enter pincode"
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Information */}
                    {formData.products.map((product, index) => (
                        <Card key={index} className="mb-6">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>Product #{index + 1}</span>
                                    {formData.products.length > 1 && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleRemoveProduct(index)}
                                            type="button"
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Input
                                    value={product.title}
                                    placeholder="Product Title"
                                    onChange={(e) => handleProductChange(index, "title", e.target.value)}
                                />

                                <Textarea
                                    value={product.description}
                                    placeholder="Product Description"
                                    onChange={(e) => handleProductChange(index, "description", e.target.value)}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Select
                                        value={product.stage}
                                        onValueChange={(value) => handleProductChange(index, "stage", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Stage" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {productStages.map((s) => (
                                                <SelectItem key={s} value={s}>
                                                    {s}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Input
                                        value={product.price}
                                        type="number"
                                        placeholder="Price"
                                        onChange={(e) => handleProductChange(index, "price", Number(e.target.value))}
                                    />

                                    <Input
                                        value={product.quantity}
                                        type="number"
                                        placeholder="Quantity"
                                        onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select
                                        value={product.category}
                                        onValueChange={(value) => handleProductChange(index, "category", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {productCategories.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        value={product.product_type}
                                        onValueChange={(value) => handleProductChange(index, "product_type", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Product Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {productTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Input
                                    value={product.tags}
                                    placeholder="Tags (comma-separated)"
                                    onChange={(e) => handleProductChange(index, "tags", e.target.value)}
                                />

                                <Input
                                    value={product.users.join(", ")}
                                    placeholder="Users (comma-separated, e.g., B2B, FMCG, E-commerce)"
                                    onChange={(e) =>
                                        handleProductChange(
                                            index,
                                            "users",
                                            e.target.value
                                                .split(",")
                                                .map((s) => s.trim())
                                                .filter(Boolean)
                                        )
                                    }
                                />

                                <UploadButton
                                    label="Upload Product Images"
                                    accept="image/*"
                                    multiple
                                    onUploaded={(urls) =>
                                        handleProductChange(
                                            index,
                                            "images",
                                            (urls || []).map((u: string) => ({ url: u }))
                                        )
                                    }
                                />

                                {product.images.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {product.images.map((img, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={img.url}
                                                alt={`Product Image ${imgIndex + 1}`}
                                                className="w-20 h-20 object-cover rounded border"
                                            />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    <Button type="button" onClick={handleAddProduct} variant="outline" className="w-fit">
                        + Add Another Product
                    </Button>

                    {/* Revenue & Funding */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    Revenue Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="revenueBracket">Revenue Bracket *</Label>
                                    <Select
                                        value={formData.revenue_info.revenue_bracket}
                                        onValueChange={(value) => handleNestedChange("revenue_info", "revenue_bracket", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select revenue bracket" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {revenueBrackets.map((bracket) => (
                                                <SelectItem key={bracket} value={bracket}>
                                                    {bracket}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="userImpact">User Impact (Number of Users) *</Label>
                                    <Input
                                        id="userImpact"
                                        type="number"
                                        value={formData.revenue_info.user_impact}
                                        onChange={(e) =>
                                            handleNestedChange(
                                                "revenue_info",
                                                "user_impact",
                                                e.target.value === "" ? 0 : Number(e.target.value)
                                            )
                                        }
                                        placeholder="Enter number of users impacted"
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Funding Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <Label htmlFor="fundingType">Funding Type *</Label>
                                    <Select
                                        value={formData.funding_info.funding_type}
                                        onValueChange={(value) => handleNestedChange("funding_info", "funding_type", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select funding type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fundingTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Event Intent */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Event Participation
                            </CardTitle>
                            <CardDescription>Participation intent</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="whyParticipate">Why participate? *</Label>
                                <Textarea
                                    id="whyParticipate"
                                    value={formData.event_intent.why_participate}
                                    onChange={(e) => handleNestedChange("event_intent", "why_participate", e.target.value)}
                                    placeholder="Explain motivation for participating"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="expectation">Expectations? *</Label>
                                <Textarea
                                    id="expectation"
                                    value={formData.event_intent.expectation}
                                    onChange={(e) => handleNestedChange("event_intent", "expectation", e.target.value)}
                                    placeholder="What is expected from this event?"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="consentToPay"
                                    checked={formData.event_intent.consent_to_pay}
                                    onCheckedChange={(checked) => handleNestedChange("event_intent", "consent_to_pay", Boolean(checked))}
                                />
                                <Label htmlFor="consentToPay">I consent to pay the required fees *</Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    SPOC Details
                                </CardTitle>
                                <CardDescription>Single Point of Contact</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="spoc_name">Name *</Label>
                                    <Input
                                        id="spoc_name"
                                        value={formData.spoc.name}
                                        onChange={(e) => handleNestedChange("spoc", "name", e.target.value)}
                                        placeholder="Enter name"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="spoc_email">Email *</Label>
                                    <Input
                                        id="spoc_email"
                                        type="email"
                                        value={formData.spoc.email}
                                        onChange={(e) => handleNestedChange("spoc", "email", e.target.value)}
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="spoc_phone">Phone *</Label>
                                    <Input
                                        id="spoc_phone"
                                        type="tel"
                                        value={formData.spoc.phone}
                                        onChange={(e) => handleNestedChange("spoc", "phone", e.target.value)}
                                        placeholder="Enter phone"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="spoc_position">Position *</Label>
                                    <Input
                                        id="spoc_position"
                                        value={formData.spoc.position}
                                        onChange={(e) => handleNestedChange("spoc", "position", e.target.value)}
                                        placeholder="Enter position"
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <UserCheck className="h-5 w-5" />
                                    Director Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="director_name">Name *</Label>
                                    <Input
                                        id="director_name"
                                        value={formData.director.name}
                                        onChange={(e) => handleNestedChange("director", "name", e.target.value)}
                                        placeholder="Enter director name"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="director_email">Email *</Label>
                                    <Input
                                        id="director_email"
                                        type="email"
                                        value={formData.director.email}
                                        onChange={(e) => handleNestedChange("director", "email", e.target.value)}
                                        placeholder="Enter director email"
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-6">
                        <Button type="submit" size="lg" className="px-8">
                            Submit Registration
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
