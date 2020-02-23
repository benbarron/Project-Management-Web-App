const mix = require('laravel-mix');

mix
  .react('./Resources/Js/', './Public/js/app.js')
  .sass('./Resources/Scss/app.scss', 'Public/css/app.css');
