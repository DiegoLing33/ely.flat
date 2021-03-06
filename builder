#!/bin/bash

##### Projects paths
ELY_FLAT_APPLICATION_PATH="ely.flat.application"
ELY_FLAT_INSTALLER_PATH="ely.flat.installer"

##### Directories
APPLICATION_SASS_DIR="${ELY_FLAT_APPLICATION_PATH}/sass"
PRODUCTS_DIR="products"
INSTALLER_BUILD_DIR="${ELY_FLAT_INSTALLER_PATH}/build"
INSTALLER_RES_DIR="${ELY_FLAT_INSTALLER_PATH}/resources"

##### Files names
ELY_FLAT_FILE_NAME="ely.flat.js"
ELY_FLAT_SINGLE_FILE_NAME="ely.flat.single.js"
ELY_FLAT_STYLE_X_SOURCE_FILE_NAME="efx.scss"
ELY_FLAT_STYLE_X_DIST_FILE_NAME="efx.css"

##### Paths
ELY_FLAT_DIST_FILE_PATH="${PRODUCTS_DIR}/${ELY_FLAT_FILE_NAME}"
ELY_FLAT_SINGLE_DIST_FILE_PATH="${PRODUCTS_DIR}/${ELY_FLAT_SINGLE_FILE_NAME}"

##### Binary paths
ROLLUP_PATH="node_modules/.bin/rollup"
SASS_PATH="node_modules/.bin/sass"
COMPODOC_PATH="node @compodoc/compodoc/bin/index-cli.js"

ELY_FLAT_STYLE_X_SOURCE_FILE_PATH="${APPLICATION_SASS_DIR}/${ELY_FLAT_STYLE_X_SOURCE_FILE_NAME}"
ELY_FLAT_STYLE_X_DIST_FILE_PATH="${PRODUCTS_DIR}/${ELY_FLAT_STYLE_X_DIST_FILE_NAME}"

BUILDS_NUMBERS_FILE_PATH="${PRODUCTS_DIR}/builds.txt"

#### Flags
SAVE_MAPS_FLAG=false
CREATE_SINGLE_FLAG=true
BUILD_FLAG=true
CSS_FLAG=false
JS_FLAG=false
DOC_FLAG=false

# Flags detecting
for i in "$@" ; do
    if [[ "$i" == "-saveMaps" ]]; then
        SAVE_MAPS_FLAG=true
        echo "FLAG: $i. Maps will be saved!"
    elif [[ "$i" == "-noSingle" ]]; then
        echo "FLAG: $i. Single version won't be created!"
        CREATE_SINGLE_FLAG=false
    elif [[ "$i" == "-noBuild" ]]; then
        echo "FLAG: $i. ely.flat won't be built!"
        BUILD_FLAG=true
    elif [[ "$i" == "-js" ]]; then
        echo "FLAG: $i. JS BUILDING MODE"
        JS_FLAG=true
    elif [[ "$i" == "-css" ]]; then
        echo "FLAG: $i. CSS BUILDING MODE"
        CSS_FLAG=true
    elif [[ "$i" == "-doc" ]]; then
        echo "FLAG: $i. CSS BUILDING DOC"
        DOC_FLAG=true
    elif [[ "$i" == "-a" ]]; then
        echo "FLAG: $i. ALL BUILDING MODE"
        CSS_FLAG=true
        JS_FLAG=true
    fi
done


if ${JS_FLAG}; then

    if ${BUILD_FLAG}; then
        echo "Building the ely.flat to the path: [${ELY_FLAT_DIST_FILE_PATH}]"
        cd ${ELY_FLAT_APPLICATION_PATH}
        ../${ROLLUP_PATH} -c
        cd ../
        raw=$(sed -n "2p" ${BUILDS_NUMBERS_FILE_PATH})
        typeset -i build_number=${raw}
        build_number=build_number+1
        sed -i "" '2 s/'${raw}'/'${build_number}'/' ${BUILDS_NUMBERS_FILE_PATH}
        echo "BUILD NUMBER: ${build_number}"

    fi

    if ${CREATE_SINGLE_FLAG}; then
        echo "Creating single version..."
        cp ${ELY_FLAT_DIST_FILE_PATH} ${ELY_FLAT_SINGLE_DIST_FILE_PATH}
        sed -i "" "/export/d" ${ELY_FLAT_SINGLE_DIST_FILE_PATH}
        sed -i "" "/\/\/\# sourceMappingURL/d" ${ELY_FLAT_SINGLE_DIST_FILE_PATH}
    fi

    if ! ${SAVE_MAPS_FLAG}; then
        echo "Removing .map files and links..."
        sed -i "" "/\/\/\# sourceMappingURL/d" ${ELY_FLAT_DIST_FILE_PATH}
        rm "${ELY_FLAT_DIST_FILE_PATH}.map"
    fi


    echo "Copying the ely.flat DIST to efi project..."
    cp ${ELY_FLAT_DIST_FILE_PATH} ${INSTALLER_BUILD_DIR}

fi

if ${CSS_FLAG}; then
    echo "Compiling css..."
    ${SASS_PATH} ${ELY_FLAT_STYLE_X_SOURCE_FILE_PATH} ${ELY_FLAT_STYLE_X_DIST_FILE_PATH}
    raw=$(sed -n "4p" ${BUILDS_NUMBERS_FILE_PATH})
    typeset -i build_number=${raw}
    build_number=build_number+1
    sed -i "" '4 s/'${raw}'/'${build_number}'/' ${BUILDS_NUMBERS_FILE_PATH}
    echo "BUILD NUMBER: ${build_number}"

    if ! ${SAVE_MAPS_FLAG}; then
    echo "Removing style map data..."
        sed -i "" "\/\*\# sourceMappingURL/d" ${ELY_FLAT_STYLE_X_DIST_FILE_PATH}
        rm ${ELY_FLAT_STYLE_X_DIST_FILE_PATH}.map
    fi

    echo "Copying to the efi..."
    echo "Copying the main file..."
    cp "${ELY_FLAT_STYLE_X_DIST_FILE_PATH}" "${INSTALLER_RES_DIR}/css"
    if ${SAVE_MAPS_FLAG}; then
    echo "Copying the map file..."
        cp "${ELY_FLAT_STYLE_X_DIST_FILE_PATH}.map" "${INSTALLER_RES_DIR}/css"
    fi
fi

if ${DOC_FLAG}; then
    ${COMPODOC_PATH} -p tsconfig.json --disableSourceCode --disablePrivate -n "ely.flat { doc }" --language "ru-RU" -d "docs"
fi
