import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadButton } from "@/components/ui/UploadButtons";
import { Product, ProductImage } from "@/lib/types";
import { productStages, productCategories, productTypes } from "@/lib/constants";

interface ProductSectionProps {
    products: Product[];
    handleProductChange: <F extends keyof Product>(index: number, field: F, value: Product[F]) => void;
    handleAddProduct: () => void;
    handleRemoveProduct: (index: number) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
    products,
    handleProductChange,
    handleAddProduct,
    handleRemoveProduct,
}) => {
    return (
        <>
            {products.map((product, index) => (
                <Card key={index} className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Product #{index + 1}</span>
                            {products.length > 1 && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRemoveProduct(index)}
                                    type="button"
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
                            onChange={(e) => handleProductChange(index, "title", e.target.value)}
                        />

                        <Textarea
                            value={product.description}
                            placeholder="Product Description"
                            onChange={(e) => handleProductChange(index, "description", e.target.value)}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Select
                                value={product.stage}
                                onValueChange={(value) => handleProductChange(index, "stage", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Stage" />
                                </SelectTrigger>
                                <SelectContent>
                                    {productStages.map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Input
                                value={product.price}
                                type="number"
                                placeholder="Price"
                                onChange={(e) => handleProductChange(index, "price", Number(e.target.value))}
                            />

                            <Input
                                value={product.quantity}
                                type="number"
                                placeholder="Quantity"
                                onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select
                                value={product.category}
                                onValueChange={(value) => handleProductChange(index, "category", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {productCategories.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={product.product_type}
                                onValueChange={(value) => handleProductChange(index, "product_type", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Product Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {productTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Input
                            value={product.tags}
                            placeholder="Tags (comma-separated)"
                            onChange={(e) => handleProductChange(index, "tags", e.target.value)}
                        />

                        <Input
                            value={product.users.join(", ")}
                            placeholder="Users (comma-separated, e.g., B2B, FMCG, E-commerce)"
                            onChange={(e) =>
                                handleProductChange(
                                    index,
                                    "users",
                                    e.target.value
                                        .split(",")
                                        .map((s) => s.trim())
                                        .filter(Boolean)
                                )
                            }
                        />

                        <UploadButton
                            label="Upload Product Images and Videos"
                            accept="image/*, video/*"
                            multiple
                            onUploaded={(urls) =>
                                handleProductChange(
                                    index,
                                    "images",
                                    (urls || []).map((u: string) => ({ url: u }))
                                )
                            }
                        />

                        {product.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {product.images.map((item: { url: string; type?: "image" | "video" }, i: number) => {
                                    const url = item.url;
                                    const isVid = item?.type === "video" || /\.(mp4|webm|mov|mkv|ogg)$/i.test(url);

                                    // Build a Cloudinary poster thumbnail from the video by taking a frame at 1s
                                    const poster = isVid
                                        ? url
                                              .replace("/upload/", "/upload/so_1/") // take frame at 1 second
                                              .replace(/\.(mp4|webm|mov|mkv|ogg)(\?.*)?$/i, ".jpg$2") // deliver as image
                                        : undefined;

                                    return isVid ? (
                                        <video
                                            key={i}
                                            src={url}
                                            poster={poster}
                                            className="w-20 h-20 object-cover rounded border"
                                            controls
                                            preload="metadata"
                                            playsInline
                                            muted
                                        />
                                    ) : (
                                        <img
                                            key={i}
                                            src={url}
                                            alt={`Product Media ${i + 1}`}
                                            className="w-20 h-20 object-cover rounded border"
                                            loading="lazy"
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}

            <Button type="button" onClick={handleAddProduct} variant="outline" className="w-fit">
                + Add Another Product
            </Button>
        </>
    );
};
