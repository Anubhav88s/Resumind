import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '../lib/utils'

/**
 * Props for the FileUploader component.
 */


/**
 * FileUploader component.
 * Allows users to upload a PDF resume via drag and drop or clicking.
 *
 * @param {FileUploaderProps} props - The component props.
 * @returns {JSX.Element} The rendered FileUploader.
 */
const FileUploader = ({ onFileSelect }) => {
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full">
            <div {...getRootProps()} className={`uploader-zone group ${isDragActive ? 'active' : ''}`}>
                <input {...getInputProps()} />

                <div className="space-y-6 w-full max-w-md mx-auto">
                    {file ? (
                        <div className="uploader-selected-file animate-in fade-in zoom-in-95 duration-300 border border-white/10 shadow-sm" onClick={(e) => e.stopPropagation()}>
                            <div className="p-3 bg-white/5 rounded-xl">
                                <img src="/images/pdf.png" alt="pdf" className="size-8" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-sm font-semibold text-dark-100 truncate">
                                    {file.name}
                                </p>
                                <p className="text-xs text-dark-200">
                                    {formatSize(file.size)}
                                </p>
                            </div>
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer" onClick={(e) => {
                                e.stopPropagation();
                                onFileSelect?.(null)
                            }}>
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4 opacity-60 hover:opacity-100" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className={`size-20 rounded-full flex items-center justify-center transition-all duration-300 ${isDragActive ? 'bg-primary/10 scale-110' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                <img src="/icons/info.svg" alt="upload" className={`size-10 transition-opacity duration-300 ${isDragActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-lg text-dark-100 font-medium">
                                    <span className="text-primary font-semibold hover:underline">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-sm text-dark-200">PDF (max {formatSize(maxFileSize)})</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader
