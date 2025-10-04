import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/components/ui/UploadButtons";
import { Building2 } from "lucide-react";
import { FormData } from "@/lib/types";

interface BasicInfoSectionProps {
    formData: FormData;
    handleRootChange: (field: keyof FormData, value: string | number | boolean | null) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ formData, handleRootChange }) => {
    return (
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
                        onUploaded={([url]) => handleRootChange("banner_url", url ?? null)}
                    />
                    {formData.banner_url && (
                        <img
                            src={formData.banner_url}
                            alt="Banner Preview"
                            className="mt-2 w-full h-32 object-cover border rounded"
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
