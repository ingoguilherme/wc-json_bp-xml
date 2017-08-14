<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="https://cdn.rawgit.com/abdmob/x2js/master/xml2json.js"></script>
    <script type="text/javascript" src="assets/js/jquery.min.js"> </script>
    <script type="text/javascript" src="fileconvert.js"></script>
    <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
    <title>Json - Converter</title>
  </head>
  <body>

    <form id="form" style="width: 50%; padding:100px">
      <div class="form-group">
        <!-- <label for="geturl">URL</label> -->
        <input type="text" class="form-control" name="url" id="url" placeholder="URL">
      </div>
      <div class="form-group">
        <!-- <label for="geturl">Consumer Key</label> -->
        <input type="text" class="form-control" name="consumerKey" id="consumerKey" placeholder="Consumer Key">
      </div>
      <div class="form-group">
        <!-- <label for="geturl">Consumer Secret Key</label> -->
        <input type="text" class="form-control" name="consumerSecretKey" id="consumerSecretKey" placeholder="Consumer Secret Key">
      </div>
      <div class="form-group">
        <!-- <label for="geturl">Extra Command</label> -->
        <input type="text" class="form-control" name="cmd" id="cmd" placeholder="Extra Command">
      </div>

      <div class="form-group" align="center">
      	<button class="btn btn-primary" id="send" name="send" type="submit">Generate XML</button>
		<button class="btn btn-danger" id="clear" name="clear" type="reset">Clear</button>
      </div>

      <div class="form-group" align="center">
      	<img src="loading.gif" class="hide" id="loading">
      	<a class="btn btn-success hide" id="download" name="download" target="_blank" type="button">Download</a>
      </div>
      
    </form>

  </body>
  


</html>
