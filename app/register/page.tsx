"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useFormData } from "@/hooks/useFormData";
import { normalizeFormData, submitFormData } from "@/lib/formUtils";
import {
    BasicInfoSection,
    AddressSection,
    ProductSection,
    RevenueFundingSection,
    EventIntentSection,
    ContactSection,
} from "@/components/forms";

export default function StartupRegistrationForm() {
    const {
        formData,
        handleRootChange,
        handleNestedChange,
        handleProductChange,
        handleAddProduct,
        handleRemoveProduct,
    } = useFormData();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = normalizeFormData(formData);
            const result = await submitFormData(payload);
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Startup Registration</h1>
                    <p className="text-gray-600">Register your startup for the event</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Startup Information */}
                    <BasicInfoSection formData={formData} handleRootChange={handleRootChange} />

                    {/* Address */}
                    <AddressSection formData={formData} handleNestedChange={handleNestedChange} />

                    {/* Product Information */}
                    <ProductSection
                        products={formData.products}
                        handleProductChange={handleProductChange}
                        handleAddProduct={handleAddProduct}
                        handleRemoveProduct={handleRemoveProduct}
                    />

                    {/* Revenue & Funding */}
                    <RevenueFundingSection formData={formData} handleNestedChange={handleNestedChange} />

                    {/* Event Intent */}
                    <EventIntentSection formData={formData} handleNestedChange={handleNestedChange} />

                    {/* Contact Information */}
                    <ContactSection formData={formData} handleNestedChange={handleNestedChange} />

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