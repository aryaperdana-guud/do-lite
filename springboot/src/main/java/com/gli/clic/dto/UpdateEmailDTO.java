package com.gli.clic.dto;

import jakarta.validation.constraints.*;

public class UpdateEmailDTO {

    @NotBlank(message = "Email cannot be empty!")
    @Email(message = "Invalid email format!")
    private String email;

    public UpdateEmailDTO() {}

    public UpdateEmailDTO(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
