<?php 
    include "header.php";
    include "navbar.php";
    include "templates.php";
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>BA Test Version</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="css/index.css" />
    <script src="js/localforage.js"></script>
    <script src="js/pouchdb-7.1.1.min.js"></script>
    <script src="js/pouchdb.find.js"></script>
    <script src="js/taffy.js"></script>
    <script src="js/dexie.js"></script>
    <script src="js/index.js"></script>
</head>
<body>
    <div class="container-fluid">
        <h1>Browser Database</h1>
        <!-- <button type="button" class="btn btn-primary" id="getJSON">Get JSON</button> -->
        <!-- <form>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">Button</button>
                </div>
            </div>
        </form> -->
        <section id="database" class="my-3">
            <h3>Database</h3>
            <div class="row my-2">
                <div class="col-4">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="radioButton0" value="0" checked>
                        <label class="form-check-label" for="radioButton0"><span id="status0" class="mr-2 fa fa-times text-danger"></span>Cookies</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="radioButton1" value="1" >
                        <label class="form-check-label" for="radioButton1"><span id="status1" class="mr-2 fa fa-times text-danger"></span>localStorage</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="radioButton2" value="2">
                        <label class="form-check-label" for="radioButton2"><span id="status2" class="mr-2 fa fa-times text-danger"></span>IndexedDB</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="radioButton8" value="8">
                        <label class="form-check-label" for="radioButton8"><span id="status8" class="mr-2 fa fa-times text-danger"></span>Cache Storage</label>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="radioButton3" value="3">
                        <label class="form-check-label" for="radioButton3"><span id="status3" class="mr-2 fa fa-times text-danger"></span>localForage (localStorage)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="radioButton4" value="4">
                        <label class="form-check-label" for="radioButton4"><span id="status4" class="mr-2 fa fa-times text-danger"></span>localForage (IndexedDB)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="radioButton5" value="5">
                        <label class="form-check-label" for="radioButton5"><span id="status5" class="mr-2 fa fa-times text-danger"></span>PouchDB</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="radioButton6" value="6">
                        <label class="form-check-label" for="radioButton6"><span id="status6" class="mr-2 fa fa-times text-danger"></span>TaffyDB</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="radioButton7" value="7">
                        <label class="form-check-label" for="radioButton7"><span id="status7" class="mr-2 fa fa-times text-danger"></span>Dexie</label>
                    </div>
                </div>
            </div>
            <form>
                <div class="form-row">
                    <div class="btn-group col-auto pl-0">
                        <button type="button" class="btn btn-primary" id="set">Save</button>
                        <button type="button" class="btn btn-danger" id="remove">Remove</button>
                        <button type="button" class="btn btn-dark" id="get">Get</button>
                    </div>
                    <div class="input-group col-5">
                        <div class="input-group-prepend">
                            <select class="custom-select btn col-8" id="artistContainer"></select>
                            <select class="custom-select btn col" id="yearOperator">
                                <option value="=" selected>=</option>
                                <option value=">">></option>
                                <option value="<"><</option>
                                <option value=">=">>=</option>
                                <option value="<="><=</option>
                            </select>
                        </div>
                        <input type="text" class="form-control" placeholder="Year" id="inputYear">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="submit" id="filterButton">Filter</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
        
        <div class="my-3" id="previewContainer"></div>
    </div>    
</body>
</html>