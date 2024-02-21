import { CONTROLLER_WATERMARK, PATH_METADATA } from '../constant';

// Essayer de faire en sorte que lorsque cette fonction est call elle est automatiquement enregistré dans hono
export function ControllerTest(
  prefix?: string
): ClassDecorator {
  const path = prefix ?? '/';
  return (target) => {
    Reflect.defineMetadata(CONTROLLER_WATERMARK, true, target);
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };
}
