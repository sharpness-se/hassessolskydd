package se.sharpness.hassessolskydd.status_messages.errors;

import org.springframework.http.HttpStatus;
import se.sharpness.hassessolskydd.status_messages.StatusMessage;

public class ResourceConflictException extends StatusMessage {

    /**
     * @param resource would be something like "customer_number" or product name
     */
    public ResourceConflictException(String resource) {
        super(HttpStatus.CONFLICT,resource + " already exists");
    }
}
