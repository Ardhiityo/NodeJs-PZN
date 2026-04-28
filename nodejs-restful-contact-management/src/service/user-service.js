import prisma from "../app/database.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import AuthenticationException from "../exception/authentication-exception.js";

const register = async (request) => {
    request.body.password = await bcrypt.hash(request.body.password, 10);
    request.body.token = uuidv4();

    return await prisma.user.create({
        data: request.body,
        select: {
            name: true,
            username: true,
            token: true
        }
    });
}

const login = async (request) => {
    let user = await prisma.user.findUnique({
        where: {
            username: request.body.username
        }
    });

    if (user) {
        if (await bcrypt.compare(request.body.password, user.password)) {
            return await prisma.user.update({
                where: {
                    username: request.body.username
                },
                data: {
                    token: uuidv4()
                },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    token: true
                }
            });

        }
    }
    throw new AuthenticationException("Username or Password is not valid");
}

const logout = async (request) => {
    return await prisma.user.update({
        where: {
            id: request.user.id
        },
        data: {
            token: null
        }
    });
}

const update = async (request) => {
    return await prisma.user.update({
        where: {
            id: request.user.id
        },
        data: {
            name: request.body.name ?? user.name,
            password: request.body.password ?
                await bcrypt.hash(request.body.password, 10) : user.password
        },
        select: {
            id: true,
            name: true,
            username: true
        }
    });
}

const current = async (request) => {
    return await prisma.user.findUnique({
        where: {
            id: request.user.id
        },
        select: {
            id: true,
            name: true,
            username: true
        }
    });
}

export default {
    register,
    login,
    update,
    current,
    logout
}