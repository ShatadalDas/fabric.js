const canvas = new fabric.Canvas("my-canvas", {
  height: 350,
  width: 350,
});

const reader = new FileReader();
const file = document.getElementById("image");
file.addEventListener("change", () => {
  const imgEl = file.files[0];
  reader.readAsDataURL(imgEl);
});

reader.addEventListener("load", () => {
  fabric.Image.fromURL(reader.result, (img) => {
    img.set({
      left: 0,
      top: 0,
    });
    img.scaleToHeight(300);
    img.scaleToWidth(300);
    canvas.add(img);
    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.setZoom(zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  });
});

canvas.requestRenderAll();
