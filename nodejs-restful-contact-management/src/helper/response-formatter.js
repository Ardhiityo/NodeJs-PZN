class ResponseFormatter {
    static success(res, data, status = 200) {
        return res.status(status).json({
            data: data
        }).end();
    }

    static paging(res, data, paging, status = 200) {
        return res.status(status).json({
            data: data,
            paging: paging
        }).end();
    }

    static error(res, errors, status = 400) {
        return res.status(status).json({
            errors: errors
        }).end();
    }
}

export default ResponseFormatter;