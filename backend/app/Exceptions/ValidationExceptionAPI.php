<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator;
use Illuminate\Support\Facades\Validator as ValidatorFacade;


class ValidationExceptionAPI extends ValidationException
{
    /**
    * The validator instance.
    *
    * @var \Illuminate\Contracts\Validation\Validator
    */
   public $validator;

   /**
    * The recommended response to send to the client.
    *
    * @var \Symfony\Component\HttpFoundation\Response|null
    */
   public $response;

   /**
    * The status code to use for the response.
    *
    * @var int
    */
   public $status = 422;

   /**
    * The name of the error bag.
    *
    * @var string
    */
   public $errorBag;

    public function __construct($validator, $response = null, $errorBag = 'default')
    {
        // $validator = ValidatorFacade::make($data, $validator->getRules(), $validator->messages(), $validator->customAttributes());
        parent::__construct($validator, $response, $errorBag);
        // parent::__construct(static::summarize($validator));

        $this->response = $response;
        $this->errorBag = $errorBag;
        $this->validator = $validator;

    }

    /**
     * Render the exception as an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function render($request)
    {
        $errors = $this->validator->errors()->getMessages();

        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $errors,
        ], $this->status);
    }

    // public function handle(ValidationException $exception)
    // {
    //     $errors = $exception->errors();

    //     return response()->json([
    //         'success' => false,
    //         'message' => 'Validation failed',
    //         'errors' => $errors
    //     ]);
    // }

    protected function getValidator()
    {
        return $this->validator;
    }
}
