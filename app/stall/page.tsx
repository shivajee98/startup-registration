"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, MapPin, Users, Phone, Mail, Globe, Award, TrendingUp, Target, Lightbulb } from "lucide-react"

// Sample data based on the GORM model
const companyData = {
    name: "TechVenture Solutions",
    websiteURL: "https://techventure.com",
    dpiitCertNumber: "DPIIT12345",
    address: {
        street: "123 Innovation Street",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
    },
    products: [
        {
            id: 1,
            name: "EduTech Platform",
            description: "AI-powered learning management system that personalizes education for students and teachers",
            problem: "Traditional education lacks personalization and real-time progress tracking",
            stage: "MVP",
            userTypes: ["Students", "Teachers"],
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            id: 2,
            name: "Smart Analytics Dashboard",
            description: "Business intelligence tool that provides actionable insights from educational data",
            problem: "Educational institutions struggle with data-driven decision making",
            stage: "Beta",
            userTypes: ["Businesses", "Professionals"],
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            id: 3,
            name: "Mobile Learning App",
            description: "Gamified mobile application for skill development and certification",
            problem: "Limited access to quality education on mobile devices",
            stage: "Production",
            userTypes: ["Students", "General Public"],
            image: "/placeholder.svg?height=200&width=300",
        },
    ],
    revenueInfo: {
        bracket: "₹25L–₹1Cr",
        userImpact: 50000,
    },
    fundingInfo: {
        type: "Angel",
    },
    spoc: {
        name: "Rajesh Kumar",
        email: "rajesh@techventure.com",
        phone: "+91-9876543210",
        position: "CEO & Founder",
    },
    director: {
        name: "Priya Sharma",
        email: "priya@techventure.com",
    },
}

const StallDemo = () => {
    const [selectedProduct, setSelectedProduct] = useState(companyData.products[0])

    return (
        <div className="w-screen min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Company Name Board */}
            <div className="w-full h-[15vh] flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="flex flex-col items-center">
                    <div className="w-[60vh] lg:h-8 h-5 flex justify-between mb-2">
                        <div className="h-full w-[3px] bg-white"></div>
                        <div className="h-full w-[3px] bg-white"></div>
                    </div>
                    <div className="bg-white h-[8vh] w-[70vh] flex justify-center items-center rounded-lg shadow-lg">
                        <div className="lg:text-4xl text-xl font-bold text-gray-800">{companyData.name}</div>
                    </div>
                </div>
            </div>

            {/* Company Banner with Key Stats */}
            <div className="w-full h-[20vh] bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
                    <div className="text-center">
                        <div className="text-2xl font-bold">{companyData.revenueInfo.userImpact.toLocaleString()}</div>
                        <div className="text-sm opacity-80">Users Impacted</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">{companyData.products.length}</div>
                        <div className="text-sm opacity-80">Products</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">{companyData.revenueInfo.bracket}</div>
                        <div className="text-sm opacity-80">Revenue</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold">{companyData.fundingInfo.type}</div>
                        <div className="text-sm opacity-80">Funding</div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="h-auto min-h-[65vh] w-full flex flex-col lg:flex-row">
                {/* Left Side - Main Content */}
                <div className="h-full w-full lg:w-[75vw] p-6">
                    <Tabs defaultValue="products" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="products">Products</TabsTrigger>
                            <TabsTrigger value="company">Company</TabsTrigger>
                            <TabsTrigger value="team">Team</TabsTrigger>
                            <TabsTrigger value="contact">Contact</TabsTrigger>
                        </TabsList>

                        <TabsContent value="products" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {companyData.products.map((product) => (
                                    <Card
                                        key={product.id}
                                        className={`cursor-pointer transition-all hover:shadow-lg ${selectedProduct.id === product.id ? "ring-2 ring-blue-500" : ""
                                            }`}
                                        onClick={() => setSelectedProduct(product)}
                                    >
                                        <CardHeader className="pb-2">
                                            <Image
                                                src={product.image || "/placeholder.svg"}
                                                alt={product.name}
                                                width={300}
                                                height={200}
                                                className="w-full h-32 object-cover rounded-md"
                                            />
                                        </CardHeader>
                                        <CardContent>
                                            <CardTitle className="text-lg">{product.name}</CardTitle>
                                            <Badge variant="secondary" className="mt-2">
                                                {product.stage}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Selected Product Details */}
                            <Card className="w-full">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Lightbulb className="h-5 w-5" />
                                        {selectedProduct.name}
                                    </CardTitle>
                                    <div className="flex gap-2">
                                        <Badge>{selectedProduct.stage}</Badge>
                                        {selectedProduct.userTypes.map((type) => (
                                            <Badge key={type} variant="outline">
                                                {type}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-2">Product Description</h4>
                                        <p className="text-gray-600">{selectedProduct.description}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Target className="h-4 w-4" />
                                            Problem Solved
                                        </h4>
                                        <p className="text-gray-600">{selectedProduct.problem}</p>
                                    </div>
                                    <Image
                                        src={selectedProduct.image || "/placeholder.svg"}
                                        alt={selectedProduct.name}
                                        width={600}
                                        height={300}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="company" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Building2 className="h-5 w-5" />
                                            Company Overview
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Award className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm">DPIIT Certified: {companyData.dpiitCertNumber}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-green-500" />
                                            <a href={companyData.websiteURL} className="text-sm text-blue-600 hover:underline">
                                                {companyData.websiteURL}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-red-500" />
                                            <span className="text-sm">
                                                {companyData.address.city}, {companyData.address.state}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5" />
                                            Business Metrics
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Revenue Bracket:</span>
                                            <span className="text-sm font-semibold">{companyData.revenueInfo.bracket}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Users Impacted:</span>
                                            <span className="text-sm font-semibold">
                                                {companyData.revenueInfo.userImpact.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Funding Type:</span>
                                            <span className="text-sm font-semibold">{companyData.fundingInfo.type}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Complete Address</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        {companyData.address.street}
                                        <br />
                                        {companyData.address.city}, {companyData.address.state} - {companyData.address.pincode}
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="team" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="h-5 w-5" />
                                            Single Point of Contact
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div>
                                            <h4 className="font-semibold">{companyData.spoc.name}</h4>
                                            <p className="text-sm text-gray-600">{companyData.spoc.position}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm">{companyData.spoc.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-green-500" />
                                            <span className="text-sm">{companyData.spoc.phone}</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="h-5 w-5" />
                                            Director
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div>
                                            <h4 className="font-semibold">{companyData.director.name}</h4>
                                            <p className="text-sm text-gray-600">Director</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm">{companyData.director.email}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="contact" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Get in Touch</CardTitle>
                                    <CardDescription>
                                        Interested in our products? Let's connect and discuss how we can help your business.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Button className="w-full">
                                            <Mail className="h-4 w-4 mr-2" />
                                            Send Email
                                        </Button>
                                        <Button variant="outline" className="w-full bg-transparent">
                                            <Phone className="h-4 w-4 mr-2" />
                                            Schedule Call
                                        </Button>
                                    </div>
                                    <div className="pt-4 border-t">
                                        <h4 className="font-semibold mb-2">Quick Contact</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                <span>{companyData.spoc.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                <span>{companyData.spoc.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4" />
                                                <a href={companyData.websiteURL} className="text-blue-600 hover:underline">
                                                    {companyData.websiteURL}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
                {/* Right Side - Avatar and Branding */}
                <div className="h-full w-[25vw] border border-white relative max-sm:hidden flex flex-1 justify-center">

                    {/* Image of the avatar */}
                    <div className="absolute  z-1 bottom-0">
                        <Image
                            src={"/avatar.png"}
                            alt="erv"
                            height={220}
                            width={230}
                            className="h-[60vh] lg:h-[52vh] "
                        />
                    </div>

                    {/* Table Image as background */}
                    <div className="absolute z-5 lg:bottom-[-65px] bottom-[-55px] ">
                        <Image
                            src={"/table.png"}
                            alt="Table"
                            width={500}
                            height={100}
                            className="object-fit lg:h-[70vh] h-[90vh]"
                        />
                    </div>

                    <div className="absolute z-10 bottom-0 ">
                        <Image
                            src={"/opexn_logo.png"}
                            width={120}
                            height={50}
                            alt="logo"
                            className="lg:h-[25vh] lg:w-[30vh]"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default StallDemo
