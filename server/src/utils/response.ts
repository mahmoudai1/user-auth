import { Response } from 'express';

interface ApiResponse {
    status: boolean;
    message: string;
    data?: any;
    error?: any;
}

export const responseHandler = (
    res: Response,
    statusCode: number,
    message: string,
    data?: any,
    error?: any
): void => {
    const response: ApiResponse = {
        status: statusCode >= 200 && statusCode < 300,
        message,
    };

    if (data) {
        response.data = data;
    }

    if (error) {
        response.error = error;
    }

    res.status(statusCode).json(response);
};