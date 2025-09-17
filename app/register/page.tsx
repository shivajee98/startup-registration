"use client";

import React, { useState } from "react";
import {
    Button,
} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Building2,
    MapPin,
    DollarSign,
    Users,
    FileText,
    User,
    UserCheck,
} from "lucide-react";
import { UploadButton } from "@/components/ui/UploadButtons";
import { log } from "console";

const revenueBrackets = [
    "₹0–₹5L",
    "₹5–₹25L",
    "₹25L–₹1Cr",
    "₹1Cr–₹5Cr",
    "₹5Cr+",
];

const fundingTypes = ["Angel", "VC", "Government", "Bootstrapped", "None"];

const productStages = ["Idea", "Prototype", "MVP", "Beta", "Production"];

const userTypes = ["Students", "Teachers", "Professionals", "Businesses", "General Public"];

// --- Product ---
interface ProductImage {
    url: string;
}

interface Product {
    title: string;
    stage: string;             // Added (missing in your version)
    users: string[];           // Added (missing in your version)
    price: number;             // Changed from string -> number
    quantity: number;          // Changed from string -> number
    category: string;
    description: string;
    tags: string;
    product_type: string;
    images: ProductImage[];    // Changed from string[] -> { url: string }[]
}

// --- Address ---
interface Address {
    street: string;
    city: string;
    state: string;
    pincode: string;
}

// --- Director ---
interface Director {
    name: string;
    email: string;
}

// --- Event Intent ---
interface EventIntent {
    why_participate: string;
    expectation: string;
    consent_to_pay: boolean;
}

// --- Funding Info ---
interface FundingInfo {
    funding_type: string;
}

// --- Revenue Info ---
interface RevenueInfo {
    revenue_bracket: string;
    user_impact: number;
}

// --- SPOC ---
interface Spoc {
    name: string;
    email: string;
    phone: string;
    position: string;
}

// --- Root Form Data ---
interface FormData {
    name: string;
    website_url: string;
    dpiit_cert_number: string;
    pitch_deck_url: string | null;   // Renamed
    logo_url: string | null;         // Renamed
    banner: string | null;

    address: Address;                // Nested

    director: Director;              // Nested

    event_intent: EventIntent;       // Nested

    funding_info: FundingInfo;       // Nested

    revenue_info: RevenueInfo;       // Nested

    spoc: Spoc;                      // Nested

    products: Product[];
}


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

        products: [],
    });

    const handleInputChange = (
        field: keyof FormData,
        value: string | boolean | number | null
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleProductChange = (
        index: number,
        field: keyof Product,
        value: string | string[]
    ) => {
        setFormData((prev) => {
            const updatedProducts = [...prev.products];
            updatedProducts[index] = {
                ...updatedProducts[index],
                [field]: value,
            };
            return { ...prev, products: updatedProducts };
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
        setFormData((prev) => {
            const filteredProducts = prev.products.filter((_, i) => i !== index);
            return { ...prev, products: filteredProducts };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedProducts = formData.products.map((product) => ({
            title: product.title,
            stage: product.stage || "",         // ✅ Add stage
            users: product.users || [],         // ✅ Keep users consistent
            price: parseFloat(product.price),
            quantity: parseInt(product.quantity, 10),
            category: product.category,
            description: product.description,
            tags: product.tags,
            product_type: product.product_type,
            images: product.images.map((url) => ({ url })),
        }));

        const payload = {
            name: formData.name,
            website_url: formData.website_url,
            dpiit_cert_number: formData.dpiit_cert_number,
            pitch_deck_url: formData.pitch_deck,   // ✅ but really you should rename field
            logo_url: formData.logo,               // ✅ same here
            banner: formData.banner,

            address: {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
            },

            director: {
                name: formData.director_name,
                email: formData.director_email,
            },

            event_intent: {
                why_participate: formData.why_participate,
                expectation: formData.expectation,
                consent_to_pay: formData.consent_to_pay,
            },

            funding_info: {
                funding_type: formData.funding_type,
            },

            revenue_info: {
                revenue_bracket: formData.revenue_bracket,
                user_impact: formData.userimpact,
            },

            spoc: {
                name: formData.spoc.name,
                email: formData.spoc.email,
                phone: formData.spoc.phone,
                position: formData.spoc.position,
            },

            products: parsedProducts,
        };

        console.log("Submitting payload:", payload);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Startup Registration
                    </h1>
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
                            <CardDescription>
                                Provide basic details about your startup
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Startup Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
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
                                        onChange={(e) =>
                                            handleInputChange("website_url", e.target.value)
                                        }
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="dpiit_cert_number">DPIIT Number</Label>
                                    <Input
                                        id="dpiit_cert_number"
                                        type="string"
                                        value={formData.dpiit_cert_number}
                                        onChange={(e) =>
                                            handleInputChange("dpiit_cert_number", e.target.value)
                                        }
                                        placeholder="DPIIT CertNumber"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label>Pitch Deck PDF *</Label>
                                <UploadButton
                                    label="Upload Pitch Deck (PDF)"
                                    accept="application/pdf"
                                    multiple={false}
                                    onUploaded={([url]) =>
                                        setFormData((fd) => ({ ...fd, pitchDeck: url }))
                                    }
                                />
                                {formData.pitch_deck && (
                                    <p className="mt-1 text-sm text-green-600">
                                        Uploaded: {formData.pitch_deck}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label>Startup Logo *</Label>
                                <UploadButton
                                    label="Upload Startup Logo"
                                    accept="image/*"
                                    multiple={false}
                                    onUploaded={([url]) =>
                                        setFormData((fd) => ({ ...fd, logo: url }))
                                    }
                                />
                                {formData.logo && (
                                    <img
                                        src={formData.logo}
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
                                    onUploaded={([url]) =>
                                        setFormData((fd) => ({ ...fd, banner: url }))
                                    }
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

                    {/* Address Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Address
                            </CardTitle>
                            <CardDescription>
                                Provide your startup's address details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="street">Street Address *</Label>
                                <Input
                                    id="street"
                                    value={formData.street}
                                    onChange={(e) => handleInputChange("street", e.target.value)}
                                    placeholder="Enter street address"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="city">City *</Label>
                                    <Input
                                        id="city"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange("city", e.target.value)}
                                        placeholder="Enter city"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="state">State *</Label>
                                    <Input
                                        id="state"
                                        value={formData.state}
                                        onChange={(e) => handleInputChange("state", e.target.value)}
                                        placeholder="Enter state"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="pincode">Pincode *</Label>
                                    <Input
                                        id="pincode"
                                        value={formData.pincode}
                                        onChange={(e) => handleInputChange("pincode", e.target.value)}
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
                                    onChange={(e) =>
                                        handleProductChange(index, "title", e.target.value)
                                    }
                                />
                                <Input
                                    value={product.description}
                                    placeholder="Product Description"
                                    onChange={(e) =>
                                        handleProductChange(index, "description", e.target.value)
                                    }
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        value={product.price}
                                        type="number"
                                        placeholder="Price"
                                        onChange={(e) =>
                                            handleProductChange(index, "price", e.target.value)
                                        }
                                    />
                                    <Input
                                        value={product.quantity}
                                        type="number"
                                        placeholder="Quantity"
                                        onChange={(e) =>
                                            handleProductChange(index, "quantity", e.target.value)
                                        }
                                    />
                                </div>
                                <Input
                                    value={product.tags}
                                    placeholder="Tags"
                                    onChange={(e) =>
                                        handleProductChange(index, "tags", e.target.value)
                                    }
                                />
                                <Select
                                    value={product.category}
                                    onValueChange={(value) =>
                                        handleProductChange(index, "category", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[
                                            "Electronics",
                                            "Health",
                                            "Software",
                                            "Education",
                                            "Fashion",
                                            "Other",
                                        ].map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={product.product_type}
                                    onValueChange={(value) =>
                                        handleProductChange(index, "product_type", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Product Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["Physical", "Digital", "Service"].map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <UploadButton
                                    label="Upload Product Images"
                                    accept="image/*"
                                    multiple
                                    onUploaded={(urls) =>
                                        handleProductChange(index, "images", urls)
                                    }
                                />
                                {product.images.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {product.images.map((url, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={url}
                                                alt={`Product Image ${imgIndex + 1}`}
                                                className="w-20 h-20 object-cover rounded border"
                                            />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}

                    <Button
                        type="button"
                        onClick={handleAddProduct}
                        variant="outline"
                        className="w-fit"
                    >
                        + Add Another Product
                    </Button>

                    {/* Revenue & Funding Information */}
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
                                        value={formData.revenue_bracket}
                                        onValueChange={(value) =>
                                            handleInputChange("revenue_bracket", value)
                                        }
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
                                        value={formData.user_impact}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "user_impact",
                                                e.target.value === "" ? 0 : parseInt(e.target.value)
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
                                        value={formData.funding_type}
                                        onValueChange={(value) =>
                                            handleInputChange("funding_type", value)
                                        }
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
                            <CardDescription>
                                Tell us about your participation intent
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="whyParticipate">Why do you want to participate? *</Label>
                                <Textarea
                                    id="whyParticipate"
                                    value={formData.why_participate}
                                    onChange={(e) => handleInputChange("why_participate", e.target.value)}
                                    placeholder="Explain your motivation for participating"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="expectation">What are your expectations? *</Label>
                                <Textarea
                                    id="expectation"
                                    value={formData.expectation}
                                    onChange={(e) => handleInputChange("expectation", e.target.value)}
                                    placeholder="What do you expect from this event?"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="consentToPay"
                                    checked={formData.consent_to_pay}
                                    onCheckedChange={(checked) =>
                                        handleInputChange("consent_to_pay", checked as boolean)
                                    }
                                />
                                <Label htmlFor="consentToPay">
                                    I consent to pay the required fees for participation *
                                </Label>
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
                                    <Label htmlFor="Name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.spoc_name}
                                        onChange={(e) => handleInputChange("spoc_name", e.target.value)}
                                        placeholder="Enter  name"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="Email">Email *</Label>
                                    <Input
                                        id="Email"
                                        type="email"
                                        value={formData.spoc_email}
                                        onChange={(e) => handleInputChange("spoc_email", e.target.value)}
                                        placeholder="Enter  email"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="Phone">Phone *</Label>
                                    <Input
                                        id="Phone"
                                        type="tel"
                                        value={formData.spoc_phone}
                                        onChange={(e) => handleInputChange("spoc_phone", e.target.value)}
                                        placeholder="Enter SPOC phone"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="Position">Position *</Label>
                                    <Input
                                        id="Position"
                                        value={formData.spoc_position}
                                        onChange={(e) => handleInputChange("spoc_position", e.target.value)}
                                        placeholder="Enter SPOC position"
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
                                    <Label htmlFor="directorName">Name *</Label>
                                    <Input
                                        id="director_name"
                                        value={formData.director_name}
                                        onChange={(e) =>
                                            handleInputChange("director_name", e.target.value)
                                        }
                                        placeholder="Enter director name"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="directorEmail">Email *</Label>
                                    <Input
                                        id="directorEmail"
                                        type="email"
                                        value={formData.director_email}
                                        onChange={(e) =>
                                            handleInputChange("director_email", e.target.value)
                                        }
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
