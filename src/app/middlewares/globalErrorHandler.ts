/* eslint-disable no-unused-expressions */

/**
 * Mongoose ValidationError and ZodError are two types of errors that can occur in a Node.js application
  when working with data validation and schema enforcement. Mongoose Validation Error is specific to Mongoose,
  a popular ODM (Object Data Modeling) library for MongoDB, while ZodError is related to Zod, a TypeScript-first schema declaration 
  and validation library. Mongoose Validation are default errors handler but ZodError is custom error handler.

  amra jokon cay je Mongoose Validation error gulo ke amra ZodError er moto handle korte , tokon amra ZodError
   er moto custom error handler likhte pari ja Mongoose ValidationError er moto behave korbe and seta mongoose 
   er age use kora hbe route er modhe


 * - Mongoose ValidationError (e.g., missing required fields in a model)
 * - ZodError (validation errors from Zod schema validation)
 * - Mongoose CastError (invalid ObjectId or cast failures)
 * - MongoServerError (MongoDB server errors)
 * - Custom ApiError (application-specific errors)
 * - Generic JavaScript Errors
 */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { errorlogger } from '../../shared/logger'
import { IGenericErrorMessage } from '../../interfaces/error'
import config from '../../config'
import { error } from 'winston'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'
import handleCastError from '../../errors/handleCastError'
import handleMongoServerError from '../../errors/handleMongoServerError'
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, error)
    : errorlogger.error(`🐱‍🏍 globalErrorHandler ~~`, error)

  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []
  if (error?.name === 'ValidationError') {
    console.log('🚀 ~ error?.name:', error?.name)
    /**
        mongoose ValidationError => occurs when a document fails schema validation,
        for example, if a required field is missing or a field value is invalid.
     */
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ZodError) {
    /**
      zod error => occurs when input validation using Zod schema fails,
      for example, if an invalid ID or incorrect data shape is provided.
      like this: ZodError: Invalid input
      so we need to handle this error to provide structured validation feedback
     */
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error?.name === 'CastError') {
    /**
     * CastError => invalid ObjectId diye query kora hoi tokon CastError dekay => getbyid
      mongoose error =>  for example, an invalid ObjectId string passed where a valid ObjectId is required.
      like this: CastError: Cast to ObjectId failed for value "123" at path "_id" for model "User"
      so we handle this error to notify the client about invalid identifiers
     */
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error?.name === 'MongoServerError') {
    /**
      MongoServerError => occurs when MongoDB server returns an error,
      for example, duplicate key error or other database-level errors.
      so we handle this error to respond with proper message and status code
    */
    const simplifiedError = handleMongoServerError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    /**
      ApiError => custom application errors thrown intentionally with statusCode and message,
      so we catch this to send the defined status and message to the client directly
    */
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
