globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_UBp9BGJq.mjs';
import { s as sequence } from './chunks/index_Bd0htmrh.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
