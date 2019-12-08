var indexedDBDatabase;
const DB_NAME = "test-indexeddb-data";
const DB_VERSION = 1;
const STORE_NAME = "docs";
openIndexedDBDatabase();

var localForage = [];
localForage[3] = localforage.createInstance({
    name: "localforage_data",
    driver: localforage.LOCALSTORAGE
});
localForage[4] = localforage.createInstance({
    name: "localforage_data"
});

var pouchdb = new PouchDB('data');
createIndexPouchDB();

var taffydb = TAFFY(); // create taffy db
taffydb.store("taffyData"); // save taffy db into localStorage and active autosync

var dexie = new Dexie("dexie_data");
dexie.version(1).stores({
    albums: "id, artist, year, [artist+year]",
});

const cacheAvailable = 'caches' in self;

$(document).ready(function() {
    checkedLocalDatabase();
    getJSON();

    if(!cacheAvailable) {
        alertify.error("Cache Storage does not exist in this Browser!");
        $("#radioButton8").prop("disabled", true);
    }

    $(document).on("click", "#set, #get, #remove", function() {
        var db = $("#database input[name=database]:checked").val();
        var button = $(this).prop("id");
        var data = window.getJSON;
        console.log(db, button);
        setFilterDefault();

        switch(db + "_" + button) {
            case "0_set":
                setCookies(data);
                break;
            case "0_get":
                getCookies();
                break;
            case "0_remove":
                clearCookies();
                break;
            case "1_set":
                setLocalStorage(data);
                break;
            case "1_get":
                getLocalStorage();
                break;
            case "1_remove":
                clearLocalStorage();
                break;
            case "2_set":
                setIndexedDB(data);
                break;
            case "2_get":
                getIndexedDB();
                break;
            case "2_remove":
                clearIndexedDB();
                break;
            case "3_set":
                setLocalForage(3, data);
                break;
            case "3_get":
                getLocalForage(3);
                break;
            case "3_remove":
                clearLocalForage(3);
                break; 
            case "4_set":
                setLocalForage(4, data);
                break;
            case "4_get":
                getLocalForage(4);
                break;
            case "4_remove":
                clearLocalForage(4);
                break; 
            case "5_set":
                setPouchDB(data);
                break;
            case "5_get":
                getPouchDB();
                break;
            case "5_remove":
                clearPouchDB();
                break; 
            case "6_set":
                setTaffyDB(data);
                break;
            case "6_get":
                getTaffyDB();
                break;
            case "6_remove":
                clearTaffyDB();
                break; 
            case "7_set":
                setDexie(data);
                break;
            case "7_get":
                getDexie();
                break;
            case "7_remove":
                clearDexie();
                break;
            case "8_set":
                setCacheStorage(data);
                break;
            case "8_get":
                getCacheStorage();
                break;
            case "8_remove":
                clearCacheStorage();
                break;
        }
    })

    $(document).on("click", "#filterButton", async function(e) {
        e.preventDefault();
        var db = $("#database input[name=database]:checked").val();
        var artist = $("#artistContainer").val();
        var operator = $("#yearOperator").val();
        var year = $("#inputYear").val();
        var response;
        var filteredData;

        if(artist == "Artist" && year == "") return;

        switch(db) {
            case "0":
                response = getCookies();
                filteredData = {data: searchJS(response.data, artist, operator, year)};
                template("cookies", filteredData);
                break;
            case "1":
                response = getLocalStorage();
                filteredData = {data: searchJS(response.data, artist, operator, year)};
                template("localStorage", filteredData);
                break;
            case "2":
                searchIndexedDB(artist, operator, year)
                break;
            case "3":
                response = await getLocalForage(3);
                filteredData = {data: searchJS(response.data, artist, operator, year)};
                template("localForageLocalStorage", filteredData);
                break;
            case "4":
                response = await getLocalForage(3);
                filteredData = {data: searchJS(response.data, artist, operator, year)};
                template("localForageIndexedDB", filteredData);
                break;
            case "5":
                searchPouchDB(artist, operator, year)
                break;
            case "6":
                searchTaffyDB(artist, operator, year)
                break;
            case "7":
                searchDexie(artist, operator, year)
                break;
            case "8":
                response = await getCacheStorage();
                console.log(response)
                filteredData = {data: searchJS(response.data, artist, operator, year)};
                template("cacheStorage", filteredData);
                break;
        }

    })
});

function template(db, data, container = "previewContainer") {
    var template = $.templates("#" + db + "-template");
    var htmlOutput = template.render(data);
    $("#" + container).html(htmlOutput);
}

function checkedLocalDatabase() {
    getCookies(false);
    getLocalStorage(false);
    // getIndexedDB(false) check indexeddb wait until open database finished
    getCacheStorage(false);
    getLocalForage(3, false);
    getLocalForage(4, false);
    getPouchDB(false);
    getTaffyDB(false);
    getDexie(false);
}

function setFilterDefault() {
    $("#artistContainer").val("Artist");
    $("#yearOperator").val("=");
    $("#inputYear").val("");
}

function getJSON() {
    $.ajax({
        type: 'GET',
        url: "model/getAlbum.php",
        success: function(response) {
            if(response.success) {
                window.getJSON = response;

                var artist = response.data.filter(function(value, index, array) {
                    return  array.findIndex(function(e) {
                        return e.artist === value.artist
                    }) === index;
                })

                artist = artist.map(function(value) {
                    return {artist: value.artist}
                })

                artist = artist.sort(function(a, b){
                    if(a.artist < b.artist) { return -1; }
                    if(a.artist > b.artist) { return 1; }
                    return 0;
                })

                template("artist", {data: artist}, "artistContainer");
            }else{
                alertify.error(response.error_message);
            }     
        },
        error: function() {
            alertify.error("Get JSON is failed!");
        }
    });
}

function dataExist(db, value) {
    var timesIcon = "fa-times text-danger";
    var checkedIcon = "fa-check text-success";

    if(value) {
        $("#status" + db).removeClass(timesIcon);
        $("#status" + db).addClass(checkedIcon);
    }else{
        $("#status" + db).removeClass(checkedIcon);
        $("#status" + db).addClass(timesIcon);
    }
}

function getCookies(preview = true, onlyCheck = false) {
    var cookiesData = document.cookie.split("; ");
    var data = cookiesData.find(function(value) {
        return value.split("=")[0] == "data";
    });

    if(onlyCheck) {
       return data ? true : false;
    }

    if(data) {
        dataExist(0, true);
        if(preview) {
            data = JSON.parse(data.split("=")[1]);
            template("cookies", data);
            return data;
        }
    }else{
        dataExist(0, false);
        if(preview) {
            alertify.error("No Data is found!");
        }
    }
}

function searchJS(data, artist, operator, year) {
    console.log(data, artist, operator, year);
    
    if(artist != "Artist") {
        data = data.filter(function(value) {
            return value.artist === artist;
        })
    }

    if(year != "") {
        data = data.filter(function(value) {
            switch(operator) {
                case "=":
                    return value.year == year;
                case ">":
                    return value.year > year;
                case "<":
                    return value.year < year;
                case ">=":
                    return value.year >= year;
                case "<=":
                    return value.year <= year;
            }
        })
    }

    return data;
}

function setCookies(data, expiresDays = 7) {
    var date = new Date();
    date.setTime(date.getTime() + (expiresDays * 24 * 60 * 60 * 1000)); // in milliseconds

    var cookiesData = "data=" + JSON.stringify(data);
    var expires = "expires="+ date.toUTCString();

    document.cookie = cookiesData + ";" + expires + ";path=/";

    if(getCookies(false, true)) {
        if(expiresDays > 0) {
            dataExist(0, true);
            alertify.success("Set Cookies is success!");
        }else{
            dataExist(0, true);
            alertify.success("Clear Cookies is failed!");
        }
    }else{
        if(expiresDays > 0) {
            dataExist(0, false);
            alertify.error("Set Cookies is failed!");
        }else{
            dataExist(0, false);
            alertify.success("Clear Cookies is success!");
        }
    }
}

function clearCookies() {
    setCookies("", -1);
    $("#previewContainer").html("");
}

function getLocalStorage(preview = true) {
    if(localStorage.getItem("data")) {
        dataExist(1, true);
        if(preview) {
            var data = JSON.parse(localStorage.getItem("data"));
            template("localStorage", data);
            return data;
        }
    }else{
        dataExist(1, false);
        if(preview) {
            alertify.error("No Data is found!");
        }
    }
}

function setLocalStorage(data) {
    localStorage.setItem("data", JSON.stringify(data));

    if(localStorage.getItem("data")) {
        dataExist(1, true);
        alertify.success("Set Local Storage is success!");
    }else{
        dataExist(1, false);
        alertify.error("Set Local Storage is failed!");
    }
}

function clearLocalStorage() {
    localStorage.removeItem("data");

    if(!localStorage.getItem("data")) {
        $("#previewContainer").html("");
        dataExist(1, false);
        alertify.success("Clear Local Storage is success!");
    }else{
        dataExist(1, true);
        alertify.error("Clear Local Storage is failed!");
    }
}

function searchIndexedDB(artist, operator, year) {
    var store = getIndexedDBObjectStore("readonly");
    var artistIndex = store.index("index_artist");
    var yearIndex = store.index("index_year");
    var artistYearIndex = store.index("index_artist_year");
    var request;

    var keyRange = getKeyRange(operator, year, artist);
    console.log(keyRange);

    if(artist != "Artist" && year == "") {
        request = artistIndex.getAll(artist);
    }else if(artist == "Artist" && year != "") {
        request = yearIndex.getAll(getKeyRange(operator, year));
    }else{
        request = artistYearIndex.getAll(getKeyRange(operator, year, artist));
    }

    request.onsuccess = function() {
        var data = {data: request.result};
        template("indexedDB", data);
    };
    
    request.onerror = function() {
        console.log("Error", request.error);
        dataExist(2, false);
    };
}

function getKeyRange(operator, year, artist = null) {
    if(!artist) {
        switch(operator) {
            case "=":
                return IDBKeyRange.only(year);
            case ">":
                return IDBKeyRange.lowerBound(year, true);
            case "<":
                return IDBKeyRange.upperBound(year, true);
            case ">=":
                return IDBKeyRange.lowerBound(year);
            case "<=":
                return IDBKeyRange.upperBound(year);
        }
    }else{
        switch(operator) {
            case "=":
                return IDBKeyRange.only([artist, year]);
            case ">":
                return IDBKeyRange.bound([artist, year], [artist, "10000"], true, false);
            case "<":
                return IDBKeyRange.bound([artist, "0"], [artist, year], false, true);
            case ">=":
                return IDBKeyRange.bound([artist, year], [artist, "10000"], false, false);
            case "<=":
                return IDBKeyRange.bound([artist, "0"], [artist, year], false , false);
    }
    }
}

function getIndexedDB(preview = true) {
    var store = getIndexedDBObjectStore("readonly");
    var request = store.getAll();
    // var request = store.getAll(IDBKeyRange.lowerBound('2', true));
    console.log(request);

    request.onsuccess = function() {
        if(request.result.length != 0) {
            dataExist(2, true);
            if(preview) {
                var data = {data: request.result};
                template("indexedDB", data);
            }
        }else{
            dataExist(2, false);
            if(preview) {
                alertify.error("No data is found!");
            }
        }
    };
    
    request.onerror = function() {
        console.log("Error", request.error);
        dataExist(2, false);
    };
}

function setIndexedDB(data) {
    var store = getIndexedDBObjectStore("readwrite");
    var request;

    $.each(data.data, function(index, value) {
        request = store.put(value);
    })

    request.onsuccess = function() {
        console.log("Data added to the store", request.result);
        dataExist(2, true);
        alertify.success("Set IndexedDB is success!");
    };
    
    request.onerror = function() {
        console.log("Error", request.error);
        dataExist(2, false);
        alertify.success("Set IndexedDB is failed!");
    };
}

function clearIndexedDB() {
    var store = getIndexedDBObjectStore("readwrite");
    var request = store.clear();
    console.log(request);

    request.onsuccess = function() {
        $("#previewContainer").html("");
        dataExist(2, false);
        alertify.success("Clear IndexedDB is success!");
    };
    
    request.onerror = function() {
        dataExist(2, true);
        alertify.error("Clear TaffyDB is failed!");
        console.log(request.error)
    };
}

function openIndexedDBDatabase() {
    var request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = function() {
        indexedDBDatabase = request.result;
        getIndexedDB(false);
    }
    request.onerror = function() {
        console.log(request.errorCode);
    }
    request.onblocked = function() {
        console.log(request);
    }
    request.onupgradeneeded = function(e) {
        var db = request.result;
        var store = db.createObjectStore(STORE_NAME, {keyPath: "id"})
        store.createIndex('index_artist_year', ['artist', 'year']);
        store.createIndex('index_artist', 'artist');
        store.createIndex('index_year', 'year');
    }
};

function getIndexedDBObjectStore(mode) {
    var tx = indexedDBDatabase.transaction(STORE_NAME, mode);
    return tx.objectStore(STORE_NAME);
}

function getCacheStorage(preview = true) {
    return caches.open('mycache').then(function(cache) {

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // only for test
        // const data = {type: "post"};
        // const options = {
        //     method: "POST",
        //     body: JSON.stringify(data)
        // }
        // cache.add(new Request('/test/post', options))

        // cache.put(new Request('/test/post', options), new Response('{"foo": "bar"}'))

        cache.keys().then(cachedItems => {
            console.log(cachedItems)
        })
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        return cache.match('/latihan/ba/model/getAlbum.php').then(function(response) {
            if(response) {
                console.log(response)
                return response.json();
            }
        }).then(function(data) {
            console.log(data)
            if(data) {
                dataExist(8, true);
                if(preview) {
                    template("cacheStorage", data);
                    return data;
                }
            }else{
                dataExist(8, false);
                if(preview) {
                    alertify.error("No Data is found!");
                }
            }
        })
    })
}

function setCacheStorage(data) {
    caches.open('mycache').then(function(cache) {
        cache.addAll(['/latihan/ba/','/latihan/ba/model/getAlbum.php']).then(() => {
            dataExist(8, true);
            alertify.success("Set Cache Storage is success!");
        })
        // cache.put('/latihan/ba/model/getAlbum.php', new Response(JSON.stringify(data)));
    })
}

function clearCacheStorage() {
    caches.open('mycache').then(function(cache) {
        cache.delete('/latihan/ba/model/getAlbum.php').then(() => {
            $("#previewContainer").html("");
            dataExist(8, false);
            alertify.success("Clear Cache Storage is success!");
        })
        // caches.delete('mycache')
    })
}

function getLocalForage(db, preview = true) {
    // getAll: first getAllKeys then looping using this key

    var dbName = "localForage";
    if(db == 3) {
        dbName += "LocalStorage";
    }else{
        dbName += "IndexedDB";
    }

    return localForage[db].getItem("data").then(function(response) {
        if(response) {
            dataExist(db, true);
            if(preview) {
                template(dbName, response);
                return response;
            }
        }else{
            dataExist(db, false);
            if(preview) {
                alertify.error("No data is found!");
            }
        }
    }).catch(function(error) {
        console.log(error);
        dataExist(db, false);
    })
}

function setLocalForage(db, data) {
    // $.each(data.data, function(index, value) {
    //     localForage[db].setItem((index+1).toString(), value).then(function(response) {
    //         if(response) {
    //             dataExist(db, true);
    //             alertify.success("Set localForage is success!");
    //         }else{
    //             dataExist(db, false);
    //             alertify.error("No data is inserted!");
    //         }
    //     }).catch(function(error) {
    //         console.log(error);
    //         dataExist(db, false);
    //         alertify.error("Set localForage is failed!");
    //     })
    // })

    localForage[db].setItem("data", data).then(function(response) {
        if(response) {
            dataExist(db, true);
            alertify.success("Set localForage is success!");
        }else{
            dataExist(db, false);
            alertify.error("No data is inserted!");
        }
    }).catch(function(error) {
        console.log(error);
        dataExist(db, false);
        alertify.error("Set localForage is failed!");
    })
}

function clearLocalForage(db) {
    // localForage[db].clear() remove all keys
    // localForage[db].removeItem("data") remove a certain key

    localForage[db].removeItem("data").then(function() {
        $("#previewContainer").html("");
        dataExist(db, false);
        alertify.success("Clear localForage is success!");
    }).catch(function(error) {
        console.log(error);
        dataExist(db, true);
        alertify.error("Clear localForage is failed!");
    });
}

function searchPouchDB(artist, operator, year) {
    var query = {};

    if(artist != "Artist") {
        query.artist = artist
    }

    if(year != "") {
        switch(operator) {
            case "=":
                query.year = { $eq: year }
                break;
            case ">":
                query.year = { $gt: year }
                break;
            case "<":
                query.year = { $lt: year }
                break;
            case ">=":
                query.year = { $gte: year }
                break;
            case "<=":
                query.year = { $lte: year }
                break;
        }
    }

    pouchdb.find({
        selector: query
    }).then(function (result) {
        template("searchPouchDB", result);
    }).catch(function (err) {
        console.log(err);
    });
}

function getPouchDB(preview = true) {
    pouchdb.allDocs({
        include_docs: true,
        limit: -1
    }).then(function (response) {
        if(response.total_rows > 2) {
            dataExist(5, true);
            if(preview) {
                template("pouchDB", response);
            }
        }else{
            dataExist(5, false);
            if(preview) {
                alertify.error("No data is found!");
            }
        }
    }).catch(function (error) {
        alertify.error("Error: " + error.error + "<br> Reason: " + error.reason + "<br> Status: " + error.status);
    });
}

function setPouchDB(data) {
    $.each(data.data, function(index, value) {
        value._id = JSON.stringify(index);
    })
    pouchdb.bulkDocs({docs : data.data}, function (error, response) {
        console.log(data.data);
        if(response) {
            dataExist(5, true);
            alertify.success("Set Pouch DB Local is success!");
        }else{
            dataExist(5, false);
            alertify.error(error.message);
        }
    });
}

function clearPouchDB() {
    pouchdb.destroy().then(function () {
        pouchdb = new PouchDB('data');
        createIndexPouchDB();
        $("#previewContainer").html("");
        dataExist(5, false);
        alertify.success("Clear Pouch DB Local is success!");
    }).catch(function (error) {
        dataExist(5, true);
        alertify.error(error.message);
    });
}

function createIndexPouchDB() {
    pouchdb.createIndex({
        index: {
            fields: ["artist", "year"],
            name: 'index_artist_year',
            ddoc: 'index_artist_year_design'
        }
    }).then(function (result) {

    }).catch(function (err) {
        console.log(err);
    });

    pouchdb.createIndex({
        index: {
            fields: ["year"],
            name: 'index_year',
            ddoc: 'index_year_design'
        }
    }).then(function (result) {

    }).catch(function (err) {
        console.log(err);
    });
}

function searchTaffyDB(artist, operator, year) {
    var query = {};

    if(artist != "Artist") {
        query.artist = artist
    }

    if(year != "") {
        switch(operator) {
            case "=":
                query.year = year
                break;
            case ">":
                query.year = { gt: year }
                break;
            case "<":
                query.year = { lt: year }
                break;
            case ">=":
                query.year = { gte: year }
                break;
            case "<=":
                query.year = { lte: year }
                break;
        }
    }

    var data = {data: taffydb().filter(query).get()};
    template("taffyDB", data);
}

function getTaffyDB(preview = true) {
    if(taffydb().get().length != 0) {
        dataExist(6, true);
        if(preview) {
            var data = {data: taffydb().limit(0).get()};
            template("taffyDB", data);
        }
    }else{
        dataExist(6, false);
        if(preview) {
            alertify.error("No data is found!");
        }
    }
}

function setTaffyDB(data) {
    taffydb.insert(data.data);
    console.log(taffydb().get());
    if(taffydb().get()) {
        dataExist(6, true);
        alertify.success("Set TaffyDB is success!");
    }else{
        dataExist(6, false);
        alertify.error("Set TaffyDB is failed!");
    }
}

function clearTaffyDB() {
    taffydb().remove();

    if(taffydb().get()) {
        $("#previewContainer").html("");
        dataExist(6, false);
        alertify.success("Clear TaffyDB is success!");
    }else{
        dataExist(6, true);
        alertify.error("Clear TaffyDB is failed!");
    }
}

// function searchDexie(artist, operator, year) {
//     var filter = [];
//     var value = [];

//     if(artist != "Artist") {
//         filter.push("artist");
//         value.push(artist);
//     }

//     if(year != "") {
//         filter.push("year");
//         value.push(year);
//         // switch(operator) {
//         //     case "=":
//         //         query.year = year
//         //         break;
//         //     case ">":
//         //         query.year = { gt: year }
//         //         break;
//         //     case "<":
//         //         query.year = { lt: year }
//         //         break;
//         //     case ">=":
//         //         query.year = { gte: year }
//         //         break;
//         //     case "<=":
//         //         query.year = { lte: year }
//         //         break;
//         // }
//     }

//     if(filter.length == 1) {
//         filter = filter[0];
//         value = value[0]
//     }
//     console.log(filter);
//     console.log(value);

//     dexie.albums.where(filter).equals(value).toArray().then(function(response) {
//         console.log(response);
//     })

//     dexie.albums.where(filter).equals(value).toArray().then(function(response) {
//         console.log(response);
//     })
// }

function searchDexie(artist, operator, year) {
    var query = dexie.albums;

    if(year != "") {
        switch(operator) {
            case "=":
                query = query.where("year").equals(year);
                break;
            case ">":
                query = query.where("year").above(year);
                break;
            case "<":
                query = query.where("year").below(year);
                break;
            case ">=":
                query = query.where("year").aboveOrEqual(year);
                break;
            case "<=":
                query = query.where("year").belowOrEqual(year);
                break;
        }
    }

    if(artist != "Artist" && year == "") {
        query = query.where("artist").equals(artist);
    }else if(artist != "Artist" && year != "") {
        query = query.and(function (album) { return album.artist == artist });
    }

    query.toArray().then(function(response) {
        var data = {data: response};
        template("dexie", data);
    })
}

function getDexie(preview = true) {
    dexie.albums.toArray().then(function(response) {
        console.log(response)
        if(response.length != 0) {
            dataExist(7, true);
            if(preview) {
                var data = {data: response};
                template("dexie", data);
            }
        }else{
            dataExist(7, false);
            if(preview) {
                alertify.error("No data is found!");
            }
        }
    }).catch(function (error) {
        console.log(error)
    });
}

function setDexie(data) {
    dexie.albums.bulkPut(data.data).then(function(lastKey) {
        dataExist(7, true);
        alertify.success("Set Dexie is success!");
    }).catch(Dexie.BulkError, function (e) {
        dataExist(7, false);
        alertify.error("Set Dexie is failed!");
    });
}

function clearDexie() {
    dexie.delete().then(function () {
        dexie = new Dexie("dexie_data");
        dexie.version(1).stores({
            albums: "id, artist, year",
        });
        $("#previewContainer").html("");
        dataExist(7, false);
        alertify.success("Clear Dexie is success!");
    }).catch(function (error) {
        dataExist(7, true);
        alertify.error(error.message);
    });
}