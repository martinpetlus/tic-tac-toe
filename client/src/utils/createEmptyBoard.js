export default function createEmptyBoard(size) {
  return [...Array(size)].map(() =>
    [...Array(size)].map(() => ({
      // Position is by default empty
      mark: undefined,
    }))
  )
}
