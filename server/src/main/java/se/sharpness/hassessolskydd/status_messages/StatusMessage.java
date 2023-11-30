package se.sharpness.hassessolskydd.status_messages;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.ErrorResponseException;

public abstract class StatusMessage extends ErrorResponseException {


    public StatusMessage(HttpStatus httpStatus, String message) {
        super(httpStatus, asProblemDetail(httpStatus, message), null);
    }

    public StatusMessage(HttpStatus httpStatus, String message, Throwable cause) {
        super(httpStatus, asProblemDetail(httpStatus, message), cause);
    }

    protected static ProblemDetail asProblemDetail(HttpStatus httpStatus, String message) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(httpStatus, message);
        problemDetail.setTitle(message);
        return problemDetail;
    }
}
