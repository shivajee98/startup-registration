import React, { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { uploadToCloudinary } from "@/app/register/upload"

interface UploadButtonProps {
    label?: string
    multiple?: boolean
    accept?: string // e.g., image/*, application/pdf
    onUploaded: (urls: string[]) => void
}

export function UploadButton({
    label = "Upload File",
    multiple = false,
    accept,
    onUploaded,
}: UploadButtonProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleButtonClick = () => {
        if (inputRef.current) inputRef.current.value = ""; // Reset for same-file reupload
        inputRef.current?.click()
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)
        try {
            const urls = []
            for (const file of Array.from(files)) {
                const url = await uploadToCloudinary(file)
                urls.push(url)
            }
            onUploaded(urls)
        } catch (err) {
            alert("One or more file uploads failed!")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <>
            <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                multiple={multiple}
                accept={accept}
                onChange={handleChange}
            />
            <Button type="button" onClick={handleButtonClick} disabled={isUploading}>
                {isUploading ? "Uploading..." : label}
            </Button>
        </>
    )
}
