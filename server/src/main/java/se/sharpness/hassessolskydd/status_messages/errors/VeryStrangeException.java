package se.sharpness.hassessolskydd.status_messages.errors;

import org.springframework.http.HttpStatus;
import se.sharpness.hassessolskydd.status_messages.StatusMessage;

public class VeryStrangeException extends StatusMessage {

    public VeryStrangeException() {
        super(HttpStatus.INTERNAL_SERVER_ERROR,"Something very strange happened. Don't know what's going on.");
    }
}
