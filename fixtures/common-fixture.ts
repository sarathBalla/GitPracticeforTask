/**
 * This file is used to test the hooks functionality of the framework.
 */

import { test as baseTest } from "../fixtures/pom-fixture";
import CommonUtil from "../utils/CommonUtils";
import CommonapiUtils from "../utils/CommonapiUtils"

type CommonFixtureTypes = {
  commonUtils: CommonUtil,
  commonUtilapi: CommonapiUtils
};

export const test = baseTest.extend<CommonFixtureTypes>({
  commonUtils: async ({}, use) => {
    await use(new CommonUtil());
  },
  commonUtilapi: async ({request}, use) => {
    await use(new CommonapiUtils(request));
  }
});
