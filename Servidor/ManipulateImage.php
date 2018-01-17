<?php

namespace App\Ext;

// ==============================================
// INSTALATION BY LARAVEL 5.*
// ==============================================
// EXECUTE COMPOSER TO REQUIRE THE LIBRARY
// $> composer require intervention/image
// ADD THE ALIASES AND THE PROVIDERS INTO 'config/app.php'
// >>> PROVIDER
// Intervention\Image\ImageServiceProvider::class,
// >>> ALIASES
// 'Image' => Intervention\Image\Facades\Image::class,
// EXECUTE THE NEXT LINE INTO THE TERMINAL ON THE PROJECT DIRECTORY
// php artisan vendor:publish --provider="Intervention\Image\ImageServiceProviderLaravel5"
// FINALY INTEGRATE THE CROPPERJS' PLUGIN FOR THE FRONTEND MANIPULATION
// ==============================================

// import the Intervention Image Manager Class
use Intervention\Image\ImageManagerStatic as Image;
use Carbon\Carbon;

/**
 * By: Wilvardo Ramirez Colunga
 * Implements Intervention Image Library and is used by CropperJS
 */

class ManipulateImage {

  private $dirUpload = "";
  private $image     = null;
  private $data      = null;
  private $isInput   = true;
  private $dirImage  = "";

  function __construct($imageFile, $data, $isInput = true, $dirImage = ''){
    $this->dirUpload = ($this->dirUpload == "") ? "/assets/images/cropped/" : $this->dirUpload;
    $this->data      = $data;
    $this->image     = $imageFile;
    $this->isInput   = $isInput;
    $this->dirImage  = $dirImage;
    if (!file_exists(public_path($this->dirUpload))) {
      mkdir(public_path($this->dirUpload), 666, true);
    }
  }

  public function setDirectory($directory){
    $this->dirUpload = $directory;
    if (!file_exists(public_path($this->dirUpload))) {
      mkdir(public_path($this->dirUpload), 666, true);
    }
  }

  public function manipulate () {
    // open file a image resource
    $img = ($this->isInput) ? Image::make($this->image->getRealPath()) : Image::make(public_path($this->dirImage."".$this->image));
    // Manipulate the image
    if ( $this->data['scaleX'] < 0 ){ $img->flip('h'); }
    if ( $this->data['scaleY'] < 0 ){ $img->flip('v'); }
    if ( $this->data['rotate'] != 0 ){ $img->rotate(-$this->data['rotate']); }
    $img->crop(floor($this->data['width']), floor($this->data['height']), floor($this->data['x']), floor($this->data['y']));
    $carbon = new Carbon();
    $nameCropped = ($this->isInput) ? $carbon->timestamp . "_" . rand(1000, 9999) . "." . $this->image->extension() : $this->image;
    // Save de cropped image with the name into the file directory setted
    $path = public_path($this->dirUpload . $nameCropped);
    $img->save($path);
    // return the name created
    return $nameCropped;
  }

}



 ?>
