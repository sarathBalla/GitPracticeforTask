/**
 * This file is used to test the hooks functionality of the framework.
 */

import { test as baseTest } from "../fixtures/pom-fixture";
import CommonUtil from "../utils/CommonUtils";

type CommonFixtureTypes = {
  commonUtils: CommonUtil;
};

export const test = baseTest.extend<CommonFixtureTypes>({
  commonUtils: async ({}, use) => {
    await use(new CommonUtil());
  },
});
