<!-- ===================
	COMPONENT JS - BASIC 
    [TypeScript Written]
=================== -->

<script lang="ts">
  import { getStores, navigating, page, session, updated } from '$app/stores';
  import { browser, dev } from "$app/env";
  import { onDestroy, onMount } from "svelte";
  import { fade, slide } from "svelte/transition";

  import { elementScrollIntoView } from "seamless-scroll-polyfill";

  import { planet_markers } from './data/_planet_markers'

  const { session } = getStores();

  import titan_map_color from './assets/titan-texture.png'
  import info_vector from './assets/info-vector.svg'
  import leagend_vector from './assets/legend-icon.svg'
  import disabled_vector from './assets/disabled-vector.svg'

  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  import { starbased_user_settings } from '$lib/store/userData';

  let test3: boolean = false
  onMount(async() => {
        if (browser) {
            if ($starbased_user_settings.current_test_status.toString() === '3'
             || $page.url.pathname.includes('3')) {
              test3 = true
            }
        }
      });

  // ~~~~~~~~~~~
  // Interactive Titan Simulation
  // ... contains interactive lables and pins for the users benefit
  // ... and information
  // ...
  // ... THREE.JS ROTATING GLOBE CONFIG & SETUP
  // ... EARTH WITH PINS
  // ~~~~~~~~~~~
  // PLANET VISUAL & INTERACTION

  function _convertLatLonToVec3(lat, lon) {
    lat = lat * Math.PI / 180.0;
    lon = -lon * Math.PI / 180.0;
    return new THREE.Vector3(
      Math.cos(lat) * Math.cos(lon),
      Math.sin(lat),
      Math.cos(lat) * Math.sin(lon));
  }

  // --------------------------------
  // 
  // --------------------------------

  function LabelLine(marker, radius, domElement) {
    this._screenVector = new THREE.Vector3(0, 0, 0);
    this.position = _convertLatLonToVec3(marker.coord[0], marker.coord[1]).multiplyScalar(radius);
    // create html overlay box
    this.box = document.createElement('div');
    this.box.innerHTML = marker.name;
    this.box.className = "hudLabel";
    // ...
    this.domElement = domElement;
    this.domElement.appendChild(this.box);
  }
  LabelLine.prototype.update = function () {
    this._screenVector.copy(this.position);
    this._screenVector.project(camera);
    // ...
    var posx = Math.round((this._screenVector.x + 1) * this.domElement.offsetWidth / 2);
    var posy = Math.round((1 - this._screenVector.y) * this.domElement.offsetHeight / 2);
    // ...
    var boundingRect = this.box.getBoundingClientRect();
    // ...
    // update the box overlays position
    this.box.style.left = (posx - boundingRect.width) + 'px';
    this.box.style.top = posy + 'px';
  };

  // --------------------------------
  // ✅ Working - 3D Stand-alone Object
  // --------------------------------

  function InfoBox(marker, radius, domElement) {
    this._screenVector = new THREE.Vector3(0, 0, 0);
    this.position = _convertLatLonToVec3(marker.coord[0], marker.coord[1]).multiplyScalar(radius);
    // create html overlay box
    this.box = document.createElement('div');
    this.box.innerHTML = marker.name;
    this.box.className = "hudLabel";
    // ...
    this.domElement = domElement;
    this.domElement.appendChild(this.box);
  }
  InfoBox.prototype.update = function () {
    this._screenVector.copy(this.position);
    this._screenVector.project(camera);
    // ...
    var posx = Math.round((this._screenVector.x + 1) * this.domElement.offsetWidth / 2);
    var posy = Math.round((1 - this._screenVector.y) * this.domElement.offsetHeight / 2);
    // ...
    var boundingRect = this.box.getBoundingClientRect();
    // ...
    // update the box overlays position
    this.box.style.left = (posx - boundingRect.width) + 'px';
    this.box.style.top = posy + 'px';
  };

  // --------------------------------
  // ❌ Not Working
  // --------------------------------
  
  function Marker() {
    var radius = 0.005;
    var sphereRadius = 0.02;
    var height = 0.05;
    var material = new THREE.MeshPhongMaterial({
      color: 0xDC143C
    });
    var cone = new THREE.Mesh(new THREE.ConeBufferGeometry(radius, height, 8, 1, true), material);
    cone.position.y = height * 0.5;
    cone.rotation.x = Math.PI;
    var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);
    sphere.position.y = height * 0.95 + sphereRadius;
    this.add(cone, sphere);
  }
  $: if (browser) {
    Marker.prototype = Object.create(new THREE.Object3D());
  }

  // --------------------------------
  // ------ Titan object ------------
  // --------------------------------

  function Titan(radius) {
    this.userData.radius = radius;
    var titan = new THREE.Mesh(
      new THREE.SphereBufferGeometry(radius, 64.0, 48.0),
      new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture(titan_map_color),
        })
    );
    this.add(titan);
  }
  var markerarry = [];
  $: if (browser) {
    Titan.prototype = Object.create(new THREE.Object3D());
  }
  // ...
  Titan.prototype.createMarker = function (lat, lon) {
    var marker = new Marker();
    var latRad = lat * (Math.PI / 180);
    var lonRad = -lon * (Math.PI / 180);
    var r = this.userData.radius;
    marker.position.set(Math.cos(latRad) * Math.cos(lonRad) * r, Math.sin(latRad) * r, Math.cos(latRad) * Math.sin(
      lonRad) * r);
    marker.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);
    this.add(marker);
  };

  // --------------------------------
  // ------ Three.js code -----------
  // --------------------------------

  var scene, camera, renderer, label;
  var controls;
  var container
  // ...
  var textlabels = []
  var titan;

  // [WORKING]
  function init() {
    // ...
    scene = new THREE.Scene();
    // ...
    camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
    camera.position.set(0.0, 1.5, 3.0);
    var canvReference = document.getElementById('rotatingGlobe');
    container = document.getElementById('canvas_cont');
    // ...
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvReference
    });
    // ...
    controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -7.0;
    controls.enablePan = false;
    // ...
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.enableKeys = false;
    // ...
    var ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    // ...
    var direcitonal = new THREE.DirectionalLight(0xffffff, 0.5);
    direcitonal.position.set(5.0, 2.0, 5.0).normalize();
    scene.add(direcitonal);
    // ...
    titan = new Titan(0.5);
    // ... [❌]
    // titan.createMarker(48.856700, 2.350800);    // Paris
    // titan.createMarker(51.507222, -0.1275);     // London
    // titan.createMarker(34.050000, -118.250000); // LA
    // ...
    scene.add(titan);

    // ... PROPER-MARKER GENERATION
    var radius1 = 0.5;
    // ...
    planet_markers.forEach(marker => {
      // ...
      var label = new InfoBox(marker, radius1, canvReference);
      //  ....
      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff
      });
      // ...
      var _marker = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), material);
      _marker.userData = marker
      // ...
      _marker.position.copy(label.position);
      scene.add(_marker)
      markerarry.push(_marker)
      
      // ... GENERATE LABELS;
      var text = _createMarkerTextLabel();
      text.setHTML(marker.label_name);
      text.setParent(_marker);
      text.setID(_marker.id)
      textlabels.push(text);
      container.appendChild(text.element);
    });
    
    // --------------------------------
    window.onmousedown = function (event) {
      // the following line would stop any other event handler from firing
      // (such as the mouse's TrackballControls)
      // event.preventDefault();
      // ...
      const rect = renderer.domElement.getBoundingClientRect();
      const left = event.clientX - rect.left;
      const top = event.clientY - rect.top;
      // ...
      const x = (left / rect.width) * 2 - 1;
      const y = -(top / rect.height) * 2 + 1;
      // ...
      const raycaster = new THREE.Raycaster();
      raycaster.ray.origin.setFromMatrixPosition(camera.matrixWorld);
      raycaster.ray.direction.set(x, y, 0.5).unproject(camera).sub(raycaster.ray.origin).normalize();
      // ...
      const intersects = raycaster.intersectObjects(markerarry, true);
      if (dev) console.debug(intersects);
      // ...
      intersects.forEach(sel_marker => {
        // ...
        if (!test3) {
          onSelectedMarker(sel_marker)
          if (dev) console.debug('sel_marker', sel_marker)
        } else {
          test3CheckError()
        }
      });
    }
    // --------------------------------

    window.addEventListener('resize', onResize);
    onResize();
    animate();
    // controls.addEventListener('change', changeLinePosition);
  }

  // ... [WORKING]
  var oldLine = undefined;
  var oldMarker = undefined;
  var oldExtraInfo = undefined;
  var oldHighlightText = undefined;
  var materialLine;
  var points = [];
  var marker_data;
  // ...
  // ... what-to-do-when-marker-is-clicked-and-selected;
  function onSelectedMarker(marker) {
    // ... remove-previous-line;
    if (oldLine) scene.remove(oldLine)
    if (oldMarker) {
      if (oldMarker.object) {
        oldMarker.object.material.color.set(0x00AADF)
      } else {
        oldMarker.material.color.set(0x00AADF)
      }
    }
    if (oldExtraInfo) container.removeChild(oldExtraInfo.element);
    if (oldHighlightText) oldHighlightText.style.backgroundColor = 'transparent'
    // ... extract-marker-position;
    if (dev) console.debug('marker', marker)
    let sel_mark_point;
    if (marker.position) sel_mark_point = marker.position
    else sel_mark_point = marker.object.position
    // ...
    if (marker.object) marker.object.material.color.set(0xff0000);
    else marker.material.color.set(0xff0000);
    // ...
    let _label_point_1 = _convertLatLonToVec3(90, -100).multiplyScalar(1)
    // let _label_point_2 = _convertLatLonToVec3(120, -100).multiplyScalar(1)
    // if (dev) console.debug('_label_point_1', _label_point_1)
    points = [ sel_mark_point, _label_point_1 ]; // ... instances of Vector3
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    materialLine = new THREE.LineBasicMaterial({
      color: 0xff0000,
      linewidth: 0.1
      });
    const line = new THREE.Line(geometry, materialLine);
    oldLine = line
    oldMarker = marker
    // ...
    scene.add(line);
    // ...
    // ... update appropiate-text-container-further-info-show;
    // ...
    marker_data;
    if (marker.object) marker_data = marker.object.userData
    else marker_data = marker.userData

    // ... change-color-of-marker-label;
    textlabels.forEach(label => {
      // ...
      if (label.id === marker_data.id) {
        // ...
        // console.log(label)
        label.element.style.backgroundColor = '#ff0000'
      } else {
        label.element.style.backgroundColor = '#000000'
      }
    });

    // ...
    // ... only-in-test-1-allow-for-scrolling-into-view-text;
    // ...
    if (!test3) {
      var target_text = document.querySelector('#' + marker_data.target_text)
      elementScrollIntoView(target_text, { 
        behavior: "smooth", 
        block: "center", 
        inline: "center" 
      });
      // target_text.scrollIntoView({
      //   behavior: 'smooth'
      // });
      target_text.style.backgroundColor = '#0054ffa6';
      oldHighlightText = target_text
    }
    // ...
    // ... generate-informational-popup;
    // ...
    var text = _createMarkerInfoBoxText();
    text.setHTML(marker_data);
    text.setParent(scene);
    container.appendChild(text.element);
    oldExtraInfo = text
  }

  // [WORKING]
  function onResize() {
    camera.aspect = (window.innerWidth / 2) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
  }

  // [WORKING]
  function animate() {
    //  label.update();
    requestAnimationFrame(animate);
    controls.update();
    // ... update-text-label-for-point;
    for (var i = 0; i < textlabels.length; i++) {
      textlabels[i].updatePosition();
    }
    // ... update-position-end-of-line-coordinate;
    if (oldLine != undefined && oldExtraInfo != undefined) {
      oldExtraInfo.updatePosition();
      updatePositionOfLine(oldLine, oldExtraInfo)
    }
    // ...
    renderer.render(scene, camera);
  }

  // [WORKING]
  function _createMarkerTextLabel() {
    // ...
    var div = document.createElement('div');
    div.className = 'text-label';
    div.style.position = 'absolute';
    div.style.width = '100';
    div.style.height = '100';
    div.innerHTML = "hi there!";
    div.style.top = '-1000';
    div.style.left = '-1000';
    div.style.background = '#000000';
    div.style.padding = '5px';
    div.style.color = 'white';
    div.style.borderRadius = '5px'
    // ...
    return {
      id: 1,
      element: div,
      parent: false,
      position: new THREE.Vector3(0, 0, 0),
      setID: function (id) {
        this.id = id
      },
      setHTML: function (html) {
        this.element.innerHTML = html;
      },
      setParent: function (threejsobj) {
        this.parent = threejsobj;
      },
      updatePosition: function () {
        if (parent) {
          this.position.copy(this.parent.position);
        }
        // ...
        var coords2d = this.get2DCoords(this.position, camera);
        this.element.style.left = coords2d.x + 'px';
        this.element.style.top = coords2d.y + 'px';
      },
      get2DCoords: function (position, camera) {
        var vector = position.project(camera);
        vector.x = (vector.x + 1) / 2 * (window.innerWidth / 2);
        vector.y = -(vector.y - 1) / 2 * window.innerHeight;
        return vector;
      }
    };
  }

  // [WORKING]
  function _createMarkerInfoBoxText() {
    // ...
    var div = document.createElement('div');
    // div.className = 'text-label';
    // div.style.position = 'absolute';
    // div.style.width = '100';
    // div.style.height = '100';
    // div.innerHTML = "hi there!";
    // div.style.top = '-1000';
    // div.style.left = '-1000';
    // div.style.background = '#000000';
    // div.style.padding = '5px';
    // div.style.color = 'white';
    // div.style.borderRadius = '5px';
    // div.style.top = '80px';
    // div.style.right = '30px'
    // ...
    return {
      element: div,
      parent: false,
      position: new THREE.Vector3(0, 0, 0),
      setHTML: function (html) {
        // this.element.innerHTML = `
        //   <div>
        //     <p>
        //       ${html.info.description}
        //     </p>
        //   </div>
        // `;
      },
      setParent: function (threejsobj) {
        this.parent = threejsobj;
      },
      updatePosition: function () {
        if (parent) {
          this.position.copy(this.parent.position);
        }
        // ...
        var coords2d = this.get2DCoords(this.position, camera);
        this.element.style.left = coords2d.x + 'px';
        this.element.style.top = coords2d.y + 'px';
      },
      get2DCoords: function (position, camera) {
        var vector = position.project(camera);
        vector.x = (vector.x + 1) / 2 * (window.innerWidth / 2);
        vector.y = -(vector.y - 1) / 2 * window.innerHeight;
        return vector;
      }
    };
  }

  // [WORKING]
  function updatePositionOfLine(line, info_container) {
    // ... remove previous line;
    scene.remove(oldLine)
    // ... construct-new-line;
    points[1] = info_container.position.unproject(camera).normalize()
    // points[1] = camera.position.unproject(camera).normalize()
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const newLine = new THREE.Line(geometry, materialLine);
    // ... add-in-new-line;
    // newLine.rotation.copy(camera.rotation);
    oldLine = newLine
    scene.add(newLine)
  }

  // ... [REACTIVITY]
  // ... listen to test-3 changes in target-info-question-asked
  // ... update 3D model accordingly;
  $: if (browser && $session.label_ID && markerarry.length != 0) {
    // ...
    markerarry.forEach(marker_ => {
      // ... verify labelID;
      if (marker_.userData.id == 1) {
        // ... get the marker parent-threejs-object;
        onSelectedMarker(marker_)
      }
    });
  }

  // ... [ALTERNATIVE-1-DISCONTINUED]
  // ... checks if the pop-up is visible;
  // ... calculates distance between the `div` marker-label
  // ... and the actual-info-box;
  $: if (browser && oldExtraInfo) {
    // ... get position of the oldExtraInfo;
  }

  // ... check if user is currently on the page, active;
  $: if (browser && !document.hidden) {
    // do what you need
    
  }

  let error_test3: boolean = false
  // ...
  function test3CheckError() {
    error_test3 = true;
    // ...
    setTimeout(async() => {
      error_test3 = false;
    }, 7500)
  }

  // ... when html page is loaded;
  onMount(async() => {
    if (browser) {
      init();
    }
  })
  // ... when html page is destroyed;
  onDestroy(async() => {
    if (browser) {
      init();
    }
  })
</script>

<!-- ===================
	COMPONENT HTML
=================== -->

<img 
  id='legend-box'
  src={leagend_vector} 
  alt="" />

<div 
  in:fade 
  out:fade 
  id='canvas_cont'>
  <!-- VISUAL GLOBE 3D - CANVAS -->
  <canvas 
    id='rotatingGlobe'>
  </canvas>
</div>

<!-- ... further-information-on-label ... -->
{#if marker_data}
  <!-- content here -->
  <div
    id='info-container-box'
    class:test3={test3}
    in:slide>
    <img 
      src={info_vector}
      alt="" 
      width="25px" height="25px" />
    <p
      class='s-14 color-white'>
      {#if !test3}
        {marker_data.info.description}
      {:else}
        {marker_data.info.description_3}
      {/if}
    </p>
  </div>
{/if}

<!-- ... warning error test3 prompt user 
  test3 covnersational agent interact ... -->
{#if error_test3}
  <div
    id='outer-error-box'>
    <!-- content here -->
  </div>

  <div
    id='error-message-test-3'
    class='column-space-center'
    in:slide
    out:fade>
    <!-- ... -->
    <img 
      src={disabled_vector}
      alt="" />
    <!-- ... -->
    <p 
      class='s-14 color-primary'>
      Uh-oh!
    </p>
    <!-- ... -->
    <p 
      class='s-14 color-white'>
      You cannot interact with the model on this test via clicking,
      <br />
      Please ask the agent a question with a label tag name
    </p>
  </div>
{/if}


<!-- ===================
	COMPONENT STYLE
=================== -->

<style>
  /* div#canvas_cont {
    max-width: 50vh;
  }
  div#info-box {
    position: absolute;
    top: 0;
  }
  div.text-label {
    background: #000000;
    border-radius: 5px;
    padding: 5px;
    color: white;
  } */

  img#legend-box {
    position: absolute;
    top: 28px;
    right: 28px;
  }

  div#outer-error-box {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 50vw;
    z-index: 90000000;
    background: #2D2D2D;
    opacity: 0.5;
    filter: blur(50px);
  } div#error-message-test-3 {
    height: fit-content;
    position: absolute;
    top: 0;
    width: fit-content;
    background-color: #393939;
    border-radius: 5px;
    padding: 25px 15px;
    z-index: 100000000000000000;
    bottom: 0;
    margin: auto;
    right: 0;
    left: 0;
    text-align: center;
  }

  div#info-container-box {
    width: 300px;
    position: absolute;
    padding: 15px;
    background: #222222;
    border: 1.5px solid #ff0000;
    box-sizing: border-box;
    border-radius: 2.5px;
    top: 150px;
    right: 25px;
  } div#info-container-box.test3 {
    width: 632px;
    top: 109px;
    right: 33px
  }
</style>