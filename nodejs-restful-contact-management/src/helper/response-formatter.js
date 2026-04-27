class ResponseFormatter {
    static success(res, data, status = 200) {
        return res.status(status).json({
            data: data
        }).end();
    }

    static error(res, errors, status = 400) {
        return res.status(status).json({
            errors: errors
        }).end();
    }
}

export default ResponseFormatter;