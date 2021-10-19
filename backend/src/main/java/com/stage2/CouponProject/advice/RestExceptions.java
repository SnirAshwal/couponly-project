package com.stage2.CouponProject.advice;

import com.stage2.CouponProject.exceptions.CompanyException;
import com.stage2.CouponProject.exceptions.CouponException;
import com.stage2.CouponProject.exceptions.CustomerException;
import com.stage2.CouponProject.exceptions.UserException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Rest exceptions class responsible to handle the exception and throw it to the client.
 */
@RestController
@ControllerAdvice
public class RestExceptions {

        /**
         * The method recive an exception and returns the error and the error description.
         * @param e represent the exception thrown.
         * @return Error detail class that holds two fields (String error and String Description).
         */
        @ExceptionHandler(value = {CompanyException.class, CouponException.class, CustomerException.class, UserException.class})
        @ResponseStatus(code = HttpStatus.BAD_REQUEST)
        public ErrorDetails handleException(Exception e){

                System.out.println(e.getMessage());
                return new ErrorDetails("Error: ", e.getMessage());
        }

}
