/**
 * Result of a PDF to image conversion.
 */

let pdfjsLib = null;
let isLoading = false;
let loadPromise = null;

/**
 * Loads the PDF.js library dynamically.
 * Ensures the library is loaded only once.
 *
 * @returns {Promise<any>} The loaded PDF.js library.
 */
async function loadPdfJs() {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
        // Set the worker source to use local file
        lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        pdfjsLib = lib;
        isLoading = false;
        return lib;
    });

    return loadPromise;
}

/**
 * Converts the first page of a PDF file to a PNG image.
 *
 * @param {File} file - The PDF file to convert.
 * @returns {Promise<PdfConversionResult>} The conversion result containing the image URL and file.
 */
export async function convertPdfToImage(file) {
    try {
        const lib = await loadPdfJs();
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await lib.getDocument(arrayBuffer).promise;
        const page = await pdf.getPage(1);
        const scale = 1.5;

        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (context) {
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
        }

        await page.render({ canvasContext: context, viewport }).promise;

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob",
                        });
                    }
                },
                "image/png",
                1.0
            );
        });
    } catch (err) {
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${err}`,
        };
    }
}
