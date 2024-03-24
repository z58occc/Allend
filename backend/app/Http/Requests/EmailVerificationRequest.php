<?php

namespace App\Http\Requests;

use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;


class EmailVerificationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // $this->redirectRoute = "waitverifyemail";
        if (! hash_equals((string) $this->user('api')->getKey(), (string) $this->route('id'))) {
            return false;
        }

        if (! hash_equals(sha1($this->user('api')->getEmailForVerification()), (string) $this->route('hash'))) {
            return false;
        }
        $this->validate([
            'signature' => 'required',
            'expires' => 'required|integer',
        ]);

        if($this->expires < now()->timestamp){
            // return $this->getRedirectUrl();
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }

    /**
     * Fulfill the email verification request.
     *
     * @return void
     */
    public function fulfill()
    {
        if (! $this->user('api')->hasVerifiedEmail()) {
            $this->user('api')->markEmailAsVerified();

            event(new Verified($this->user('api')));
        }
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return \Illuminate\Validation\Validator
     */
    public function withValidator(Validator $validator)
    {
        return $validator;
    }
}
