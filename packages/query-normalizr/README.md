# @36node/query-normalizr

[![version][0]][1] [![downloads][2]][3]

query-normalizr 的作用: 将 url 中的 query 规则化成方便 service 层调用的数据格式。

我们定义了:

1.  [标准的 query in url 格式](../docs/url.md##QueryInRoute).
2.  [标准的 service 层 Query 数据格式](../docs/url.md##QueryInService).

## Install

```bash
yarn add query-normalizr
```

## Usage

```js
import normalizr from "@36node/query-normalizr";

// koa app
app.use(normalizr(options));
```

## API

```js
normalizr(options);
```

return koa middleware

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

**query-normalizr** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/query-normalizr/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node) · Twitter [@y](https://twitter.com/y)

[0]: https://img.shields.io/npm/v/@36node/query-normalizr.svg?style=flat
[1]: https://npmjs.com/package/@36node/query-normalizr
[2]: https://img.shields.io/npm/dm/@36node/query-normalizr.svg?style=flat
[3]: https://npmjs.com/package/@36node/query-normalizr
