import { EventEmitter } from 'events';
import { BaseQuad, Quad, Sink as SinkInterface, Stream } from 'rdf-js';

declare class Sink<Q extends BaseQuad = Quad> implements SinkInterface<Q> {
  constructor(Impl: new () => NodeJS.ReadableStream, options?: object);

  import(stream: Stream<Q>, options?: object): EventEmitter;
}

export = Sink
