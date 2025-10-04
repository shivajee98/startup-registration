import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Users } from "lucide-react";
import { FormData } from "@/lib/types";
import { revenueBrackets, fundingTypes } from "@/lib/constants";

interface RevenueFundingSectionProps {
    formData: FormData;
    handleNestedChange: <K extends keyof FormData>(section: K, key: string, value: any) => void;
}

export const RevenueFundingSection: React.FC<RevenueFundingSectionProps> = ({ formData, handleNestedChange }) => {
    return (
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
    );
};
