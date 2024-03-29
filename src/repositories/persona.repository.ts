import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoBdDataSource} from '../datasources';
import {Persona, PersonaRelations, Pedidos} from '../models';
import {PedidosRepository} from './pedidos.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedidos, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongoBD') dataSource: MongoBdDataSource, @repository.getter('PedidosRepository') protected pedidosRepositoryGetter: Getter<PedidosRepository>,
  ) {
    super(Persona, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidosRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
