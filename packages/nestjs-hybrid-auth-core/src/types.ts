import { ModuleMetadata, Type } from '@nestjs/common';

export interface ModuleOptionsFactory<T> {
  createModuleOptions(): Promise<T> | T;
}

export interface ModuleAsyncOptions<T1, T2>
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<T1>;
  useClass?: Type<T1>;
  useFactory?: (...args: any[]) => Promise<T2> | T2;
  inject?: any[];
}
