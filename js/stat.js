"use strict";

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const X_START_CLOUD = 100;
const Y_START_CLOUD = 10;
const COLOR_MAIN_CLOUD = `#ffffff`;
const COLOR_SHADOW_CLOUD = `rgba(0, 0, 0, 0.7)`;
const SHADOW_OFFSET_X = 10;
const SHADOW_OFFSET_Y = 10;
const MAX_HEIGHT_GRAPH = 150;
const WIDTH_COLUMN = 40;
const GAP_COLUMN = 50;
const COLOR_YOUR_COLUMN = `rgba(255, 0, 0, 1)`;
const YOUR_NICKNAME = `Вы`;
const MESSAGE_LINE1 = `Ура вы победили!`;
const MESSAGE_LINE2 = `Список результатов:`;
const xOffsetMessage = 60;
const yOffsetMessage = 20;
const FONT_SIZE_MESSAGE = 16;
const lineHeightMessage = FONT_SIZE_MESSAGE * 1.2;
const playerNameMarginBottom = 10;
const playerPointsMarginBottom = 10;
const playerColumnMarginBottom = playerNameMarginBottom + FONT_SIZE_MESSAGE + 5;


const getColorTheirColumnHSL = function () {
  const hue = `240`;
  const saturate = Math.round(Math.random() * 100) + `%`;
  const lightness = `50%`;
  const hsl = `hsl(${hue}, ${saturate}, ${lightness})`;
  return hsl;
};

const renderCloud = function (ctx, xPosition, yPosition, colorCloud, colorShadow) {
  const quantityLayersShadow = 1;
  for (let j = quantityLayersShadow; j >= 0; j--) {
    let xPositionLayers = [];
    xPositionLayers[j] = xPosition + SHADOW_OFFSET_X * j;
    let yPositionLayers = [];
    yPositionLayers[j] = yPosition + SHADOW_OFFSET_Y * j;
    ctx.fillStyle = j === 0 ? colorCloud : colorShadow;
    ctx.fillRect(xPositionLayers[j], yPositionLayers[j], CLOUD_WIDTH, CLOUD_HEIGHT);
  }
};

const renderText = function (ctx, Message, xText, yText) {
  ctx.fillStyle = `#000`;
  ctx.font = `${FONT_SIZE_MESSAGE}px PT Mono`;
  ctx.fillText(Message, xText, yText);
};

const renderColumn = function (ctx, xPosition, yPosition, namePlayers, timePlayers) {
  const maxTime = Math.max.apply(null, timePlayers);
  const coefficientRecalcHeight = MAX_HEIGHT_GRAPH / maxTime;
  const heightColumns = timePlayers.map(function (timePlayer) {
    return Math.round(timePlayer * coefficientRecalcHeight);
  });
  for (let i = 0; i < namePlayers.length; i++) {
    renderText(ctx, namePlayers[i], xPosition + GAP_COLUMN + (WIDTH_COLUMN + GAP_COLUMN) * i, yPosition + CLOUD_HEIGHT - playerNameMarginBottom);
    renderText(ctx, Math.round(timePlayers[i]), xPosition + GAP_COLUMN + (WIDTH_COLUMN + GAP_COLUMN) * i, yPosition + CLOUD_HEIGHT - playerColumnMarginBottom - heightColumns[i] - playerPointsMarginBottom);
    ctx.fillStyle = namePlayers[i] === YOUR_NICKNAME ? COLOR_YOUR_COLUMN : getColorTheirColumnHSL();
    ctx.fillRect(xPosition + GAP_COLUMN + (WIDTH_COLUMN + GAP_COLUMN) * i, yPosition + CLOUD_HEIGHT - playerColumnMarginBottom - heightColumns[i], WIDTH_COLUMN, heightColumns[i]);
  }
};

window.renderStatistics = function (ctx, namePlayers, timePlayers) {
  renderCloud(ctx, X_START_CLOUD, Y_START_CLOUD, COLOR_MAIN_CLOUD, COLOR_SHADOW_CLOUD);
  renderText(ctx, MESSAGE_LINE1, X_START_CLOUD + xOffsetMessage, Y_START_CLOUD + yOffsetMessage);
  renderText(ctx, MESSAGE_LINE2, X_START_CLOUD + xOffsetMessage, Y_START_CLOUD + yOffsetMessage + lineHeightMessage);
  renderColumn(ctx, X_START_CLOUD, Y_START_CLOUD, namePlayers, timePlayers);
};
