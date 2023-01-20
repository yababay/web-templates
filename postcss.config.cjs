module.exports = {
  plugins: [
    require('./src/lib/postcss-bootstrap-icons.cjs'),
    require('autoprefixer'),
    require('tailwindcss')
  ]
}
