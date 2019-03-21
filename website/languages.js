/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const languages = [{
    enabled: false,
    name: 'English',
    tag: 'en',
  },
  {
    enabled: true,
    name: 'English',
    tag: 'en-US',
  },
  {
    enabled: true,
    name: '中文',
    tag: 'zh-CN',
  },
];

if (process.env.ENABLE_SOURCE_DOCS) {
  languages[0].enabled = true
  languages[1].enabled = false
  languages[2].enabled = false
}
module.exports = languages;
