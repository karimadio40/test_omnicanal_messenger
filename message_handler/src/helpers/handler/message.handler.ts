import { Response } from "express";
import { HTTP_ERROR_STATUS } from "./ErrorStatus";

const statuses = require('statuses');
const typeErrorMessage = 'response cannot be null or empty';

export function handleOkResponse(res: Response, result: any) {

    if (res) {

        const status = 200;

        const response = {
            datatype: "object",
            data: result,
        };

        return res.status(status).json(response);

    } else {
        throw new TypeError(typeErrorMessage);
    }
}

export function handleError(res: Response, err: Error, statusCode?: number) {
    const status = statusCode || HTTP_ERROR_STATUS.INTERNAl_ERROR

    if (res) {

        if (err) {
            const httpError = new HttpError(status, err.message, err);
            res.status(status).send(httpError);
        } else {
            const httpError = new HttpError(HTTP_ERROR_STATUS.INTERNAl_ERROR);
            res.status(status).send(httpError);
        }
    } else {
        throw new HttpError(status, typeErrorMessage);
    }
}

export function handleErrorFormat(res: Response, err, statusCode?: number) {
    const status = statusCode || HTTP_ERROR_STATUS.INTERNAl_ERROR

    if (res) {
        let message = err?.message ? err.message : err
        const httpError = new HttpError(status, message);
        res.status(status).send(httpError);
    } else {
        throw new HttpError(status, typeErrorMessage);
    }
}

export function handleBadRequest(res: Response, message?: string) {

    if (res) {
        const httpError = new HttpError(HTTP_ERROR_STATUS.BAD_REQUEST, message);
        res.status(HTTP_ERROR_STATUS.BAD_REQUEST).send(httpError);
    } else {

        throw new HttpError(HTTP_ERROR_STATUS.BAD_REQUEST, typeErrorMessage);
    }
}

export function handleInvalidInput(res: Response, message?: string) {

    if (res) {
        const msg = message ?? "Invalid Input";
        const httpError = new HttpError(HTTP_ERROR_STATUS.BAD_REQUEST, msg);
        res.status(HTTP_ERROR_STATUS.BAD_REQUEST).send(httpError);

    } else {

        throw new HttpError(HTTP_ERROR_STATUS.BAD_REQUEST, typeErrorMessage);
    }
}

/**
 * 401 Unauthorized
 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated".
 * That is, the client must signIn itself to get the requested response
 * @param {{status: (arg0: number) => {(): any;new (): any;send: {(arg0: any): void;new (): any;};};}} res
 * @param {any} message
 */
export function handleUnauthorized(res: Response, message?: string) {

    if (res) {
        const httpError = new HttpError(HTTP_ERROR_STATUS.UNAUTHORIZED, message);
        res.status(HTTP_ERROR_STATUS.UNAUTHORIZED).send(httpError);

    } else {
        throw new HttpError(HTTP_ERROR_STATUS.UNAUTHORIZED, typeErrorMessage);
    }
}

export function handleNotFound(res: Response, message?: string) {
    if (res) {
        const httpError = new HttpError(HTTP_ERROR_STATUS.NOT_FOUND, message);
        res.status(HTTP_ERROR_STATUS.NOT_FOUND).send(httpError);
    } else {
        throw new HttpError(HTTP_ERROR_STATUS.NOT_FOUND, typeErrorMessage);
    }
}

/**
 * HTTP Exception Error
 * @param {string | number} statusCode
 * @param {string} message
 */
export class HttpError extends Error {
    status: any;
    timestamp: string;
    name: string;
    error: string;
    message: string;
    path: string;
    multiErrors: boolean;
    errors: any[];

    /**
     * @param {number} statusCode
     * @param {string | ((this: Window, ev: MessageEvent<any>) => any) | null | undefined} message
     */
    constructor(statusCode: number, message?: string, error?: Error) {

        let msg = message ?? statuses.message[statusCode];

        super(msg);

        if (statusCode < 500) {
            this.name = 'ClientError:' + statusCode;
        } else {
            this.name = 'ServerError:' + statusCode;
        }

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }

        Object.defineProperty(this, 'message', {
            enumerable: true,
            configurable: true,
            writable: true
        });

        this.error = statuses.message[statusCode] ?? 'Unknown Error';
        this.message = msg;
        this.status = statusCode;
        this.timestamp = Date.now().toString();
        this.multiErrors = false;
    }
}

