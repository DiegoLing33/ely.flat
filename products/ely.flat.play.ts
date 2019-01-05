/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 +                                                                            +
 + ,--. o                   |    o                                            +
 + |   |.,---.,---.,---.    |    .,---.,---.                                  +
 + |   |||---'|   ||   |    |    ||   ||   |                                  +
 + `--' ``---'`---|`---'    `---'``   '`---|                                  +
 +            `---'                    `---'                                  +
 +                                                                            +
 + Copyright (C) 2016-2019, Yakov Panov (Yakov Ling)                          +
 + Mail: <diegoling33@gmail.com>                                              +
 +                                                                            +
 + Это программное обеспечение имеет лицензию, как это сказано в файле        +
 + COPYING, который Вы должны были получить в рамках распространения ПО.      +
 +                                                                            +
 + Использование, изменение, копирование, распространение, обмен/продажа      +
 + могут выполняться исключительно в согласии с условиями файла COPYING.      +
 +                                                                            +
 + Проект: ely.flat                                                           +
 +                                                                            +
 + Файл: ely.flat.play.ts                                                     +
 + Файл изменен: 05.01.2019 23:09:43                                          +
 +                                                                            +
 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

//
//  ely.flat.play -- модификация для ely.flat, с возможностью
//  разработки 2D tile-based игры.
//

import efKeyboard from "@play/controllers/efKeyboard";
import efMouse from "@play/controllers/efMouse";
import ef2DSprite from "@play/ef2DSprite";
import efGame from "@play/efGame";
import efGameCanvas from "@play/efGameCanvas";
import efGameRenderer from "@play/efGameRenderer";
import efCharacter from "@play/entities/efCharacter";
import efEntity from "@play/entities/efEntity";
import ef2DSpritesManager from "@play/managers/ef2DSpritesManager";

export {
    ef2DSpritesManager,
    efKeyboard,
    efMouse,
    efGameCanvas,
    efGameRenderer,
    ef2DSprite,
    efEntity,
    efCharacter,
    efGame,
};
