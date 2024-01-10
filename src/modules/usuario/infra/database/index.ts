import { Usuario } from "@modules/usuario/domain/usuario.entity";
import { IUsuarioRepository } from "@modules/usuario/domain/usuario.repository.inteface";
import { UsuarioPrismaRepository } from "./usuario.prisma.repository";

const usuarioRepositorio: IUsuarioRepository<Usuario> = new UsuarioPrismaRepository(prisma);

export { usuarioRepositorio }