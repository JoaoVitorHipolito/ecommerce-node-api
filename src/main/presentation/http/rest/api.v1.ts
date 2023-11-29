import express, { Router } from 'express';
import { categoriaRouter } from '@modules/catalogo/presentation/http/rest/categoria.routes';


const apiv1Router: Router = express.Router();


apiv1Router.use(
    '/categorias',
    categoriaRouter
);


apiv1Router.use(
    '/produtos',
    function (request, response, next) {
        response.json({"entidade":"Produto"});
    }  
);

apiv1Router.use(
    '/usuarios',
    function (request, response, next) {
        response.json({"entidade":"usuario"});
    }  
);

apiv1Router.use(
    '/pedidos',
    function (request, response, next) {
        response.json({"entidade":"Pedido"});
    }  
);

export { apiv1Router }