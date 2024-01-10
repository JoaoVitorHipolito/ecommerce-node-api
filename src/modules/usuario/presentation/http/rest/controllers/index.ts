import { autenticarUsuarioUseCase, registrarUsuarioUseCase } from "@modules/usuario/appliacation/use-case";
import { RegistrarUsuarioExpressController } from "./registrar-usuario.express.controller";
import { AutenticarUsuarioExpressController } from "./autenticar-usuario.epress.controller";

const registrarUsuarioController = new RegistrarUsuarioExpressController(registrarUsuarioUseCase);
const autenticarUsuarioController = new AutenticarUsuarioExpressController(autenticarUsuarioUseCase);

export {
    registrarUsuarioController,
    autenticarUsuarioController
}