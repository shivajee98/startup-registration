import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { FormData } from "@/lib/types";

interface AddressSectionProps {
    formData: FormData;
    handleNestedChange: <K extends keyof FormData>(section: K, key: string, value: any) => void;
}

export const AddressSection: React.FC<AddressSectionProps> = ({ formData, handleNestedChange }) => {
    return (
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
    );
};
