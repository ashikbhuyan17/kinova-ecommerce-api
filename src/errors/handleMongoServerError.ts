import { IGenericErrorMessage } from '../interfaces/error'

const handleMongoServerError = (err: any) => {
  const statusCode = 409
  let message = 'Duplicate key error'
  let errorMessages: IGenericErrorMessage[] = []

  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue || {})
    message = `Duplicate value for: ${fields.join(', ')}`

    errorMessages = fields.map(field => ({
      path: field,
      message: `The value '${err.keyValue[field]}' already exists for '${field}'`,
    }))
  }

  return {
    statusCode,
    message,
    errorMessages,
  }
}

export default handleMongoServerError
