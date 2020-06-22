# @36node/koa-openapi

[![version][0]][1] [![downloads][2]][3]

## Install

```bash
yarn add @36node/koa-openapi
```

## Usage

```js
import openapi from "@36node/koa-openapi";
app.use(
  openapi({
    url: `${BASE}/openapi.yml`,
    file: path.join(__dirname, "../openapi.yml"),
  })
);
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**module** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/module/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node)

[0]: https://img.shields.io/npm/v/@36node/koa-openapi.svg?style=flat
[1]: https://npmjs.com/package/@36node/koa-openapi
[2]: https://img.shields.io/npm/dm/@36node/koa-openapi.svg?style=flat
[3]: https://npmjs.com/package/@36node/koa-openapi
