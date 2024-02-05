# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [3.0.1](https://github.com/pex-gl/pex-geom/compare/v3.0.0...v3.0.1) (2024-02-05)



# [3.0.0](https://github.com/pex-gl/pex-geom/compare/v3.0.0-alpha.4...v3.0.0) (2024-02-05)


### Bug Fixes

* check for first array element in fromPoints to determine if flat ([c459e84](https://github.com/pex-gl/pex-geom/commit/c459e84b12ed7759e046570cd8b65db600e17061)), closes [#24](https://github.com/pex-gl/pex-geom/issues/24)



# [3.0.0-alpha.4](https://github.com/pex-gl/pex-geom/compare/v3.0.0-alpha.3...v3.0.0-alpha.4) (2023-06-01)



# [3.0.0-alpha.3](https://github.com/pex-gl/pex-geom/compare/v3.0.0-alpha.2...v3.0.0-alpha.3) (2022-09-09)


### Bug Fixes

* pex-math types ([f36ea53](https://github.com/pex-gl/pex-geom/commit/f36ea5317dce1648d08489c396dd316547ef75cc))



# [3.0.0-alpha.2](https://github.com/pex-gl/pex-geom/compare/v3.0.0-alpha.1...v3.0.0-alpha.2) (2022-07-12)


### Features

* add toString ([3f4b23e](https://github.com/pex-gl/pex-geom/commit/3f4b23e3a5bf8a1b4b8a61fed22f1879af1d05d1))



# [3.0.0-alpha.1](https://github.com/pex-gl/pex-geom/compare/v3.0.0-alpha.0...v3.0.0-alpha.1) (2022-07-07)


### Bug Fixes

* wrong pex-math import path ([26b7b8a](https://github.com/pex-gl/pex-geom/commit/26b7b8a7089f17f89f8571fa31f36d8aa142632d))



# [3.0.0-alpha.0](https://github.com/pex-gl/pex-geom/compare/v2.0.2...v3.0.0-alpha.0) (2022-06-30)


### Bug Fixes

* remove unused import in plane ([a880b57](https://github.com/pex-gl/pex-geom/commit/a880b577b17b99faafd39bd8ca33037748f80278))


### Code Refactoring

* use ES modules ([8917754](https://github.com/pex-gl/pex-geom/commit/891775457b2b43926214361ac61c8b704ff20466))


### Features

* add aabb containsPoint ([37243ec](https://github.com/pex-gl/pex-geom/commit/37243ecb52bf5ff4949e04c8e20aa68fc640c31d))
* add enum for plane side ([43897e4](https://github.com/pex-gl/pex-geom/commit/43897e4a84e11db7831a548e4841937b3a84d570))
* change enum case to pascal case ([40a4c06](https://github.com/pex-gl/pex-geom/commit/40a4c06cf99e96c0c51d7140c13e3833e3c8335e))
* change hitTestPlane signature to use plane ([35c7ca2](https://github.com/pex-gl/pex-geom/commit/35c7ca2324f9d8eb22d70f0d329827c555357f9d))
* handle TypedArray in aabb/rect.fromPoints ([440d399](https://github.com/pex-gl/pex-geom/commit/440d3994ae7e3e864c4e2836576be62667290460))
* remove getRayIntersection ([f6ac708](https://github.com/pex-gl/pex-geom/commit/f6ac7080c8b7a059286531c398b7ade47c1900dd))
* remove setPoints and change fromPoints signature ([76f4b03](https://github.com/pex-gl/pex-geom/commit/76f4b03090c5380091f2d15f1428b76413f4be69))
* rename rect/aabb.getPoints to getCorners ([c96bca0](https://github.com/pex-gl/pex-geom/commit/c96bca069aed771437f85048739568fc6984c2b1))
* rename setPoints to fromPoints ([935451c](https://github.com/pex-gl/pex-geom/commit/935451ce2989e75b57bd371037092290e48bd52b))
* update code, docs and tests ([0826b88](https://github.com/pex-gl/pex-geom/commit/0826b880f9199b528b5ec6a852d4ae6dd27d4547))


### Performance Improvements

* destructure plane.side plane argument ([7b5643f](https://github.com/pex-gl/pex-geom/commit/7b5643f6c2bf08a6e5ffa7205f797171e7fcf8be))


### BREAKING CHANGES

* API rename and removals
* switch to type module
