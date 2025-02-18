package com.gli.clic.dto;

import java.util.Map;

public class ApiResponse {
    private String message;
    private boolean status;
    private Map<String, Object> data;

    public ApiResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }

    public ApiResponse(String message, boolean status, Map<String, Object> data) {
        this.message = message;
        this.status = status;
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public boolean isStatus() {
        return status;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
