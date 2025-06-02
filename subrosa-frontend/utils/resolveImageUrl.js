// utils/image.js

export function resolveImageUrl(url) {
  if (!url) return "/placeholder.jpg";
  return url.startsWith("http")
    ? url
    : `http://localhost:5000${url.startsWith("/") ? "" : "/"}${url}`;
}
