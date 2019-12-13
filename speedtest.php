<?php 
    include "header.php";
    include "navbar.php";
    include "templates_speedtest.php";
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>BA Speedtest</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="css/speedtest.css" />
    <script src="js/localforage.js"></script>
    <script src="js/localforage-setItems.js"></script>
    <script src="js/localforage-getItems.js"></script>
    <script src="js/localforage-removeItems.js"></script>
    <script src="js/pouchdb-7.1.1.min.js"></script>
    <script src="js/pouchdb.find.js"></script>
    <script src="js/taffy.js"></script>
    <script src="js/dexie.js"></script>
    <script src="js/speedtest.js"></script>
</head>
<body>
    <div class="container-fluid">
        <h1>Browser Database Speed Test</h1>
        <img src="images/kirby.gif" alt="kirby" class="img-fluid">
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
            <div class="row my-3">
                <div class="col-4">
                    <h3>Number of docs</h3>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="numDocs" id="docs_1000" value="1000" checked>
                        <label class="form-check-label" for="docs_1000"></span>1000</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="numDocs" id="docs_10000" value="10000">
                        <label class="form-check-label" for="docs_10000"></span>10000</label>
                    </div>
                    
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="numDocs" id="docs_100000" value="100000">
                        <label class="form-check-label" for="docs_100000"></span>100000</label>
                    </div>
                </div>
                <div class="col-4">
                    <h3>Type of JSON</h3>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="jsonType" id="docs_big_json" value="big" checked>
                        <label class="form-check-label" for="docs_big_json"></span>Big</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="jsonType" id="docs_small_json" value="small">
                        <label class="form-check-label" for="docs_small_json"></span>Small</label>
                    </div>
                </div>
            </div>

            <h3>Database</h3>
            <div class="row my-3">
                <div class="col-4">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="localStorage_bulk" value="localStorage_bulk" checked>
                        <label class="form-check-label" for="localStorage_bulk"></span>localStorage Bulk</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="localStorage" value="localStorage">
                        <label class="form-check-label" for="localStorage"></span>localStorage</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="idb" value="idb">
                        <label class="form-check-label" for="idb"></span>IndexedDB</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="cache" value="cache">
                        <label class="form-check-label" for="cache"></span>Cache Storage</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="pouch" value="pouch">
                        <label class="form-check-label" for="pouch"></span>PouchDB Single</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="pouch_bulk" value="pouch_bulk">
                        <label class="form-check-label" for="pouch_bulk"></span>PouchDB Bulk</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="dexie" value="dexie">
                        <label class="form-check-label" for="dexie"></span>Dexie Single</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="dexie_bulk" value="dexie_bulk">
                        <label class="form-check-label" for="dexie_bulk"></span>Dexie Bulk</label>
                    </div>
                </div>
                <div class="col-4">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="localForageLocalStorage_bulk" value="localForageLocalStorage_bulk">
                        <label class="form-check-label" for="localForageLocalStorage_bulk"></span>localForage (localStorage) Bulk</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="localForageLocalStorage" value="localForageLocalStorage">
                        <label class="form-check-label" for="localForageLocalStorage"></span>localForage (localStorage)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="localForageLocalStorage_setItems" value="localForageLocalStorage_setItems">
                        <label class="form-check-label" for="localForageLocalStorage_setItems"></span>localForage (localStorage) setItems()</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="localForageIDB_bulk" value="localForageIDB_bulk">
                        <label class="form-check-label" for="localForageIDB_bulk"></span>localForage (IndexedDB) Bulk</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="localForageIDB" value="localForageIDB">
                        <label class="form-check-label" for="localForageIDB"></span>localForage (IndexedDB)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="localForageIDB_setItems" value="localForageIDB_setItems">
                        <label class="form-check-label" for="localForageIDB_setItems"></span>localForage (IndexedDB) setItems()</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="database" id="taffy" value="taffy">
                        <label class="form-check-label" for="taffy"></span>TaffyDB</label>
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
                    <div class="col-auto">
                        <select class="custom-select btn col" id="limit">
                            <option value="No Limit" selected>No Limit</option>
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>

                    <div class="input-group col">
                        <div class="input-group-prepend">
                            <select class="custom-select btn col-2" id="selectGender"></select>
                            <select class="custom-select btn col" id="selectCreditCard"></select>
                            <select class="custom-select btn col" id="selectJobTitle"></select>
                            <select class="custom-select btn col" id="selectCountry"></select>
                        </div>
                    </div>

                </div>
            </form>
        </section>

        <div class="my-2" id="display"></div>
        <div class="my-3" id="previewContainer"></div>
    </div>    
</body>
</html>