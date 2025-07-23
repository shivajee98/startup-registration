"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Building2, MapPin, Package, DollarSign, Users, FileText, User, UserCheck } from "lucide-react"
import { uploadToCloudinary } from "./upload"
import { UploadButton } from "@/components/ui/UploadButtons"

const revenueBrackets = ["₹0–₹5L", "₹5–₹25L", "₹25L–₹1Cr", "₹1Cr–₹5Cr", "₹5Cr+"]

const fundingTypes = ["Angel", "VC", "Government", "Bootstrapped", "None"]

const productStages = ["Idea", "Prototype", "MVP", "Beta", "Production"]

const userTypes = ["Students", "Teachers", "Professionals", "Businesses", "General Public"]

export default function StartupRegistrationForm() {
    const [formData, setFormData] = useState({
        // Startup basic info
        name: "",
        websiteURL: "",
        dpiitCertNumber: "",
        pitchDeck: null,
        logo: null,
        banner: null,
        // Address
        street: "",
        city: "",
        state: "",
        pincode: "",

        // Product
        title: "",
        productDescription: "",
        problem: "",
        stage: "",
        selectedUserTypes: [] as string[],
        price: "",
        quantity: "",
        category: "",
        tags: "",
        productType: "",
        images: [],

        // Revenue Info
        revenueBracket: "",
        userImpact: 0,

        // Funding Info
        fundingType: "",

        // Event Intent
        whyParticipate: "",
        expectation: "",
        consentToPay: false,

        // SPOC
        Name: "",
        Email: "",
        Phone: "",
        Position: "",

        // Director
        directorName: "",
        directorEmail: "",
    })

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleUserTypeToggle = (userType: string) => {
        setFormData((prev) => ({
            ...prev,
            selectedUserTypes: prev.selectedUserTypes.includes(userType)
                ? prev.selectedUserTypes.filter((type) => type !== userType)
                : [...prev.selectedUserTypes, userType],
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch("http://localhost:8000/api/startup/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                const errText = await res.text()
                throw new Error(`Server responded with ${res.status}: ${errText}`)
            }

            const result = await res.json()
            console.log("Success:", result)
            alert("Registration successful!")
        } catch (error) {
            console.error("Submission failed:", error)
            alert("Something went wrong during submission.")
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const uploadedUrl = await uploadToCloudinary(file);
            setFormData((prev) => ({ ...prev, pitchDeckURL: uploadedUrl }));
        } catch (err) {
            console.error("Upload failed", err);
            alert("Upload failed");
        }
    };


    const handleFileChange = (key: keyof typeof formData, files: FileList | null) => {
        if (!files) return;

        setFormData((prev) => ({
            ...prev,
            [key]: key === "images" ? Array.from(files) : files[0], // images = multiple, rest = single
        }));
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
                            <CardDescription>Provide basic details about your startup</CardDescription>
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
                                        onChange={(e) => handleInputChange("websiteURL", e.target.value)}
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
                                    onUploaded={([url]) => setFormData(fd => ({ ...fd, pitchDeck: url }))}
                                />
                            </div>

                            <div>
                                <Label>Startup Logo *</Label>
                                <UploadButton
                                    label="Upload Startup Logo"
                                    accept="image/*"
                                    multiple={false}
                                    onUploaded={([url]) => setFormData(fd => ({ ...fd, pitchDeck: url }))}
                                />
                                {formData.logo && (
                                    <img
                                        src={URL.createObjectURL(formData.logo)}
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
                                    onUploaded={([url]) => setFormData(fd => ({ ...fd, pitchDeck: url }))}
                                />
                                {formData.banner && (
                                    <img
                                        src={URL.createObjectURL(formData.banner)}
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
                            <CardDescription>Provide your startup's address details</CardDescription>
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
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5" />
                                Product Information
                            </CardTitle>
                            <CardDescription>Tell us about your product and target users</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Product Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="price">Price (INR) *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange("price", e.target.value)}
                                        placeholder="Eg. 499.99"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="quantity">Stock Quantity *</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        min="1"
                                        value={formData.quantity}
                                        onChange={(e) => handleInputChange("quantity", e.target.value)}
                                        placeholder="Eg. 20"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="category">Category *</Label>
                                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["Electronics", "Health", "Software", "Education", "Fashion", "Other"].map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="tags">Tags (comma-separated)</Label>
                                <Input
                                    id="tags"
                                    value={formData.tags}
                                    onChange={(e) => handleInputChange("tags", e.target.value)}
                                    placeholder="Eg. AI, SaaS, Health"
                                />
                            </div>

                            <div>
                                <Label htmlFor="productType">Product Type *</Label>
                                <Select value={formData.productType} onValueChange={(value) => handleInputChange("productType", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["Physical", "Digital", "Service"].map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Product Images *</Label>
                                <UploadButton
                                    label="Upload Product Images"
                                    accept="image/*"
                                    multiple={true}
                                    onUploaded={([url]) => setFormData(fd => ({ ...fd, pitchDeck: url }))}
                                />
                                {formData.images.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={URL.createObjectURL(img)}
                                                alt={`Product ${index}`}
                                                className="w-24 h-24 object-cover border rounded"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                        </CardContent>
                    </Card>

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
                                        onValueChange={(value) => handleInputChange("revenueBracket", value)}
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
                                        onChange={(e) => handleInputChange("userImpact", parseInt(e.target.value))}
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
                                        onValueChange={(value) => handleInputChange("fundingType", value)}
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
                            <CardDescription>Tell us about your participation intent</CardDescription>
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
                                    onCheckedChange={(checked) => handleInputChange("consentToPay", checked as boolean)}
                                />
                                <Label htmlFor="consentToPay">I consent to pay the required fees for participation *</Label>
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
                                        onChange={(e) => handleInputChange("directorName", e.target.value)}
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
                                        onChange={(e) => handleInputChange("directorEmail", e.target.value)}
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
    )
}
