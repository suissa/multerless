export function validateUpload(file) {
    if (file.size > 1_048_576) {
        throw new Error("Invariant violated: upload-size-enforced");
    }
    if (!["image/png", "image/jpeg"].includes(file.type)) {
        throw new Error("Invariant violated: invalid-mime-type");
    }
}
//# sourceMappingURL=upload.js.map