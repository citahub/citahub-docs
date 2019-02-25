# CITAHub Docs

### Visit the documentation site: [CITAHub Docs](https://docs.citahub.com/)

### Update documents

* Add or modify the docs under `docs` folder.
* Modify sidebar in `sidebars.json`

### Build the documentation site

#### Initializing the website

  ```shell
  $ cd website
  $ yarn install
  ```

  > **Note**
  >
  > You can also install by npm:
  >
  > ```shell
  > $ npm install
  > ```

#### Update Sidebar Titles

```shell
$ cd website && yarn run write-translations
```

#### Update Latest Docs in Crowdin

> Crowdin-CLI Required - [Crowdin-CLI](https://support.crowdin.com/cli-tool/)

> Crowdin Config Required - set project identifier and apikey in `crowdin.yaml`

1. Upload latest docs to crowdin

```shell
$ yarn run crowdin:upload
```

2. Download latest translated docs from crowdin

```shell
$ yarn run crowdin:download
```

#### Deploy to Github Pages

```shell
$ cd website && GIT_USER=<your_git_username> CURRENT_BRANCH=master USE_SSH=true yarn run publish-gh-pages
```
