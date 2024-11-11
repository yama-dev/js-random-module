# RANDOM MODULE

<br>

## Feature

It's a random action utility.

<br>

## Demo

- [https://yama-dev.github.io/js-random-module/examples/](https://yama-dev.github.io/js-random-module/examples/)

<br>

## Installation,Download

- Standalone(CDN) -> [https://cdn.jsdelivr.net/gh/yama-dev/js-random-module@v0.5.0/dist/js-random-module.js](https://cdn.jsdelivr.net/gh/yama-dev/js-random-module@v0.5.0/dist/js-random-module.js)

<br>

## Using

### NPM Usage

``` bash
# install npm.
npm install --save-dev @yama-dev/js-random-module
```

``` javascript
// import.
import RANDOM_MODULE from '@yama-dev/js-random-module';
```

### Basic Standalone Usage

``` html
<div class="js-bg">
  <div class="js-bg-item">test-1</div>
  <div class="js-bg-item">test-2</div>
  <div class="js-bg-item">test-3</div>
  <div class="js-bg-item">test-4</div>
  <div class="js-bg-item">test-5</div>
</div>

<script src="./js-random-module.js"></script>
<script>
const RAM = new RANDOM_MODULE('.js-bg-item',{
  elemWrap: '.js-bg',
  durationX2: 3000,
  interval: 1000,
  intervalDeflection: 500,
  addClassName: ['is-active','is-current'],
  autoStart: true,
  preStartCount: 1,
  leaveStop: true,
  positionRandom: true,
  repeat: true
});
</script>
```

<br>

## Dependencies

none

<br>

## Licence

[MIT](https://github.com/yama-dev/js-random-module/blob/master/LICENSE)

<br>

## Author

[yama-dev](https://github.com/yama-dev)

