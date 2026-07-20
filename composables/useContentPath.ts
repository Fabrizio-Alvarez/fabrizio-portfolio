// Resolves a content directory path for the current locale.
// English (default) keeps the path as-is; Spanish gets an /es prefix.
// Mirrors the `prefix_except_default` URL strategy so queryContent paths
// line up with the file-system layout (content/projects/*.md, content/es/projects/*.md).
export const useContentPath = () => {
  const { locale } = useI18n()
  return (path: string) => (locale.value === 'es' ? `/es${path}` : path)
}
