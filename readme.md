
> POC for a number of different stream implementations

Testing out some of the features and capabilities of some of the most populer stream libraries.

Bundle sizes (as reported using [https://bundlephobia.com/](bundlephobia))

|Module|Minified Size|
|[Most@v1](https://bundlephobia.com/result?p=most@1.8.1)|45.5kb|
|[xstream](https://bundlephobia.com/result?p=xstream@11.11.0)|16.4kb|
|[rxjs](https://bundlephobia.com/result?p=rxjs@7.0.0-beta.0)|54.8kb|
|[Most@v2](https://bundlephobia.com/result?p=@most/core@1.5.0)|35.1kb|
|[kefir](https://bundlephobia.com/result?p=kefir@3.8.6)|45.6kb|
|[baconjs](https://bundlephobia.com/result?p=baconjs@3.0.13)|47.3kb|

## Running

```sh
// Most version 1
node most1.js
```

```sh
// Most version 2
node mostcore.js
```

## Motivation

* Smallest bundle size with a good feature set
* [raid](https://github.com/mattstyles/raid) use-case feature set is fairly minimal, but, general use-case for things like [raid-streams](https://github.com/mattstyles/raid/tree/master/packages/raid-streams) need more transformative features (map, scan, tap, etc). Using the same stream implementation will give a better genuine use-case bundle size.
* Good stream performance. Streams have overhead but the ergonomic improvements of a defined API will pale if performance isn't comparable with a more naive implementation.
* [raid-hooks](https://github.com/mattstyles/raid/tree/master/packages/raid-hooks) use-case is to subscribe in the future but get an immediate view of the state held within the stream. A mechanism for emitting the _last_ state on new subscriptions is critical.
