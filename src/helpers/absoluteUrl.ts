export function absoluteUrl(url: string) {
  return url.startsWith("/") ? window.location.origin + url : url;
}
