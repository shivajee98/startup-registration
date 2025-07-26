import React, { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { uploadToCloudinary } from "@/app/register/upload"

interface UploadButtonProps {
    label?: string
    multiple?: boolean
    accept?: string
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
    const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([])
    const [disabledAfterUpload, setDisabledAfterUpload] = useState(false)

    const handleButtonClick = () => {
        if (disabledAfterUpload) return
        if (inputRef.current) inputRef.current.value = "" // allow re-select
        inputRef.current?.click()
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)
        try {
            const urls = []
            const names = []

            for (const file of Array.from(files)) {
                const url = await uploadToCloudinary(file)
                urls.push(url)
                names.push(file.name)
            }

            setUploadedFileNames(names)
            setDisabledAfterUpload(true)
            onUploaded(urls)
        } catch (err) {
            alert("One or more file uploads failed!")
        } finally {
            setIsUploading(false)
        }
    }

    const handleReset = () => {
        setUploadedFileNames([])
        setDisabledAfterUpload(false)
        if (inputRef.current) inputRef.current.value = ""
        onUploaded([]) // Optional: Clear the parent state
    }

    return (
        <div className="flex flex-col gap-2">
            <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                multiple={multiple}
                accept={accept}
                onChange={handleChange}
            />
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    onClick={handleButtonClick}
                    disabled={isUploading || disabledAfterUpload}
                >
                    {isUploading
                        ? "Uploading..."
                        : uploadedFileNames.length > 0
                            ? "Uploaded ✅"
                            : label}
                </Button>

                {uploadedFileNames.length > 0 && (
                    <>
                        <span className="text-sm text-green-700 truncate max-w-[200px]">
                            {uploadedFileNames.join(", ")}
                        </span>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={handleReset}
                            className="text-xs px-2"
                        >
                            Change File
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}
