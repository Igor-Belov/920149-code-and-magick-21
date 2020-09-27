"use strict";

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_START_X = 100;
const CLOUD_START_Y = 10;
const CLOUD_COLOR_MAIN = `#ffffff`;
const CLOUD_COLOR_SHADOW = `rgba(0, 0, 0, 0.7)`;
const SHADOW_OFFSET_X = 10;
const SHADOW_OFFSET_Y = 10;
const COLUMN_HEIGHT_MAX = 150;
const COLUMN_WIDTH = 40;
const COLUMN_GAP = 50;
const COLUMN_YOUR_COLOR = `rgba(255, 0, 0, 1)`;
const YOUR_NICKNAME = `Вы`;
const MESSAGE_LINE1 = `Ура вы победили!`;
const MESSAGE_LINE2 = `Список результатов:`;
const MESSAGE_OFFSET_X = 60;
const MESSAGE_OFFSET_Y = 20;
const MESSAGE_FONT_SIZE = 16;
const MESSAGE_LINE_HEIGHT = MESSAGE_FONT_SIZE * 1.2;
const PLAYER_NAME_MARGIN_BOTTOM = 10;
const PLAYER_POINTS_MARGIN_BOTTOM = 10;
const PLAYER_COLUMN_MARGIN_BOTTOM = 10;

const getColorTheirColumnHSL = function () {
  const hue = `240`;
  const saturate = Math.round(Math.random() * 100) + `%`;
  const lightness = `50%`;
  const hsl = `hsl(${hue}, ${saturate}, ${lightness})`;
  return hsl;
};

const renderCloudWithShadow = function (ctx, xPosition, yPosition, colorCloud, colorShadow) {
  const quantityLayersShadow = 1;
  for (let j = quantityLayersShadow; j >= 0; j--) {
    let xPositionLayer = xPosition + SHADOW_OFFSET_X * j;
    let yPositionLayer = yPosition + SHADOW_OFFSET_Y * j;
    ctx.fillStyle = j === 0 ? colorCloud : colorShadow;
    ctx.fillRect(xPositionLayer, yPositionLayer, CLOUD_WIDTH, CLOUD_HEIGHT);
  }
};

const renderText = function (ctx, Message, xText, yText) {
  ctx.fillStyle = `#000`;
  ctx.font = `${MESSAGE_FONT_SIZE}px PT Mono`;
  ctx.fillText(Message, xText, yText);
};

const renderColumn = function (ctx, xPosition, yPosition, namePlayers, timePlayers) {
  const columnStartX = xPosition + COLUMN_GAP;
  const columnOffsetX = COLUMN_WIDTH + COLUMN_GAP;
  const columnStartY = nameStartY - MESSAGE_FONT_SIZE - PLAYER_COLUMN_MARGIN_BOTTOM;
  const nameStartY = yPosition + CLOUD_HEIGHT - PLAYER_NAME_MARGIN_BOTTOM;
  const pointsStartY = columnStartY - PLAYER_POINTS_MARGIN_BOTTOM;
  const maxTime = Math.max.apply(null, timePlayers);
  const coefficientRecalcHeight = COLUMN_HEIGHT_MAX / maxTime;
  const columnsHeight = timePlayers.map(function (timePlayer) {
    return Math.round(timePlayer * coefficientRecalcHeight);
  });
  for (let i = 0; i < namePlayers.length; i++) {
    const columnPositionX = columnStartX + columnOffsetX * i;
    renderText(ctx, namePlayers[i], columnPositionX, nameStartY);
    renderText(ctx, Math.round(timePlayers[i]), columnPositionX, pointsStartY - columnsHeight[i]);
    ctx.fillStyle = namePlayers[i] === YOUR_NICKNAME ? COLUMN_YOUR_COLOR : getColorTheirColumnHSL();
    ctx.fillRect(columnPositionX, columnStartY - columnsHeight[i], COLUMN_WIDTH, columnsHeight[i]);
  }
};

window.renderStatistics = function (ctx, namePlayers, timePlayers) {
  const messageStartX = CLOUD_START_X + MESSAGE_OFFSET_X;
  const messageStartY = CLOUD_START_Y + MESSAGE_OFFSET_Y;
  renderCloudWithShadow(ctx, CLOUD_START_X, CLOUD_START_Y, CLOUD_COLOR_MAIN, CLOUD_COLOR_SHADOW);
  renderText(ctx, MESSAGE_LINE1, messageStartX, messageStartY);
  renderText(ctx, MESSAGE_LINE2, messageStartX, messageStartY + MESSAGE_LINE_HEIGHT);
  renderColumn(ctx, CLOUD_START_X, CLOUD_START_Y, namePlayers, timePlayers);
};
