import { GuardAbstract } from './guard.absract';

export type GuardsType<T extends GuardAbstract = any> = (new () => T);
