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
    pitchDeckURL: "",

    // Address
    street: "",
    city: "",
    state: "",
    pincode: "",

    // Product
    productDescription: "",
    problem: "",
    stage: "",
    selectedUserTypes: [] as string[],

    // Revenue Info
    revenueBracket: "",
    userImpact: "",

    // Funding Info
    fundingType: "",

    // Event Intent
    whyParticipate: "",
    expectation: "",
    consentToPay: false,

    // SPOC
    spocName: "",
    spocEmail: "",
    spocPhone: "",
    spocPosition: "",

    // Director
    directorName: "",
    directorEmail: "",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

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
                <Label htmlFor="dpiitCertNumber">DPIIT Certificate Number *</Label>
                <Input
                  id="dpiitCertNumber"
                  value={formData.dpiitCertNumber}
                  onChange={(e) => handleInputChange("dpiitCertNumber", e.target.value)}
                  placeholder="Enter DPIIT certificate number"
                  required
                />
              </div>
              <div>
                <Label htmlFor="pitchDeckURL">Pitch Deck URL *</Label>
                <div className="flex gap-2">
                  <Input
                    id="pitchDeckURL"
                    value={formData.pitchDeckURL}
                    onChange={(e) => handleInputChange("pitchDeckURL", e.target.value)}
                    placeholder="Upload pitch deck and paste URL"
                    required
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
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
                <Label htmlFor="productDescription">Product Description *</Label>
                <Textarea
                  id="productDescription"
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange("productDescription", e.target.value)}
                  placeholder="Describe your product in detail"
                  rows={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="problem">Problem Statement *</Label>
                <Textarea
                  id="problem"
                  value={formData.problem}
                  onChange={(e) => handleInputChange("problem", e.target.value)}
                  placeholder="What problem does your product solve?"
                  rows={3}
                  required
                />
              </div>
              <div>
                <Label htmlFor="stage">Product Stage *</Label>
                <Select value={formData.stage} onValueChange={(value) => handleInputChange("stage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {productStages.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Target User Types *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {userTypes.map((userType) => (
                    <div key={userType} className="flex items-center space-x-2">
                      <Checkbox
                        id={userType}
                        checked={formData.selectedUserTypes.includes(userType)}
                        onCheckedChange={() => handleUserTypeToggle(userType)}
                      />
                      <Label htmlFor={userType} className="text-sm font-normal">
                        {userType}
                      </Label>
                    </div>
                  ))}
                </div>
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
                    onChange={(e) => handleInputChange("userImpact", e.target.value)}
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
                  <Label htmlFor="spocName">Name *</Label>
                  <Input
                    id="spocName"
                    value={formData.spocName}
                    onChange={(e) => handleInputChange("spocName", e.target.value)}
                    placeholder="Enter SPOC name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="spocEmail">Email *</Label>
                  <Input
                    id="spocEmail"
                    type="email"
                    value={formData.spocEmail}
                    onChange={(e) => handleInputChange("spocEmail", e.target.value)}
                    placeholder="Enter SPOC email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="spocPhone">Phone *</Label>
                  <Input
                    id="spocPhone"
                    type="tel"
                    value={formData.spocPhone}
                    onChange={(e) => handleInputChange("spocPhone", e.target.value)}
                    placeholder="Enter SPOC phone"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="spocPosition">Position *</Label>
                  <Input
                    id="spocPosition"
                    value={formData.spocPosition}
                    onChange={(e) => handleInputChange("spocPosition", e.target.value)}
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
