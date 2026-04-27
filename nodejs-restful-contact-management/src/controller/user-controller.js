import userValidation from "../validation/user-validation.js";
import userService from "../service/user-service.js";
import ResponseFormatter from "../helper/response-formatter.js";

const register = async (req, res) => {
    await userValidation.register(req);

    const user = await userService.register(req);

    ResponseFormatter.success(res, {
        name: user.name,
        username: user.username,
        token: user.token
    }, 201);
}

const login = async (req, res) => {
    userValidation.login(req);

    const user = await userService.login(req);

    return ResponseFormatter.success(res, {
        id: user.id,
        name: user.name,
        username: user.username,
        token: user.token
    }, 200);
}

const logout = async (req, res) => {
    await userService.logout(req);

    return ResponseFormatter.success(res, true, 200);
}

const update = async (req, res) => {
    userValidation.update(req);

    const user = await userService.update(req);

    const response = {
        id: user.id,
        name: user.name,
        username: user.username
    };

    return ResponseFormatter.success(res, response, 200);
}

const current = async (req, res) => {
    const user = await userService.current(req);

    const response = {
        id: user.id,
        name: user.name,
        username: user.username
    };

    return ResponseFormatter.success(res, response, 200);
}

export default {
    register,
    login,
    logout,
    update,
    current
}