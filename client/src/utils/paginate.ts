//@ts-nocheck

export function paginate(items: Object, pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize
  return [...items].splice(startIndex, pageSize)
}
