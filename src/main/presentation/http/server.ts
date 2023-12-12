import  express, { Application } from 'express';
import http from 'node:http';
import { apiv1Router } from './rest/api.v1';
import morgan from 'morgan'


    const createHTTPServer = async (app: object): Promise<http.Server>  => {


        const httpServer: http.Server = http.createServer (app)
        return httpServer;
    };

    export { createHTTPServer };