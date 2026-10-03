const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteBasePath = rawBasePath.replace(/\/$/, "");

export function sitePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return `${siteBasePath}/`;
  }

  return `${siteBasePath}${normalizedPath}`;
}
