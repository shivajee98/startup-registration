import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, UserCheck } from "lucide-react";
import { FormData } from "@/lib/types";

interface ContactSectionProps {
    formData: FormData;
    handleNestedChange: <K extends keyof FormData>(section: K, key: string, value: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ formData, handleNestedChange }) => {
    return (
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
    );
};
