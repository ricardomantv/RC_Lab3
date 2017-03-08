var skies = document.querySelectorAll(".togglesky");
var show_sky = new Array(skies.length);
for(var i = 0; i < show_sky.length; i++) {
  show_sky[i] = false;
}

AFRAME.registerComponent('rcvidsphere', {
  schema: {
    triggerrad: {type: 'number', default: 1.0},
    vid: {type: 'string'}
  },

  init: function() {
    this.triggerpos = new THREE.Vector3();
  },

  update: function() {
    var temppos = this.el.getAttribute('position');
    this.triggerpos.set(temppos.x, temppos.y, temppos.z);
  },

  tick: function() {
    var blank_sky = document.querySelector('#blank_sky');
    var scene = document.querySelector('a-scene');
    var campos = scene.camera.getWorldPosition();

    var sky = document.querySelector("#" + this.data.vid);
    var index = parseInt(this.data.vid.replace('pano', ''));
    if(campos.distanceTo(this.triggerpos) < this.data.triggerrad) {
      sky.setAttribute("visible", true);
      this.el.setAttribute("visible", false);
      show_sky[index] = true;
    } else {
      sky.setAttribute("visible", false);
      this.el.setAttribute("visible", true);
      show_sky[index] = false;
    }

    var no_sphere = true;
    for(var i = 0; i < show_sky.length; i++) {
      if(show_sky[i]) {
        no_sphere = false;
      }
    }

    if(!no_sphere) {
      blank_sky.setAttribute("visible", true);
      for(var i = 0; i < skies.length; i++) {
        var sky = skies[i];
        sky.setAttribute("visible", false);
      }
    }
  }
}
);
