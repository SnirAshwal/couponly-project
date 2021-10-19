package com.stage2.CouponProject.advice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Error details class holds two fields that represent the error and the error description will be thrown to the user.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetails {

    /**
     * error field holds the error will be thrown.
     */
    private String error;

    /**
     *description field holds the error will be thrown.
     */
    private String description;

}
