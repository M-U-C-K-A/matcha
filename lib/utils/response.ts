export const API_ERRORS = {
    BAD_REQUEST: 'Query syntax is incorrect', // 400
    UNAUTHORIZED: 'Authentication is required for the resource', // 401
    NOT_FOUND: 'Ressource not found', // 404
    METHOD_FORBIDDEN: 'Request method not allowed', // 405
    INTERNAL_ERROR: 'Internal Server Error' // 500
};

export const API_SUCCESS = {
    OK: 'Request successful', // 200
    CREATED: 'Request processed successfully and resource created' // 201
}