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

interface Product {
    title: string;
    price: string; // you may want number type if you parse it before submission
    quantity: string;
    category: string;
    tags: string;
    productType: string;
    images: string[]; // Storing uploaded URLs as strings here
}

interface FormData {
    name: string;
    websiteURL: string;
    dpiitCertNumber: string;
    pitchDeck: string | null; // URL of uploaded file
    logo: string | null; // URL
    banner: string | null; // URL

    street: string;
    city: string;
    state: string;
    pincode: string;

    products: Product[];

    revenueBracket: string;
    userImpact: number;

    fundingType: string;

    whyParticipate: string;
    expectation: string;
    consentToPay: boolean;

    Name: string;
    Email: string;
    Phone: string;
    Position: string;

    directorName: string;
    directorEmail: string;
}

export default function StartupRegistrationForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        websiteURL: "",
        dpiitCertNumber: "",
        pitchDeck: null,
        logo: null,
        banner: null,

        street: "",
        city: "",
        state: "",
        pincode: "",

        products: [
            {
                title: "",
                price: "",
                quantity: "",
                category: "",
                tags: "",
                productType: "",
                images: [],
            },
        ],

        revenueBracket: "",
        userImpact: 0,

        fundingType: "",

        whyParticipate: "",
        expectation: "",
        consentToPay: false,

        Name: "",
        Email: "",
        Phone: "",
        Position: "",

        directorName: "",
        directorEmail: "",
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

    // If you want to implement userType toggling, you need to add selectedUserTypes to state
    // For now commenting out as it’s unused
    /*
    const handleUserTypeToggle = (userType: string) => {
      setFormData((prev) => {
        const selectedUserTypes = (prev as any).selectedUserTypes as string[] || [];
        return {
          ...prev,
          selectedUserTypes: selectedUserTypes.includes(userType)
            ? selectedUserTypes.filter((type) => type !== userType)
            : [...selectedUserTypes, userType],
        };
      });
    };
    */

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
                    price: "",
                    quantity: "",
                    category: "",
                    tags: "",
                    productType: "",
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

        // 1. Convert products
        const parsedProducts = formData.products.map((product) => ({
            title: product.title,
            price: parseFloat(product.price),
            quantity: parseInt(product.quantity),
            category: product.category,
            tags: product.tags,
            productType: product.productType,
            images: product.images.map((url) => ({ url })), // Wrap each URL in an object
            userTypes: [], // Fill this if needed
        }));

        // 2. Construct the backend payload
        const payload = {
            name: formData.name,
            websiteURL: formData.websiteURL,
            dpiitCertNumber: formData.dpiitCertNumber,

            pitchDeck: formData.pitchDeck,
            logo: formData.logo,
            banner: formData.banner,

            address: {
                street: formData.street,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
            },

            products: parsedProducts,

            revenueInfo: {
                revenueBracket: formData.revenueBracket,
                userImpact: formData.userImpact,
            },

            fundingInfo: {
                fundingType: formData.fundingType,
            },

            eventIntent: {
                whyParticipate: formData.whyParticipate,
                expectation: formData.expectation,
                consentToPay: formData.consentToPay,
            },

            spoc: {
                Name: formData.Name,
                Email: formData.Email,
                Phone: formData.Phone,
                Position: formData.Position,
            },

            director: {
                directorName: formData.directorName,
                directorEmail: formData.directorEmail,
            },
        };

        try {
            const res = await fetch("http://localhost:8000/api/startup/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

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
                                        value={formData.websiteURL}
                                        onChange={(e) =>
                                            handleInputChange("websiteURL", e.target.value)
                                        }
                                        placeholder="https://yourwebsite.com"
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
                                {formData.pitchDeck && (
                                    <p className="mt-1 text-sm text-green-600">
                                        Uploaded: {formData.pitchDeck}
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
                                    value={product.productType}
                                    onValueChange={(value) =>
                                        handleProductChange(index, "productType", value)
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
                                        value={formData.revenueBracket}
                                        onValueChange={(value) =>
                                            handleInputChange("revenueBracket", value)
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
                                        value={formData.userImpact}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "userImpact",
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
                                        value={formData.fundingType}
                                        onValueChange={(value) =>
                                            handleInputChange("fundingType", value)
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
                                    value={formData.whyParticipate}
                                    onChange={(e) => handleInputChange("whyParticipate", e.target.value)}
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
                                    checked={formData.consentToPay}
                                    onCheckedChange={(checked) =>
                                        handleInputChange("consentToPay", checked as boolean)
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
                                        id="Name"
                                        value={formData.Name}
                                        onChange={(e) => handleInputChange("Name", e.target.value)}
                                        placeholder="Enter  name"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="Email">Email *</Label>
                                    <Input
                                        id="Email"
                                        type="email"
                                        value={formData.Email}
                                        onChange={(e) => handleInputChange("Email", e.target.value)}
                                        placeholder="Enter  email"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="Phone">Phone *</Label>
                                    <Input
                                        id="Phone"
                                        type="tel"
                                        value={formData.Phone}
                                        onChange={(e) => handleInputChange("Phone", e.target.value)}
                                        placeholder="Enter SPOC phone"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="Position">Position *</Label>
                                    <Input
                                        id="Position"
                                        value={formData.Position}
                                        onChange={(e) => handleInputChange("Position", e.target.value)}
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
                                        id="directorName"
                                        value={formData.directorName}
                                        onChange={(e) =>
                                            handleInputChange("directorName", e.target.value)
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
                                        value={formData.directorEmail}
                                        onChange={(e) =>
                                            handleInputChange("directorEmail", e.target.value)
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
