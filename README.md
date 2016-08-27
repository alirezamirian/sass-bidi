# sass-bidi
Handy mixins for handling rtl and ltr at the same time

#Installation
```
npm install sass-bidi --save-dev
```
# Usage
```sass
// some-of-your-scss-files.scss
@import '../node_modules/sass-bidi/main';
.some-selector{
  // set float to left for ltr and right for rtl
  @include bidi-value(float, left, right);
  // set 10px left-padding for ltr and right-padding for rtl
  @include bidi-prop(padding-left, padding-right, 10px);
}
```