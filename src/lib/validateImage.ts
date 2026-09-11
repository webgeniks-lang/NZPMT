import fs from 'fs'

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'])

const SIGNATURES: { bytes: number[]; offset?: number }[] = [
  { bytes: [0xff, 0xd8, 0xff] },                                      // JPEG
  { bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },      // PNG
  { bytes: [0x47, 0x49, 0x46, 0x38] },                                // GIF
  { bytes: [0x52, 0x49, 0x46, 0x46] },                                // WebP (RIFF)
  { bytes: [0x42, 0x4d] },                                            // BMP
]

function matchesMagic(buffer: Buffer, sig: typeof SIGNATURES[0]): boolean {
  const offset = sig.offset ?? 0
  if (buffer.length < offset + sig.bytes.length) return false
  return sig.bytes.every((b, i) => buffer[offset + i] === b)
}

export async function validateImageUpload(filePath: string, originalName: string, mimeType: string): Promise<void> {
  const ext = ('.' + (originalName.split('.').pop() || '')).toLowerCase()

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error(`File type not allowed. Accepted formats: JPG, PNG, GIF, WebP, BMP. For videos, upload to YouTube and paste the link.`)
  }

  if (!mimeType.startsWith('image/')) {
    throw new Error(`Only image files are allowed. For videos, upload to YouTube and paste the link.`)
  }

  const stats = fs.statSync(filePath)
  if (stats.size === 0) throw new Error(`Uploaded file is empty.`)
  if (stats.size > MAX_SIZE_BYTES) {
    const mb = (stats.size / 1024 / 1024).toFixed(1)
    throw new Error(`Image too large (${mb} MB). Maximum allowed size is 5 MB.`)
  }

  const fd = fs.openSync(filePath, 'r')
  const header = Buffer.alloc(12)
  fs.readSync(fd, header, 0, 12, 0)
  fs.closeSync(fd)

  const isRealImage = SIGNATURES.some((sig) => matchesMagic(header, sig))
  if (!isRealImage) {
    throw new Error(`File content does not match a real image. Upload rejected.`)
  }
}
