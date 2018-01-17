'use strict';

const ManipulateImage = {

  Cropper       : undefined,
  URL           : undefined,
  container     : undefined,
  image         : undefined,
  actions       : undefined,
  ActionGetData : undefined,
  dataX         : undefined,
  dataY         : undefined,
  dataHeight    : undefined,
  dataWidth     : undefined,
  dataRotate    : undefined,
  inputImage    : undefined,
  imgCrop       : undefined,
  log           : undefined,
  imgNameDef    : undefined,
  route         : undefined,
  maxImageSize  : undefined,
  headers       : undefined,
  aspectDefault : undefined,
  cropperManager: undefined,

  layout        : `
  <div class="row">
    <div class="col-md-9">
      <div class="img-container">
        <img src="" id="imgselected">
      </div>
    </div>
    <div class="col-md-3">
      <div class="docs-preview clearfix">
        <div class="img-preview preview-lg"></div>
        <div class="img-preview preview-md"></div>
        <div class="img-preview preview-sm"></div>
      </div>

      <div class="docs-data" id="groupInformativeData">
        <div class="input-group input-group-sm">
          <label class="input-group-addon" for="dataX">X</label>
          <input type="text" class="form-control" id="dataX" placeholder="x" readonly>
          <span class="input-group-addon">px</span>
        </div>
        <div class="input-group input-group-sm">
          <label class="input-group-addon" for="dataY">Y</label>
          <input type="text" class="form-control" id="dataY" placeholder="y" readonly>
          <span class="input-group-addon">px</span>
        </div>
        <div class="input-group input-group-sm">
          <label class="input-group-addon" for="dataWidth">Ancho</label>
          <input type="text" class="form-control" id="dataWidth" placeholder="Ancho" readonly>
          <span class="input-group-addon">px</span>
        </div>
        <div class="input-group input-group-sm">
          <label class="input-group-addon" for="dataHeight">Alto</label>
          <input type="text" class="form-control" id="dataHeight" placeholder="Alto" readonly>
          <span class="input-group-addon">px</span>
        </div>
        <div class="input-group input-group-sm">
          <label class="input-group-addon" for="dataRotate">Rotación</label>
          <input type="text" class="form-control" id="dataRotate" placeholder="Rotación" readonly>
          <span class="input-group-addon">°</span>
        </div>
      </div>

      <div id="actionGetData">
        <div class="docs-buttons">
          <button type="button" class="btn btn-success btn-block" data-method="getData" data-option data-target="#putData" id="btnCropp">
            <span class="docs-tooltip" data-toggle="tooltip" title="Guardar en Galería">
              <i class="fa fa-check"></i>&nbsp;
              Recortar y Guardar
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="row" id="actions">
    <div class="col-md-12 docs-toggles">
      <div class="btn-group d-flex flex-nowrap" data-toggle="buttons">
        <label class="btn btn-primary active" id="ratio16_9">
          <input type="radio" class="sr-only" id="aspectRatio1" name="aspectRatio" value="1.7777777777777777">
          <span>
            16:9
          </span>
        </label>
        <label class="btn btn-primary" id="ratio4_3">
          <input type="radio" class="sr-only" id="aspectRatio2" name="aspectRatio" value="1.3333333333333333">
          <span>
            4:3
          </span>
        </label>
        <label class="btn btn-primary" id="ratio1_1">
          <input type="radio" class="sr-only" id="aspectRatio3" name="aspectRatio" value="1">
          <span>
            1:1
          </span>
        </label>
        <label class="btn btn-primary" id="ratio2_3">
          <input type="radio" class="sr-only" id="aspectRatio4" name="aspectRatio" value="0.6666666666666666">
          <span>
            2:3
          </span>
        </label>
        <label class="btn btn-primary" id="ratio_free">
          <input type="radio" class="sr-only" id="aspectRatio5" name="aspectRatio" value="NaN">
          <span>
            Recorte Libre
          </span>
        </label>
      </div>
    </div>
    <div class="col-md-9 docs-buttons">
      <div class="btn-group" id="groupBtnLock">
        <button type="button" class="btn btn-primary" data-method="disable" title="Disable" id="btnLock">
          <span class="docs-tooltip" data-toggle="tooltip" title="Bloquear">
            <span class="fa fa-lock"></span>
          </span>
        </button>
        <button type="button" class="btn btn-primary" data-method="enable" title="Enable" id="btnUnlock">
          <span class="docs-tooltip" data-toggle="tooltip" title="Desbloquear">
            <span class="fa fa-unlock"></span>
          </span>
        </button>
      </div>

      <div class="btn-group" id="groupBtnActions">
        <button type="button" class="btn btn-primary" data-method="setDragMode" data-option="move" title="Move" id="btnActionMove">
          <span class="docs-tooltip" data-toggle="tooltip" title="Mover">
            <span class="fa fa-arrows"></span>
          </span>
        </button>
        <button type="button" class="btn btn-primary" data-method="setDragMode" data-option="crop" title="Crop" id="btnActionCrop">
          <span class="docs-tooltip" data-toggle="tooltip" title="Recortar">
            <span class="fa fa-crop"></span>
          </span>
        </button>
      </div>

      <div class="btn-group" id="groupBtnZoom">
        <button type="button" class="btn btn-primary" data-method="zoom" data-option="0.1" title="Zoom In" id="btnZoomIn">
          <span class="docs-tooltip" data-toggle="tooltip" title="Zoom (+)">
            <span class="fa fa-search-plus"></span>
          </span>
        </button>
        <button type="button" class="btn btn-primary" data-method="zoom" data-option="-0.1" title="Zoom Out" id="btnZoomOut">
          <span class="docs-tooltip" data-toggle="tooltip" title="Zoom (-)">
            <span class="fa fa-search-minus"></span>
          </span>
        </button>
      </div>

      <div class="btn-group" id="groupBtnMove">
        <button type="button" class="btn btn-primary" data-method="move" data-option="-10" data-second-option="0" title="Move Left" id="btnMoveLeft">
          <span class="docs-tooltip" data-toggle="tooltip" title="Mover Izquierda">
            <span class="fa fa-arrow-left"></span>
          </span>
        </button>
        <button type="button" class="btn btn-primary" data-method="move" data-option="10" data-second-option="0" title="Move Right" id="btnMoveRight">
          <span class="docs-tooltip" data-toggle="tooltip" title="Mover Derecha">
            <span class="fa fa-arrow-right"></span>
          </span>
        </button>
        <button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="-10" title="Move Up" id="btnMoveUp">
          <span class="docs-tooltip" data-toggle="tooltip" title="Mover Arriba">
            <span class="fa fa-arrow-up"></span>
          </span>
        </button>
        <button type="button" class="btn btn-primary" data-method="move" data-option="0" data-second-option="10" title="Move Down" id="btnMoveDown">
          <span class="docs-tooltip" data-toggle="tooltip" title="Mover Abajo">
            <span class="fa fa-arrow-down"></span>
          </span>
        </button>
      </div>

      <div class="btn-group" id="groupBtnRotate">
        <button type="button" class="btn btn-primary" data-method="rotate" data-option="-45" title="Rotate Left" id="btnRotateLeft">
          <span class="docs-tooltip" data-toggle="tooltip" title="Rotar Izquierda">
            <span class="fa fa-rotate-left"></span>
          </span>
        </button>
        <button type="button" class="btn btn-primary" data-method="rotate" data-option="45" title="Rotate Right" id="btnRotateRight">
          <span class="docs-tooltip" data-toggle="tooltip" title="Rotar Derecha">
            <span class="fa fa-rotate-right"></span>
          </span>
        </button>
      </div>

      <div class="btn-group" id="groupBtnFlip">
        <button type="button" class="btn btn-primary" data-method="scaleX" data-option="-1" title="Flip Horizontal" id="btnFlipHorizontal">
          <span class="docs-tooltip" data-toggle="tooltip" title="Voltear Horizontal">
            <span class="fa fa-arrows-h"></span>
          </span>
        </button>
        <button type="button" class="btn btn-primary" data-method="scaleY" data-option="-1" title="Flip Vertical" id="btnFlipVertical">
          <span class="docs-tooltip" data-toggle="tooltip" title="Voltear Vertical">
            &nbsp;&nbsp;<span class="fa fa-arrows-v"></span>&nbsp;&nbsp;
          </span>
        </button>
      </div>

      <div class="btn-group" id="btnReset">
        <button type="button" class="btn btn-primary" data-method="reset" title="Reset">
          <span class="docs-tooltip" data-toggle="tooltip" title="Restaurar">
            <span class="fa fa-refresh"></span>
          </span>
        </button>
      </div>

      <div class="btn-group">
        <label class="btn btn-primary btn-upload" for="inputImage" title="Upload image file">
          <form id="formImage">
            <input type="file" class="sr-only" id="inputImage" name="inputImage" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff">
          </form>
          <span class="docs-tooltip" data-toggle="tooltip" title="Abrir Mis Imagenes">
            <span class="fa fa-folder-open"></span> &nbsp;
            Abrir Imagen
          </span>
        </label>
      </div>
    </div>
  </div>
  `,

  init : function (element){
    if ($(element).length == 0){
      console.error("ManipulateImage (Init Error) >>", "No has seleccionado un elemento establecido en tu HTML para inicializar ManipulateImage de manera correcta");
    }
    $(element).html(this.layout);
    this.Cropper       = window.Cropper;
    this.URL           = (window.URL || window.webkitURL);
    this.container     = document.querySelector('.img-container');
    this.image         = document.querySelector('.img-container').getElementsByTagName('img').item(0);
    this.actions       = document.getElementById('actions');
    this.ActionGetData = document.getElementById('actionGetData');
    this.dataX         = document.getElementById('dataX');
    this.dataY         = document.getElementById('dataY');
    this.dataHeight    = document.getElementById('dataHeight');
    this.dataWidth     = document.getElementById('dataWidth');
    this.dataRotate    = document.getElementById('dataRotate');
    this.inputImage    = document.getElementById('inputImage');
    this.imgCrop       = $('#imgselected');
    this.log           = false;
    this.imgNameDef    = "http://desktopwalls.net/wp-content/uploads/2014/11/Disk%20Storage%20Evolution%20Flat%20Minimalist%20Desktop%20Wallpaper.jpg";
    this.route         = "",
    this.maxImageSize  = 2048,
    this.headers       = {},
    this.aspectDefault = 16/9
  },

  defaultAspectRatio : function(ratio){
    // ASPECTS RATIO
    // 16:9 => 1.7777777777777777
    // 1 :1 => 1
    // 4 :3 => 1.3333333333333333
    // 2 :3 => 0.6666666666666666
    // Free => NaN
    switch (ratio) {
      case "16:9":
        this.aspectDefault = 16/9;
        break;
        case "1:1":
          this.aspectDefault = 1/1;
          break;
          case "4:3":
            this.aspectDefault = 4/3;
            break;
            case "2:3":
              this.aspectDefault = 2/3;
              break;
              case "free":
                this.aspectDefault = "NaN";
                break;
              default:
                this.aspectDefault = "NaN";
                break;
                console.log(this.aspectDefault);
    }
  },

  setDefaultImage : function(url){
    this.imgNameDef = url;
  },

  setEneableLog : function(boolean){
    this.log = boolean;
  },

  setRoute : function (url){
    this.route = url;
  },

  setMaxImageSize : function (kbs){
    this.maxImageSize = (kbs * 1000);
  },

  setHeaders : function (header){
    this.headers = header;
  },

  makeCropper : function (
    croppResponse, // Responde a todo lo referente al Manipulate Image
    upload, // Se hara la peticion?
    croppSuccess, // En caso de true anterior
    croppError, // En caso de true anterior
    imgRequired // Se verificara que obligatoriamente exista una imagen?
  ) {

    this.imgCrop.attr('src', this.imgNameDef);
    const $this = this;
    var options = {
      aspectRatio: $this.aspectDefault,
      preview: '.img-preview',
      responsive: true,
      ready: function (e) {
        if (this.log == true) { console.log(e.type); }
      },
      cropstart: function (e) {
        if (this.log) { console.log(e.type, e.detail.action); }
      },
      cropmove: function (e) {
        if (this.log) { console.log(e.type, e.detail.action); }
      },
      cropend: function (e) {
        if (this.log) { console.log(e.type, e.detail.action); }
      },
      crop: function (e) {
        var data = e.detail;
        if (this.log) { console.log(e.type); }
        dataX.value = Math.round(data.x);
        dataY.value = Math.round(data.y);
        dataHeight.value = Math.round(data.height);
        dataWidth.value = Math.round(data.width);
        dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
      },
      zoom: function (e) {
        console.log(e.type, e.detail.ratio);
      }
    };

    var cropper           = new Cropper(this.image, options);
    this.cropperManager   = cropper;
    var originalImageURL  = this.image.src;
    var uploadedImageType = 'image/jpeg';
    var uploadedImageURL;

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    if (typeof document.createElement('cropper').style.transition === 'undefined') {
      $('button[data-method="rotate"]').prop('disabled', true);
      $('button[data-method="scale"]').prop('disabled', true);
    }

    // Options
    actions.querySelector('.docs-toggles').onchange = function (event) {
      var e      = event || window.event;
      var target = e.target || e.srcElement;
      var cropBoxData;
      var canvasData;
      var isCheckbox;
      var isRadio;

      if (!cropper) {
        return;
      }

      if (target.tagName.toLowerCase() === 'label') {
        target = target.querySelector('input');
      }

      isCheckbox = target.type === 'checkbox';
      isRadio = target.type === 'radio';

      if (isCheckbox || isRadio) {
        if (isCheckbox) {
          options[target.name] = target.checked;
          cropBoxData          = cropper.getCropBoxData();
          canvasData           = cropper.getCanvasData();
          options.ready = function () {
            cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
          };
        } else {
          options[target.name] = target.value;
          options.ready = function () {
            console.log('ready');
          };
        }
        // Restart
        cropper.destroy();
        cropper = new Cropper(this.image, options);
      }
    }.bind(this);

    // Methods
    actions.querySelector('.docs-buttons').onclick = function (event) {
      var e      = event || window.event;
      var target = e.target || e.srcElement;
      var cropped;
      var result;
      var input;
      var data;

      if (!cropper) {
        return;
      }

      while (target !== this) {
        if (target.getAttribute('data-method')) {
          break;
        }

        target = target.parentNode;
      }

      if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
        return;
      }

      data = {
        method      : target.getAttribute('data-method'),
        target      : target.getAttribute('data-target'),
        option      : target.getAttribute('data-option') || undefined,
        secondOption: target.getAttribute('data-second-option') || undefined
      };

      cropped = cropper.cropped;

      if (data.method) {
        if (typeof data.target !== 'undefined') {

          if (!target.hasAttribute('data-option') && data.target && input) {
            try {
              data.option = JSON.parse(input.value);
            } catch (e) {
              console.log(e.message);
            }
          }
        }

        switch (data.method) {
          case 'rotate':
            if (cropped && options.viewMode > 0) {
              cropper.clear();
            }

            break;
        }

        result = cropper[data.method](data.option, data.secondOption);
        switch (data.method) {
          case 'rotate':
            if (cropped && options.viewMode > 0) {
              cropper.crop();
            }

            break;

          case 'scaleX':
          case 'scaleY':
            target.setAttribute('data-option', -data.option);
            break;
        }
      }
    };

    this.ActionGetData.querySelector('.docs-buttons').onclick = function (event) {
      var e      = event || window.event;
      var target = e.target || e.srcElement;
      var cropped;
      var result;
      var data;

      if (!cropper) {
        return;
      }

      while (target !== this) {
        if (target.getAttribute('data-method')) {
          break;
        }
        target = target.parentNode;
      }

      if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
        return;
      }

      data = {
        method      : target.getAttribute('data-method'),
        target      : target.getAttribute('data-target'),
        option      : target.getAttribute('data-option') || undefined,
        secondOption: target.getAttribute('data-second-option') || undefined
      };

      cropped = cropper.cropped;

      if (data.method) {

        result = cropper[data.method](data.option, data.secondOption);

        // croppResponse, croppSuccess, croppError

        if (typeof result === 'object' && result !== cropper) {
          try {
            let formData = new FormData($("body").find("#formImage")[0]);
            // Se crea un Blob
            let archivos = document.getElementById("inputImage").files;
            var navegador = window.URL || window.webkitURL;
            var objeto_url = navegador.createObjectURL(archivos[0]);
            if (formData.get("inputImage").size == 0 && imgRequired){
              croppResponse({
                status : "mpim-5",
                type   : "warning",
                message: `Por favor, primero selecciona una imagen`
              });
            }
            else {
              formData.append('x', result.x);
              formData.append('y', result.y);
              formData.append('height', result.height);
              formData.append('rotate', result.rotate);
              formData.append('scaleX', result.scaleX);
              formData.append('scaleY', result.scaleY);
              formData.append('width', result.width);
              formData.append('blob', objeto_url);
              if (upload == true){
                $("body").find('#btnCropp').prop('disabled', true);
                croppResponse({
                  status : "mpim-3",
                  type   : "info",
                  message: `Espera mientras la imagen es manipulada...`
                });
                $.ajax({
                  url: $this.route,
                  type: 'POST',
                  processData: false,
                  contentType: false,
                  data: formData,
                  headers: $this.headers
                })
                .done(function(res) {
                  croppResponse({
                    status : "mpim-4",
                    type   : "success",
                    message: `La imagen ha sido manipulada exitosamente`
                  });
                  croppSuccess(res);
                })
                .fail(function(err) {
                  croppError(err);
                })
                .always(function() {
                  if ($this.log == true){
                    console.log("Cropped Success");
                  }
                  $("body").find('#btnCropp').prop('disabled', false);
                });
              }
              else {
                croppResponse({
                  status : "mpim-200",
                  type   : "success",
                  message: `Información de imagen`,
                  data   : formData
                });
              }
            }
            // console.log(/*Coordenadas*/ result, /*Input*/ inputImage);
          } catch (e) {
            console.error(e.message);
          }
        }
      }
    };

    // Movimiento con las flechas del teclado
    document.body.onkeydown = function (event) {
      var e = event || window.event;

      if (!cropper || this.scrollTop > 300) {
        return;
      }

      switch (e.keyCode) {
        case 37:
          e.preventDefault();
          cropper.move(-1, 0);
          break;

        case 38:
          e.preventDefault();
          cropper.move(0, -1);
          break;

        case 39:
          e.preventDefault();
          cropper.move(1, 0);
          break;

        case 40:
          e.preventDefault();
          cropper.move(0, 1);
          break;
      }
    };

    var $image = this.image;
    if (URL) {
      inputImage.onchange = function () {
        var files = this.files;
        var file;

        if (cropper && files && files.length) {
          file = files[0];

          if (/^image\/\w+/.test(file.type)) {
            uploadedImageType = file.type;

            if (uploadedImageURL) {
              URL.revokeObjectURL(uploadedImageURL);
            }

            let archivos = inputImage.files;
            if (archivos[0].size <= $this.maxImageSize) {
              $image.src = uploadedImageURL = URL.createObjectURL(file);
              cropper.destroy();
              cropper = new Cropper($image, options);
            }
            else{
              croppResponse({
                status : "mpim-1",
                type   : "warning",
                message: `El peso del archivo es demasiado grande. \nEl peso máximo es de : ${$this.maxImageSize/1000000} MB`
              });
              inputImage.value = "";
            }
          } else {
            croppResponse({
              status : "mpim-2",
              type   : "warning",
              message: "Por favor selecciona un formato de imagen válido"
            });
          }
        }
      }
    } else {
      inputImage.disabled = true;
      inputImage.parentNode.className += ' disabled';
    }
  },

  unset : {
    rotate : function (){
      $("body").find('#groupBtnRotate').remove();
    },

    rotate_left : function (){
      $("body").find('#btnRotateLeft').remove();
    },

    rotate_right : function (){
      $("body").find('#btnRotateRight').remove();
    },

    ratio_16_9 : function() {
      $("body").find("#ratio16_9").remove();
    },

    ratio_4_3 : function() {
      $("body").find("#ratio4_3").remove();
    },

    ratio_1_1 : function() {
      $("body").find("#ratio1_1").remove();
    },

    ratio_2_3 : function() {
      $("body").find("#ratio2_3").remove();
    },

    ratio_free : function() {
      $("body").find("#ratio_free").remove();
    },

    locks : function() {
      $("body").find("#groupBtnLock").remove();
    },

    lock : function() {
      $("body").find("#btnLock").remove();
    },

    unlock : function() {
      $("body").find("#btnUnlock").remove();
    },

    actions : function() {
      $("body").find("#groupBtnActions").remove();
    },

    move : function() {
      $("body").find("#btnActionMove").remove();
    },

    crop : function() {
      $("body").find("#btnActionCrop").remove();
    },

    zoom : function() {
      $("body").find("#groupBtnZoom").remove();
    },

    zoomIn : function() {
      $("body").find("#btnZoomIn").remove();
    },

    zoomOut : function() {
      $("body").find("#btnZoomOut").remove();
    },

    moves : function() {
      $("body").find("#groupBtnMove").remove();
    },

    moveLeft : function() {
      $("body").find("#btnMoveLeft").remove();
    },

    moveRight : function() {
      $("body").find("#btnMoveRight").remove();
    },

    moveUp : function() {
      $("body").find("#btnMoveUp").remove();
    },

    moveDown : function() {
      $("body").find("#btnMoveDown").remove();
    },

    flip : function() {
      $("body").find("#groupBtnFlip").remove();
    },

    flipH : function() {
      $("body").find("#btnFlipHorizontal").remove();
    },

    flipV : function() {
      $("body").find("#btnFlipVertical").remove();
    },

    reset : function() {
      $("body").find("#btnReset").remove();
    },

    information : function() {
      $("body").find("#groupInformativeData").hide();
    },

    preview_lg : function() {
      $("body").find(".preview-lg").hide();
    },

    preview_md : function() {
      $("body").find(".preview-md").hide();
    },

    preview_sm : function() {
      $("body").find(".preview-sm").hide();
    },

  },

  disableActionButton : function (){
    $("body").find('#btnCropp').prop('disabled', true);
  },

  enableActionButton : function (){
    $("body").find('#btnCropp').prop('disabled', false);
  }

};
