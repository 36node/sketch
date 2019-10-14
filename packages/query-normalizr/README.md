# @36node/query-normalizr

[![version][0]][1] [![downloads][2]][3]

这里 query-normalizr 的作用: 将 url 中的 query 规则化成方便 sdk 和 service 层调用的数据格式。

## Install

```bash
yarn add @36node/query-normalizr
```

## Usage

```js
import { queryNormalizr } from "@36node/query-normalizr";

// koa app
app.use(normalizr(queryNormalizr));
```

## API

### middleware

```js
normalizr(options);

// return koa middleware
```

### normalize

```js
import { normalize } from "@36node/query-normalizr";
import qs from "query-string";

const queryStr =
  " _expand=department&_group=type&_limit=10&_offset=0&_populate=user&_select=name&_select=age&_sort=updatedAt&_sort=-createdAt&age_gt=10&age_lt=20&level_gte=10&level_lte=20&plate_like=沪A&plate_like=沪B&tag_ne=pretty&title_like=hello&type=test1&type=test2";

normalize(qs.parse(queryStr));

/*
return {
  limit: 10,
  offset: 0,
  sort: ["updatedAt", "-createdAt"],
  populate: "user",
  select: ["name", "age"],
  group: "type",
  filter: {
    age: {
      $gt: "10",
      $lt: "20",
    },
    level: {
      $gte: "10",
      $lte: "20",
    },
    plate: {
      $regex: [/沪A/i, /沪B/i],
    },
    tag: {
      $ne: "pretty",
    },
    title: {
      $regex: /hello/i,
    },
    type: ["test1", "test2"]
  },
  _expand: "department",
};
*/
```

### denormalize

```js
import { denormalize } from "@36node/query-normalizr";
import qs from "query-string";

const queryObj = {
  limit: 10,
  offset: 0,
  sort: ["updatedAt", "-createdAt"],
  populate: "user",
  select: ["name", "age"],
  group: "type",
  filter: {
    age: {
      $gt: "10",
      $lt: "20",
    },
    level: {
      $gte: "10",
      $lte: "20",
    },
    plate: {
      $regex: [/沪A/i, /沪B/i],
    },
    tag: {
      $ne: "pretty",
    },
    title: {
      $regex: /hello/i,
    },
    type: ["test1", "test2"],
  },
  _expand: "department",
};

qs.stringfy(denormalize(queryObj));

// return " _expand=department&_group=type&_limit=10&_offset=0&_populate=user&_select=name&_select=age&_sort=updatedAt&_sort=-createdAt&age_gt=10&age_lt=20&assignees=%2A&followers=none&level_gte=10&level_lte=20&plate_like=%E6%B2%AAA&plate_like=%E6%B2%AAB&q=hello&tag_ne=pretty&title_like=hello&type=test1&type=test2"
```

## What is query normalizr

![image](https://user-images.githubusercontent.com/4343458/53739979-0c2d6f00-3ece-11e9-9c32-9516ecea9c25.png)

### Query in route (QIR)

reference in [url.md](../../docs/url.md)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**query-normalizr** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/query-normalizr/contributors)).

> [github.com/zzswang](https://github.com/zzswang) · GitHub [@36node](https://github.com/36node) · Twitter [@y](https://twitter.com/y)

[0]: https://img.shields.io/npm/v/@36node/query-normalizr.svg?style=flat
[1]: https://npmjs.com/package/@36node/query-normalizr
[2]: https://img.shields.io/npm/dm/@36node/query-normalizr.svg?style=flat
[3]: https://npmjs.com/package/@36node/query-normalizr
