let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  backward: [1, 2, 3, 4, 5, 6],
  forward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6],
};

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return "images/" + animation + "/" + frameNumber + ".png";
};

let loadImages = (callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    backward: [],
    forward: [],
    block: [],
  };
  let imagesToLoad = 0;
  let action = Object.keys(images);
  action.forEach((animation) => {
    let animationFrames = frames[animation];
    console.log(animationFrames);

    imagesToLoad = imagesToLoad + animationFrames.length;

    animationFrames.forEach((frameNumber) => {
      let path = imagePath(frameNumber, animation);

      loadImage(path, (image) => {
        imagesToLoad = imagesToLoad - 1;
        images[animation][frameNumber - 1] = image;
        if (imagesToLoad === 0) callback(images);
      });
    });
  });
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, canvas.height, canvas.width);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let queuedAnimation = [];

  let aux = () => {
    let selectedAnimation;
    if (queuedAnimation.length !== 0) {
      selectedAnimation = queuedAnimation.shift();
    } else {
      selectedAnimation = "idle";
    }
    animate(ctx, images, selectedAnimation, aux);
  };

  document.getElementById("kick").onclick = () => {
    queuedAnimation.push("kick");
  };

  document.getElementById("punch").onclick = () => {
    queuedAnimation.push("punch");
  };

  document.getElementById("forward").onclick = () => {
    queuedAnimation.push("forward");
  };

  document.getElementById("backward").onclick = () => {
    queuedAnimation.push("backward");
  };

  document.getElementById("block").onclick = () => {
    queuedAnimation.push("block");
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key === "ArrowUp") {
      queuedAnimation.push("kick");
    } else if (key === "ArrowDown") {
      queuedAnimation.push("punch");
    } else if (key === "ArrowRight") {
      queuedAnimation.push("forward");
    } else if (key === "ArrowLeft") {
      queuedAnimation.push("backward");
    } else if (key === " ") {
      queuedAnimation.push("block");
    }
  });

  aux();
});
