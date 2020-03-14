export function createError (name: string, error: Error): Error {
  const err = new Error(error.message)
  err.name = name
  err.message = error.message
  err.stack = error.stack
  console.error(err)
  return err
}
