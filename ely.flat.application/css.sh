echo "Compiling css..."
sass ./sass/efx.scss ../products/efx.css
echo "Done."
echo "Copying css files..."
cp ../products/efx.css ../ely.flat.installer/res/css && cp ../products/efx.css.map ../ely.flat.installer/res/css
echo "Done."
