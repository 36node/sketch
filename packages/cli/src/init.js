import path from "path";
import ora from "ora";
import { copy, remove, move } from "fs-extra";
import { get, set } from "lodash";

import download from "./download-npm-package";
import * as jsonfile from "./lib/jsonfile-then";

async function initExpo(tpl, dest = ".", options = {}, spinner) {
  try {
    const pkgFile = path.join(dest, "package.json");
    const pkgJson = await jsonfile.readFile(pkgFile);
    delete pkgJson.version;
    delete pkgJson.name;
    await jsonfile.writeFile(pkgFile, pkgJson, { spaces: 2 });
    spinner.succeed(`Package.json cooked! ${path.resolve(dest)}`);
  } catch (err) {
    spinner.fail("Modifying package.json failed.");
    throw err;
  }

  try {
    spinner.text = "Modifying app.json ...";
    spinner.start();
    const appFile = path.join(dest, "app.json");
    const appJson = await jsonfile.readFile(appFile);

    let { appName, appSlug, bundleIdentifier, androidPackage } = options;
    appJson.expo = appJson.expo || {};
    appJson.expo.version = "0.0.0";

    appJson.expo.name = appName;
    appJson.expo.slug = appSlug;
    appJson.expo.ios = appJson.expo.ios || {};
    appJson.expo.ios.bundleIdentifier = bundleIdentifier;
    appJson.expo.android = appJson.expo.android || {};
    appJson.expo.android.package = androidPackage;
    await jsonfile.writeFile(appFile, appJson, { spaces: 2 });
    spinner.succeed(`App.json cooked! ${path.resolve(dest)}`);
  } catch (err) {
    spinner.fail("Modifying app.json failed.");
    throw err;
  }
}

export default async function init(tpl, dest = ".", options = {}) {
  const pkg = `@36node/template-${tpl}`;
  const spinner = ora(`Downloading template ${pkg}...`);

  try {
    spinner.start();
    await download(pkg, dest);
    spinner.succeed("Downloading success.");
  } catch (err) {
    spinner.fail("Downloading failed.");
    throw err;
  }

  // generate common template files
  try {
    spinner.text = "Generating common template files ...";
    spinner.start();
    await remove(path.join(dest, "CHANGELOG.md"));
    await copy(path.join(__dirname, "../template"), dest, { overwrite: false });
    await move(path.join(dest, "gitignore"), path.join(dest, ".gitignore"), {
      overwrite: true,
    });
    spinner.succeed("Generating common template files success!");
  } catch (err) {
    spinner.fail("Generating common template files failed!");
    throw err;
  }

  if (tpl === "expo") {
    return initExpo(tpl, dest, options, spinner);
  }

  try {
    spinner.text = "Modifying package.json ...";
    spinner.start();
    const pkgFile = path.join(dest, "package.json");
    const pkgJson = await jsonfile.readFile(pkgFile);

    let { name, owner, scope } = options;
    pkgJson.files = ["bin", "dist", "mock", "typings"];
    pkgJson.version = "0.0.0";
    pkgJson.repository = {
      url: `${owner}/${name}`,
      type: "git",
    };
    pkgJson.name = scope ? `@${scope}/${name}` : name;
    if (pkgJson["config-overrides-path"]) {
      pkgJson["config-overrides-path"] =
        "node_modules/@36node/sketch/config-overrides";
    }

    if (get(pkgJson, "scripts.styleguide")) {
      set(
        pkgJson,
        "scripts.styleguide",
        "styleguidist server --config node_modules/@36node/sketch/styleguide.config.js"
      );
    }

    if (get(pkgJson, "scripts.styleguide:build")) {
      set(
        pkgJson,
        "scripts.styleguide:build",
        "styleguidist build --config node_modules/@36node/sketch/styleguide.config.js"
      );
    }

    await jsonfile.writeFile(pkgFile, pkgJson, { spaces: 2 });
    spinner.succeed(`Package.json cooked! ${path.resolve(dest)}`);
  } catch (err) {
    spinner.fail("Modifying package.json failed.");
    throw err;
  }
}
