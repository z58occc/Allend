<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;


class ValidationExceptionAPI extends ValidationException
{
    public function __construct($validator, $response = null, $errorBag = 'default')
    {
        parent::__construct($validator, $response, $errorBag);
        // parent::__construct(static::summarize($validator));

        $this->response = $response;
        $this->errorBag = $errorBag;
        $this->validator = $validator;

    }

    public function handle(ValidationException $exception)
    {
        $errors = $exception->errors();

        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
    }
}
