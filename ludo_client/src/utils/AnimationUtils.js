export const getColoredAnimation = (animation, color) => {
  const updatedAnimation = JSON.parse(JSON.stringify(animation));
  updatedAnimation.layers.forEach((layer) => {
    layer.shapes?.forEach((shape) => {
      if (shape.c) {
        shape.c.k = hexToRGBA(color);
      }
    });
  });

  return updatedAnimation;
};

const hexToRGBA = (hexColor) => {
  const bigint = parseInt(hexColor.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r / 255, g / 255, b / 255, 1];
};
