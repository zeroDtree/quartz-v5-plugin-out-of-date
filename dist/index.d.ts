import { QuartzTransformerPlugin } from '@quartz-community/types';
import { OutOfDateTransformerOptions } from './types.js';
export { OutOfDateComponentOptions, OutOfDateData, OutOfDatePluginOptions } from './types.js';
export { OutOfDate } from './components/index.js';

declare const OutOfDateTransformer: QuartzTransformerPlugin<Partial<OutOfDateTransformerOptions>>;

export { OutOfDateTransformer, OutOfDateTransformerOptions };
