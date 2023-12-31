package se.sharpness.hassessolskydd.status_messages.errors;

import org.springframework.http.HttpStatus;
import se.sharpness.hassessolskydd.status_messages.StatusMessage;

public class CustomerNotFoundException extends StatusMessage {
        public CustomerNotFoundException(String customerNumber) {
            super(HttpStatus.NO_CONTENT, "Customer with customer number " + customerNumber + " not found");
        }
}
