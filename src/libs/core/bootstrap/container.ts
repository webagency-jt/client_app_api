import { bindContainer } from '@config/utils/container';
import { Container } from 'inversify';

export class BootstrapContainer {
  private static _container: Container;

  public static get Container(): Container {
    if (!this._container) {
      this._container = new Container();
      bindContainer(this._container);
    }
    return this._container;
  }
}
