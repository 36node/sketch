const { handleAggs } = require("./aggregation");
const _ = require("lodash");

const aggConfigs = {
  "/pets": {
    grade: "avg",
    count: records => records.length,
  },
};

it("should group with tag", () => {
  const query = {
    _group: ["tag"],
  };
  const ret = handleAggs(
    aggConfigs,
    {
      // fake req
      path: "/pets",
      cusQuery: query,
    },
    {
      // fake res
      locals: {
        data: pets,
      },
      setHeader: () => {},
    }
  );

  expect(ret.length).toBe(2);
  expect(_.sumBy(ret, "count")).toBe(pets.length);
});

it("should group with month", () => {
  const query = {
    _group: ["birthAt.year", "birthAt.month"],
    _limit: 100,
  };

  const ret = handleAggs(
    aggConfigs,
    {
      path: "/pets",
      cusQuery: query,
    },
    {
      locals: {
        data: pets,
      },
      setHeader: () => {},
    }
  );

  expect(_.sumBy(ret, "count")).toBe(pets.length);
  expect(_.sumBy(ret, r => r.count * r.grade)).toBe(_.sumBy(pets, "grade"));
});

const pets = [
  {
    id: "e2fbf948-f82c-4377-a975-ba6300b260f0",
    name: "Beier",
    tag: "DOG",
    owner: "Natasha",
    grade: 4,
    age: 3,
    birthAt: "2016-03-27T12:35:56.032Z",
  },
  {
    id: "28cf541c-355b-4bef-9526-6ba4c0269740",
    name: "Denesik",
    tag: "DOG",
    owner: "Lester",
    grade: 3,
    age: 3,
    birthAt: "2015-12-19T12:10:16.646Z",
  },
  {
    id: "0a5032fe-5102-4cd6-88c4-cb90417e8647",
    name: "Zulauf",
    tag: "DOG",
    owner: "Tara",
    grade: 4,
    age: 5,
    birthAt: "2013-09-22T04:44:50.031Z",
  },
  {
    id: "7bd3b293-9f67-45ab-8094-324182478c47",
    name: "Ritchie",
    tag: "CAT",
    owner: "Stephany",
    grade: 3,
    age: 7,
    birthAt: "2012-05-19T18:14:52.366Z",
  },
  {
    id: "222093bc-d894-4357-94cc-ebc7498f18bd",
    name: "Mann",
    tag: "CAT",
    owner: "Dewayne",
    grade: 5,
    age: 8,
    birthAt: "2010-11-17T02:54:49.895Z",
  },
  {
    id: "d3a474ab-7a4f-48c3-9c49-d3190b8ce88c",
    name: "Streich",
    tag: "DOG",
    owner: "Johnny",
    grade: 1,
    age: 8,
    birthAt: "2010-12-13T00:50:32.580Z",
  },
  {
    id: "166e0630-7588-4042-8512-74cff973c7be",
    name: "Wisoky",
    tag: "CAT",
    owner: "Laila",
    grade: 5,
    age: 3,
    birthAt: "2015-12-10T01:04:52.273Z",
  },
  {
    id: "aa75fbfd-54ef-4858-9bc4-f53e1fa78f89",
    name: "Boyer",
    tag: "DOG",
    owner: "Myrl",
    grade: 3,
    age: 9,
    birthAt: "2010-04-04T12:51:48.479Z",
  },
  {
    id: "939243a5-7864-4fd3-b00a-ef7ecc548ea1",
    name: "Murphy",
    tag: "CAT",
    owner: "Dale",
    grade: 4,
    age: 5,
    birthAt: "2013-07-28T08:30:43.493Z",
  },
  {
    id: "cadedba1-1af4-4449-97f5-9a81cc677b41",
    name: "Bahringer",
    tag: "DOG",
    owner: "Katheryn",
    grade: 4,
    age: 6,
    birthAt: "2013-03-02T06:08:26.847Z",
  },
  {
    id: "50c879c0-96aa-4f99-a696-5021854d3693",
    name: "Will",
    tag: "CAT",
    owner: "Velma",
    grade: 2,
    age: 8,
    birthAt: "2011-06-19T14:13:56.082Z",
  },
  {
    id: "a64605b2-0023-4b3b-a994-f5080c8fd1c4",
    name: "Schiller",
    tag: "DOG",
    owner: "Gia",
    grade: 4,
    age: 5,
    birthAt: "2014-05-16T03:26:25.570Z",
  },
  {
    id: "9cb9f77d-56bc-4d82-8640-71dde2746b79",
    name: "Shanahan",
    tag: "DOG",
    owner: "Aaliyah",
    grade: 2,
    age: 6,
    birthAt: "2012-10-20T06:40:30.759Z",
  },
  {
    id: "3a1e9b75-3869-465b-9e6a-12033c8f3bd2",
    name: "Schneider",
    tag: "DOG",
    owner: "Herta",
    grade: 1,
    age: 8,
    birthAt: "2010-11-20T08:08:48.979Z",
  },
  {
    id: "19bcb953-89e8-4f2f-9b36-ae73b701b7a0",
    name: "Schoen",
    tag: "DOG",
    owner: "Letha",
    grade: 4,
    age: 6,
    birthAt: "2012-07-13T16:18:35.755Z",
  },
  {
    id: "7e30a8df-2d8c-49df-a16f-0e95247cce14",
    name: "Gutmann",
    tag: "DOG",
    owner: "Daisy",
    grade: 4,
    age: 7,
    birthAt: "2012-05-26T12:55:15.683Z",
  },
  {
    id: "a52c5176-3f32-483d-a692-d3232541e4b6",
    name: "Blanda",
    tag: "CAT",
    owner: "Hazel",
    grade: 5,
    age: 6,
    birthAt: "2013-05-30T11:26:22.399Z",
  },
  {
    id: "e09a87c0-2fb3-445c-8985-3cc1ccc0ab5f",
    name: "Mraz",
    tag: "CAT",
    owner: "Rey",
    grade: 5,
    age: 6,
    birthAt: "2012-09-16T04:15:25.676Z",
  },
  {
    id: "87ef33a3-483a-415d-8f0e-5ee4b9045d48",
    name: "McLaughlin",
    tag: "CAT",
    owner: "Gerda",
    grade: 5,
    age: 6,
    birthAt: "2013-03-25T05:16:51.146Z",
  },
  {
    id: "d8375032-d699-4f2c-b444-d53a23bdb6de",
    name: "Gusikowski",
    tag: "DOG",
    owner: "Leonor",
    grade: 2,
    age: 1,
    birthAt: "2018-03-22T22:37:34.841Z",
  },
  {
    id: "f8d27c71-0281-4c7f-bb58-8a2b1995cc37",
    name: "Lakin",
    tag: "CAT",
    owner: "Abby",
    grade: 1,
    age: 7,
    birthAt: "2012-04-03T04:36:02.555Z",
  },
  {
    id: "d4be9ee8-1943-4b74-a31c-017e5eee9ec9",
    name: "Hegmann",
    tag: "DOG",
    owner: "Raheem",
    grade: 5,
    age: 6,
    birthAt: "2013-06-13T05:25:48.340Z",
  },
  {
    id: "a7856348-8728-4ae8-a7c8-8e45a83916f2",
    name: "Carroll",
    tag: "CAT",
    owner: "Gordon",
    grade: 1,
    age: 6,
    birthAt: "2013-04-15T03:45:17.312Z",
  },
  {
    id: "e744e99c-22cc-42e8-b190-2b92a6ebca9f",
    name: "Batz",
    tag: "DOG",
    owner: "Laury",
    grade: 1,
    age: 8,
    birthAt: "2010-10-16T17:35:11.199Z",
  },
  {
    id: "2ce1ae2b-cc78-4cfb-9e4c-33ffbfcde4b2",
    name: "Mosciski",
    tag: "CAT",
    owner: "Tobin",
    grade: 1,
    age: 6,
    birthAt: "2012-09-13T18:00:37.770Z",
  },
  {
    id: "d344f78d-06ca-4f0f-84c0-882a361cd6e2",
    name: "Prosacco",
    tag: "CAT",
    owner: "Yazmin",
    grade: 1,
    age: 6,
    birthAt: "2013-05-13T22:06:24.430Z",
  },
  {
    id: "12134d71-5925-4f6b-81e7-b50f4c10bd2c",
    name: "Ryan",
    tag: "DOG",
    owner: "Frank",
    grade: 4,
    age: 3,
    birthAt: "2016-05-08T17:44:56.452Z",
  },
  {
    id: "8f65bcd3-4448-4190-a333-7f563c66b0cc",
    name: "O'Kon",
    tag: "DOG",
    owner: "Elisha",
    grade: 2,
    age: 7,
    birthAt: "2012-06-29T10:40:25.682Z",
  },
  {
    id: "9b73b173-a22c-40ec-bc26-bc8d0a8b047d",
    name: "Jakubowski",
    tag: "DOG",
    owner: "Maybelle",
    grade: 4,
    age: 4,
    birthAt: "2014-09-21T17:50:27.674Z",
  },
  {
    id: "00ae7675-7639-4482-a729-62a3921b0167",
    name: "Roob",
    tag: "DOG",
    owner: "Alexandra",
    grade: 3,
    age: 7,
    birthAt: "2012-05-06T16:16:19.603Z",
  },
  {
    id: "d67be135-5016-46c5-b311-7375179af588",
    name: "O'Keefe",
    tag: "DOG",
    owner: "Emmy",
    grade: 1,
    age: 1,
    birthAt: "2018-05-19T15:23:20.709Z",
  },
  {
    id: "c6c9c33d-d518-41bf-bb21-b709d228fdd2",
    name: "Roberts",
    tag: "CAT",
    owner: "Cora",
    grade: 1,
    age: 6,
    birthAt: "2013-05-24T22:12:50.043Z",
  },
  {
    id: "27e65e72-a938-47ef-a0af-9b3ec6da9495",
    name: "Ferry",
    tag: "DOG",
    owner: "Giovani",
    grade: 4,
    age: 7,
    birthAt: "2012-01-08T08:39:59.698Z",
  },
  {
    id: "c5efe98d-dfef-42c7-bffe-c74c6cbafbd6",
    name: "Ernser",
    tag: "DOG",
    owner: "Rodrick",
    grade: 1,
    age: 6,
    birthAt: "2013-07-02T01:15:41.190Z",
  },
  {
    id: "ff13fcaf-0b10-48b0-a988-0cbc18856128",
    name: "Waters",
    tag: "DOG",
    owner: "Phyllis",
    grade: 4,
    age: 7,
    birthAt: "2011-07-12T13:37:05.704Z",
  },
  {
    id: "34629797-be33-4e32-abc2-83a78147eaf4",
    name: "Howell",
    tag: "DOG",
    owner: "Emmanuel",
    grade: 5,
    age: 5,
    birthAt: "2013-09-06T08:35:33.613Z",
  },
  {
    id: "fee7762a-61bc-4619-b43b-8f4949850ef9",
    name: "Muller",
    tag: "DOG",
    owner: "Ashton",
    grade: 4,
    age: 2,
    birthAt: "2016-09-03T11:19:22.606Z",
  },
  {
    id: "fd84568a-26d6-4ce9-9c83-2b10f48c5bd0",
    name: "Huel",
    tag: "CAT",
    owner: "Avery",
    grade: 3,
    age: 4,
    birthAt: "2015-03-29T11:28:33.296Z",
  },
  {
    id: "68021c04-4b5a-443b-b4f4-a4522e47b9e8",
    name: "Farrell",
    tag: "CAT",
    owner: "Esperanza",
    grade: 2,
    age: 4,
    birthAt: "2015-04-01T01:56:27.510Z",
  },
  {
    id: "8c133d00-7489-4930-8d9b-966a37ccf816",
    name: "Torphy",
    tag: "DOG",
    owner: "Urban",
    grade: 1,
    age: 7,
    birthAt: "2012-05-20T12:20:44.968Z",
  },
  {
    id: "b9053343-5c4b-49da-ae08-470545671f04",
    name: "MacGyver",
    tag: "CAT",
    owner: "Zoie",
    grade: 1,
    age: 9,
    birthAt: "2010-01-23T11:20:54.768Z",
  },
  {
    id: "9c887fa6-0989-4472-9e13-b3ef6f29150c",
    name: "Hermann",
    tag: "DOG",
    owner: "Alessia",
    grade: 5,
    age: 2,
    birthAt: "2016-10-31T11:02:54.837Z",
  },
  {
    id: "8e6a290d-ea52-466e-8142-6f5246eadbf2",
    name: "Douglas",
    tag: "DOG",
    owner: "Ashley",
    grade: 5,
    age: 3,
    birthAt: "2015-12-30T14:54:18.994Z",
  },
  {
    id: "ac25d547-edb6-4fb8-b4be-fdf4af904efb",
    name: "Rowe",
    tag: "CAT",
    owner: "Dedrick",
    grade: 1,
    age: 8,
    birthAt: "2010-11-08T15:56:43.148Z",
  },
  {
    id: "6d4d28b1-0b80-45d6-b5bd-6a827fb8e230",
    name: "Wuckert",
    tag: "DOG",
    owner: "Eden",
    grade: 3,
    age: 8,
    birthAt: "2011-04-16T14:25:21.270Z",
  },
  {
    id: "4f8b1718-cd04-4f48-8d18-6f6eeac53f47",
    name: "Larson",
    tag: "DOG",
    owner: "Uriel",
    grade: 1,
    age: 7,
    birthAt: "2012-03-12T10:00:22.702Z",
  },
  {
    id: "68dafee2-cb00-4285-83dc-b6159781d433",
    name: "Hermiston",
    tag: "DOG",
    owner: "Hannah",
    grade: 4,
    age: 8,
    birthAt: "2010-11-14T22:58:40.914Z",
  },
  {
    id: "2d82681d-c314-45b6-8341-4cb3f4d907a2",
    name: "Waelchi",
    tag: "DOG",
    owner: "Theresa",
    grade: 3,
    age: 4,
    birthAt: "2014-11-30T15:31:46.124Z",
  },
  {
    id: "1c6034f9-17d6-453b-b631-662ba7051078",
    name: "Haley",
    tag: "DOG",
    owner: "Clarabelle",
    grade: 1,
    age: 1,
    birthAt: "2017-09-03T14:25:30.597Z",
  },
  {
    id: "3b8ae9f5-49ce-48ff-87b5-d4e82d60403e",
    name: "Greenfelder",
    tag: "DOG",
    owner: "Karley",
    grade: 3,
    age: 1,
    birthAt: "2017-12-07T01:12:24.883Z",
  },
  {
    id: "e56add41-5fa2-4da9-b2d1-83f654cad6d1",
    name: "Feeney",
    tag: "CAT",
    owner: "Lizeth",
    grade: 5,
    age: 3,
    birthAt: "2015-09-23T14:22:14.662Z",
  },
  {
    id: "a1286252-4611-42cb-81cc-df4b7e9cc4ee",
    name: "Johns",
    tag: "DOG",
    owner: "Brice",
    grade: 1,
    age: 3,
    birthAt: "2015-07-29T04:49:18.555Z",
  },
  {
    id: "8a2d7b41-dd14-484f-843f-6bb7bcd80277",
    name: "Moen",
    tag: "DOG",
    owner: "Jovanny",
    grade: 5,
    age: 5,
    birthAt: "2014-05-12T17:52:50.515Z",
  },
  {
    id: "289d5249-2113-42f9-96a4-c61c9b399b5f",
    name: "Beier",
    tag: "DOG",
    owner: "Richard",
    grade: 5,
    age: 3,
    birthAt: "2016-06-28T01:33:27.322Z",
  },
  {
    id: "8bba648c-f7ef-45d2-8acf-b77610166d9b",
    name: "Mueller",
    tag: "DOG",
    owner: "Lucienne",
    grade: 2,
    age: 9,
    birthAt: "2009-11-02T00:33:22.862Z",
  },
  {
    id: "57256b79-4724-47a3-8720-2d2c6b31a468",
    name: "Gleichner",
    tag: "CAT",
    owner: "Chad",
    grade: 2,
    age: 4,
    birthAt: "2015-01-13T13:45:05.464Z",
  },
  {
    id: "e3550219-f442-44f6-bcb7-f594fb6ca00d",
    name: "Murazik",
    tag: "DOG",
    owner: "Benton",
    grade: 5,
    age: 9,
    birthAt: "2009-10-18T11:03:38.955Z",
  },
  {
    id: "9c313e54-e7f1-4d08-8aef-61d0f00018e9",
    name: "Leffler",
    tag: "DOG",
    owner: "Bettye",
    grade: 4,
    age: 1,
    birthAt: "2018-03-27T01:10:56.365Z",
  },
  {
    id: "c56380c5-7f22-4803-a476-0764370b2c39",
    name: "Harvey",
    tag: "CAT",
    owner: "Carter",
    grade: 4,
    age: 8,
    birthAt: "2011-03-24T03:41:52.368Z",
  },
  {
    id: "3f770a50-dfb1-4b57-9baf-f0a9d178b003",
    name: "Baumbach",
    tag: "CAT",
    owner: "Emilia",
    grade: 5,
    age: 6,
    birthAt: "2013-06-25T12:25:28.572Z",
  },
  {
    id: "c310914d-ca0f-4464-9e9e-fbd39968e03d",
    name: "Emard",
    tag: "DOG",
    owner: "Jalon",
    grade: 3,
    age: 9,
    birthAt: "2010-06-13T15:33:57.229Z",
  },
  {
    id: "243cddb3-b850-4db7-95a4-66713c05f632",
    name: "Zboncak",
    tag: "CAT",
    owner: "Narciso",
    grade: 4,
    age: 6,
    birthAt: "2013-05-02T04:26:21.508Z",
  },
  {
    id: "938c8e55-347d-4e1c-9181-b0d1cad137f1",
    name: "Torphy",
    tag: "DOG",
    owner: "Alfredo",
    grade: 3,
    age: 5,
    birthAt: "2013-07-26T13:40:16.451Z",
  },
  {
    id: "6a919615-d103-4a37-a41a-2e7ee9e771b9",
    name: "Schuster",
    tag: "CAT",
    owner: "Brooks",
    grade: 1,
    age: 4,
    birthAt: "2015-05-12T05:03:32.439Z",
  },
  {
    id: "aa3f8bf7-de53-4e6b-80b1-758aca2564f2",
    name: "Wolf",
    tag: "DOG",
    owner: "Erick",
    grade: 2,
    age: 9,
    birthAt: "2010-06-21T12:18:19.159Z",
  },
  {
    id: "af64e21f-7b12-4a36-a544-b807248fbdc1",
    name: "Ryan",
    tag: "DOG",
    owner: "Ena",
    grade: 2,
    age: 4,
    birthAt: "2014-08-26T23:38:47.563Z",
  },
  {
    id: "01e951c9-2035-4acc-8037-3013ab987412",
    name: "Abernathy",
    tag: "DOG",
    owner: "Hellen",
    grade: 5,
    age: 9,
    birthAt: "2010-04-12T04:35:55.684Z",
  },
  {
    id: "23de48f3-e696-49f2-ab08-77756c3db461",
    name: "Konopelski",
    tag: "CAT",
    owner: "Rosamond",
    grade: 4,
    age: 7,
    birthAt: "2011-11-28T13:03:54.614Z",
  },
  {
    id: "16648f67-d551-43f5-b4d7-07da34f9e6f4",
    name: "Kuhlman",
    tag: "CAT",
    owner: "Clemens",
    grade: 3,
    age: 5,
    birthAt: "2013-10-21T12:07:50.868Z",
  },
  {
    id: "33a22a04-1d56-43c5-a347-0c8f69839598",
    name: "Zieme",
    tag: "DOG",
    owner: "Ardith",
    grade: 5,
    age: 1,
    birthAt: "2017-07-10T23:14:03.418Z",
  },
  {
    id: "c2ebeb23-8f0c-42db-b01e-05c9642464f3",
    name: "Kautzer",
    tag: "DOG",
    owner: "Odie",
    grade: 5,
    age: 6,
    birthAt: "2012-08-21T01:05:56.142Z",
  },
  {
    id: "5ba99f87-0d56-4530-b3a3-7204f6210485",
    name: "Langosh",
    tag: "CAT",
    owner: "Alisha",
    grade: 5,
    age: 8,
    birthAt: "2010-12-03T23:23:36.253Z",
  },
  {
    id: "ffec4e74-a321-435f-965b-b4c34bb75ba7",
    name: "Larkin",
    tag: "CAT",
    owner: "Darron",
    grade: 1,
    age: 5,
    birthAt: "2013-11-24T01:48:12.959Z",
  },
  {
    id: "e50ed12d-d839-4eef-8710-195e5de7e286",
    name: "Bruen",
    tag: "CAT",
    owner: "Clotilde",
    grade: 2,
    age: 7,
    birthAt: "2012-01-30T21:13:57.689Z",
  },
  {
    id: "a021efa2-6a08-48bf-8368-8cc95abb1746",
    name: "Osinski",
    tag: "DOG",
    owner: "Dillan",
    grade: 1,
    age: 1,
    birthAt: "2017-08-05T02:46:22.341Z",
  },
  {
    id: "9de4de70-5bd6-41f3-ab88-4653d76e49d0",
    name: "Kunde",
    tag: "CAT",
    owner: "Jennings",
    grade: 4,
    age: 4,
    birthAt: "2014-11-18T08:28:31.984Z",
  },
  {
    id: "aa063fc8-3e4a-4975-8439-189b7a5d5344",
    name: "Boyer",
    tag: "DOG",
    owner: "Karen",
    grade: 2,
    age: 5,
    birthAt: "2014-01-22T19:40:40.645Z",
  },
  {
    id: "b6be95fa-3baf-4f63-a0be-23c5e8ead4cf",
    name: "Howell",
    tag: "DOG",
    owner: "Tad",
    grade: 4,
    age: 4,
    birthAt: "2015-03-07T13:42:00.185Z",
  },
  {
    id: "38fa4926-9b68-4002-a05d-1d067c58af41",
    name: "Rolfson",
    tag: "DOG",
    owner: "Pierre",
    grade: 4,
    age: 7,
    birthAt: "2012-05-19T01:51:57.056Z",
  },
  {
    id: "d9a99329-a0e7-4bf1-a366-5d8333d6cf87",
    name: "Schamberger",
    tag: "DOG",
    owner: "Jared",
    grade: 2,
    age: 8,
    birthAt: "2011-04-21T06:41:04.224Z",
  },
  {
    id: "6ed18972-83c0-495c-b96a-dfe168b4799a",
    name: "Dooley",
    tag: "CAT",
    owner: "Louie",
    grade: 3,
    age: 5,
    birthAt: "2014-06-06T01:13:07.189Z",
  },
  {
    id: "871b93b1-3a47-43c9-88fa-8413a1daf85a",
    name: "Orn",
    tag: "CAT",
    owner: "Rigoberto",
    grade: 3,
    age: 2,
    birthAt: "2017-06-13T14:14:01.077Z",
  },
  {
    id: "b0a07acd-aa3d-44b1-9abc-c776bee729e8",
    name: "Cormier",
    tag: "DOG",
    owner: "Harmon",
    grade: 4,
    age: 9,
    birthAt: "2009-09-30T16:46:12.935Z",
  },
  {
    id: "ca4b91fc-8fef-44b7-b34c-a3329afb9d9d",
    name: "Rippin",
    tag: "CAT",
    owner: "Gloria",
    grade: 2,
    age: 5,
    birthAt: "2013-07-29T02:47:21.854Z",
  },
  {
    id: "bb592c23-f6ee-4992-81bc-907509c6d6a0",
    name: "Hamill",
    tag: "CAT",
    owner: "Janessa",
    grade: 2,
    age: 8,
    birthAt: "2010-12-28T22:38:58.495Z",
  },
  {
    id: "d4d70e32-b2d9-4984-8c5f-f57ce531e250",
    name: "Terry",
    tag: "DOG",
    owner: "Rhea",
    grade: 4,
    age: 2,
    birthAt: "2016-08-24T05:34:04.873Z",
  },
  {
    id: "14dbc185-1f25-4b62-86c7-6a74847b8976",
    name: "Funk",
    tag: "CAT",
    owner: "Harmon",
    grade: 5,
    age: 4,
    birthAt: "2015-02-18T08:13:49.187Z",
  },
  {
    id: "c9a4658d-2d47-4dad-8821-1bc2bcc31469",
    name: "Stark",
    tag: "DOG",
    owner: "Elvera",
    grade: 3,
    age: 7,
    birthAt: "2011-09-11T07:51:01.095Z",
  },
  {
    id: "c7156caa-2f6b-4d3d-9604-2bec14307ab8",
    name: "Luettgen",
    tag: "DOG",
    owner: "Joe",
    grade: 3,
    age: 9,
    birthAt: "2009-09-24T13:07:56.778Z",
  },
  {
    id: "968b3b72-8830-4112-be85-50e8b4928b8e",
    name: "Balistreri",
    tag: "CAT",
    owner: "Mariam",
    grade: 1,
    age: 7,
    birthAt: "2012-03-08T06:09:18.570Z",
  },
  {
    id: "fbec90ba-b0c5-4de9-bc31-b780c51cd8b7",
    name: "Hoppe",
    tag: "CAT",
    owner: "Luis",
    grade: 5,
    age: 3,
    birthAt: "2015-08-21T15:48:31.960Z",
  },
  {
    id: "8e1c8260-1c1e-4603-b39f-1756e03af1eb",
    name: "Boyer",
    tag: "DOG",
    owner: "Vincenza",
    grade: 3,
    age: 1,
    birthAt: "2018-01-04T03:07:38.489Z",
  },
  {
    id: "20643a96-2a49-4d5c-b45b-0986b075241a",
    name: "Cormier",
    tag: "CAT",
    owner: "Cecilia",
    grade: 4,
    age: 4,
    birthAt: "2015-02-20T20:00:35.600Z",
  },
  {
    id: "2f23ea34-7044-4f03-9c04-5a502c9d24c7",
    name: "Hirthe",
    tag: "CAT",
    owner: "Irma",
    grade: 5,
    age: 4,
    birthAt: "2015-01-17T21:30:20.767Z",
  },
  {
    id: "3bfe471e-f8b4-4db8-9125-f26053d32449",
    name: "Nikolaus",
    tag: "CAT",
    owner: "Zachery",
    grade: 2,
    age: 4,
    birthAt: "2014-11-09T11:29:00.705Z",
  },
  {
    id: "4fe15b2e-2202-42ae-93cf-e156073e5a2f",
    name: "Ernser",
    tag: "CAT",
    owner: "Ellie",
    grade: 1,
    age: 5,
    birthAt: "2014-02-03T05:37:16.200Z",
  },
  {
    id: "58ea15da-9135-4a1f-997f-4d3c88d01b20",
    name: "Blanda",
    tag: "DOG",
    owner: "Ada",
    grade: 1,
    age: 9,
    birthAt: "2009-12-23T02:54:47.938Z",
  },
  {
    id: "d50dbdf6-a8a2-4e62-a998-db8513c636f9",
    name: "Kuhlman",
    tag: "CAT",
    owner: "Heaven",
    grade: 5,
    age: 3,
    birthAt: "2015-12-03T12:59:45.085Z",
  },
  {
    id: "e7cbae09-5e0c-437b-adac-bdc5a10a9d96",
    name: "Bailey",
    tag: "CAT",
    owner: "Ricardo",
    grade: 4,
    age: 6,
    birthAt: "2013-04-01T10:20:10.645Z",
  },
  {
    id: "8fb23da8-2355-4b9b-929f-17a9b77aa45b",
    name: "Stamm",
    tag: "DOG",
    owner: "Jacquelyn",
    grade: 4,
    age: 1,
    birthAt: "2017-11-10T12:27:12.280Z",
  },
];
