import Hapi from "@hapi/hapi";
import Joi from "@hapi/joi";

import { PeersController } from "../controllers/peers";

export const register = (server: Hapi.Server): void => {
    const controller = server.app.app.resolve(PeersController);
    server.bind(controller);

    server.route({
        method: "GET",
        path: "/peers",
        handler: controller.index,
        options: {
            validate: {
                query: {
                    ...server.app.schemas.pagination,
                    ...{
                        ip: Joi.string().ip(),
                        version: Joi.string(),
                        orderBy: Joi.string(),
                    },
                },
            },
        },
    });

    server.route({
        method: "GET",
        path: "/peers/{ip}",
        handler: controller.show,
        options: {
            validate: {
                params: {
                    ip: Joi.string().ip(),
                },
            },
        },
    });
};
