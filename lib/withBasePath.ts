export function withBasePath(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//') || /^https?:/i.test(path)) {
    return path;
  }

  const basePath = process.env.__NEXT_ROUTER_BASEPATH ?? '';
  if (!basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }

  return `${basePath}${path}`;
}
