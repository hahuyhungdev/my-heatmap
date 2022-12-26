var tooltip = document.createElement("tooltip");
export function updateTooltip(x, y, value) {
  // + 15 for distance to cursor
  var transform = "translate(" + (x + 15) + "px, " + (y + 15) + "px)";
  tooltip.style.MozTransform = transform; /* Firefox */
  tooltip.style.msTransform = transform; /* IE (9+) - note ms is lowercase */
  tooltip.style.OTransform = transform; /* Opera */
  tooltip.style.WebkitTransform = transform; /* Safari and Chrome */
  tooltip.style.transform = transform; /* One day, my pretty */
  tooltip.innerHTML = value;
}
