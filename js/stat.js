"use strict";

const cloudWidth = 420;
const cloudHeight = 270;
const xStartCloud = 100;
const yStartCloud = 10;
const colorMainCloud = `#ffffff`;
const colorShadowCloud = `rgba(0, 0, 0, 0.7)`;
const maxHeightGraph = 150;
const widthColumn = 40;
const gapColumn = 50;
const colorYourColumn = `rgba(255, 0, 0, 1)`;

const getColorTheirColumnHSL = function () {
  const hue = `240`;
  const saturate = Math.round(Math.random() * 100) + `%`;
  const lightness = `50%`;
  const hsl = `hsl(${hue}, ${saturate}, ${lightness})`;
  return hsl;
};

const renderCloud = function (ctx, xPosition, yPosition, colorCloud, colorShadow) {
  ctx.fillStyle = colorShadow;
  ctx.fillRect(xPosition + 10, yPosition + 10, cloudWidth, cloudHeight);
  ctx.fillStyle = colorCloud;
  ctx.fillRect(xPosition, yPosition, cloudWidth, cloudHeight);
};

const renderColumn = function (ctx, xPosition, yPosition, namePlayers, timePlayers) {
  const maxTime = Math.max.apply(null, timePlayers);
  const coefficientRecalcHeight = maxHeightGraph / maxTime;
  const heightColumns = timePlayers.map(function (timePlayer) {
    return Math.round(timePlayer * coefficientRecalcHeight);
  });
  for (let i = 0; i < namePlayers.length; i++) {
    ctx.fillStyle = `#000`;
    ctx.fillText(namePlayers[i], xPosition + gapColumn + (widthColumn + gapColumn) * i, yPosition + cloudHeight - 10);
    ctx.fillText(Math.round(timePlayers[i]), xPosition + gapColumn + (widthColumn + gapColumn) * i, yPosition + cloudHeight - heightColumns[i] - 40);
    ctx.fillStyle = namePlayers[i] === `Вы` ? colorYourColumn : getColorTheirColumnHSL();
    ctx.fillRect(xPosition + gapColumn + (widthColumn + gapColumn) * i, yPosition + cloudHeight - 30 - heightColumns[i], widthColumn, heightColumns[i]);
  }
};

window.renderStatistics = function (ctx, namePlayers, timePlayers) {
  renderCloud(ctx, xStartCloud, yStartCloud, colorMainCloud, colorShadowCloud);
  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.fillText(`Ура вы победили!`, xStartCloud + 60, yStartCloud + 20);
  ctx.fillText(`Список результатов:`, xStartCloud + 60, yStartCloud + 45);
  renderColumn(ctx, xStartCloud, yStartCloud, namePlayers, timePlayers);
};
