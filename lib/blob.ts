import { put, del } from '@vercel/blob';

export const MAX_PHOTO_SIZE = 8 * 1024 * 1024; // 8 Mo
export const MAX_VIDEO_SIZE = 25 * 1024 * 1024; // 25 Mo

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function uploadMedia(file: File, folder: string) {
  const ext = file.name.split('.').pop() || 'bin';
  const pathname = `${folder}/${crypto.randomUUID()}.${ext}`;

  const blob = await put(pathname, file, {
    access: 'public',
    contentType: file.type,
  });

  return blob.url;
}

export async function deleteMedia(url: string) {
  if (!url.includes('.blob.vercel-storage.com')) {
    return; // fichier statique local (seed initial), rien à supprimer
  }
  await del(url).catch(() => {});
}
