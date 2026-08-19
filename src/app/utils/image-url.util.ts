import { environment } from '@env/environment';

export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }

  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  if (url.startsWith('/')) {
    return `${environment.apiUrl}${url}`;
  }

  return `${environment.apiUrl}/${url}`;
}
