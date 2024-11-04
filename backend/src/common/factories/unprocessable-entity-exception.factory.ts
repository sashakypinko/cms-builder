import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

const unprocessableEntityExceptionFactory = (
  errors,
): UnprocessableEntityException => {
  return new UnprocessableEntityException({
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    errors: errors.reduce(
      (acc, e) => ({
        ...acc,
        [e.property]: {
          key: Object.keys(e.constraints)[0],
          message: Object.values(e.constraints),
        },
      }),
      {},
    ),
  });
};

export default unprocessableEntityExceptionFactory;
