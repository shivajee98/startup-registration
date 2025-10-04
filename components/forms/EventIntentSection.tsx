import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";
import { FormData } from "@/lib/types";

interface EventIntentSectionProps {
    formData: FormData;
    handleNestedChange: <K extends keyof FormData>(section: K, key: string, value: any) => void;
}

export const EventIntentSection: React.FC<EventIntentSectionProps> = ({ formData, handleNestedChange }) => {
    return (
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
    );
};
