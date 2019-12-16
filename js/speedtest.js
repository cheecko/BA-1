var idb;
const DB_NAME = "idb_speedtest";
const DB_VERSION = 1;
const STORE_NAME = "docs";
openIDB();

var localForage;
var localForageLocalStorage;
if (typeof localforage !== 'undefined') {
    localForage = localforage.createInstance({
        name: 'localForage_speedtest'
    });
    localForageLocalStorage = localforage.createInstance({
        name: 'localForage_speedtest_localStorage',
        driver: localforage.LOCALSTORAGE
    });
}

var pouch = new PouchDB('pouch_speedtest');

var taffy = TAFFY();
// taffy.store("taffy_speedtest");

var dexie = new Dexie("dexie_speedtest");
dexie.version(1).stores({
    docs: "ID, Gender, CreditCard, JobTitle, Country, [Gender+CreditCard], [Gender+JobTitle], [Gender+Country], [CreditCard+JobTitle], [CreditCard+Country], [JobTitle+Country], [Gender+CreditCard+JobTitle], [Gender+CreditCard+Country], [Gender+CreditCard+JobTitle+Country]",
});

const cacheAvailable = 'caches' in self;

var json = [];
loadAllJSON()

$(document).ready(function() {
    $(document).on("click", "#set, #get, #remove", function() {
        var command = $(this).prop("id");
        var info = getInfo();
        info.command = command;

        disabledButtonTrue()
        template("display", info, "display");
        doSomething(info);
    })

    $(document).on("change", "#limit, #selectGender, #selectCreditCard, #selectJobTitle, #selectCountry", function() {
        const command = "get";
        var info = getInfo();
        info.command = command;

        disabledButtonTrue()
        template("display", info, "display");
        doSomething(info);
    })
})

function disabledButtonTrue() {
    $("#set, #get, #remove").prop("disabled", true)
}

function disabledButtonFalse() {
    $("#set, #get, #remove").prop("disabled", false)
}

function getInfo() {
    var db = $("#database input[name=database]:checked").val();
    var numDocs = $("#database input[name=numDocs]:checked").val();
    var jsonType = $("#database input[name=jsonType]:checked").val();
    var docs = json["docs_" + numDocs + "_" + jsonType];
    var label = $("#database label[for="+db+"]").text();
    var limit = $("#limit").val();
    var gender = $("#selectGender").val();
    var creditCard = $("#selectCreditCard").val();
    var job = $("#selectJobTitle").val();
    var country = $("#selectCountry").val();

    return {
        db: db,
        numDocs: numDocs,
        jsonType: jsonType,
        docs: docs,
        label: label,
        limit: limit,
        gender: gender,
        creditCard: creditCard,
        job: job,
        country: country
    }
}

async function doSomething(info) {
    var timeStart = performance.now();
    var data;
    try{
        switch(info.command + "_" + info.db) {
            case "set_localStorage_bulk":
                setLocalStorage(info.docs, "bulk");
                break;
            case "get_localStorage_bulk":
                data = getLocalStorage(info, "bulk");
                break;
            case "remove_localStorage_bulk":
                clearLocalStorage("bulk");
                break;
            case "set_localStorage":
                setLocalStorage(info.docs);
                break;
            case "get_localStorage":
                data = getLocalStorage(info);
                break;
            case "remove_localStorage":
                clearLocalStorage();
                break;
            case "set_idb":
                await setIDB(info.docs);
                break;
            case "get_idb":
                data = await getIDB(info.limit);
                break;
            case "remove_idb":
                await clearIDB();
                break;
            case "set_cache":
                await setCache(info);
                break;
            case "get_cache":
                data = await getCache(info);
                break;
            case "remove_cache":
                await clearCache();
                break;
            case "set_localForageLocalStorage_bulk":
                await setLocalForageLocalStorage(info.docs, "bulk");
                break;
            case "get_localForageLocalStorage_bulk":
                data = await getLocalForageLocalStorage(info, "bulk");
                break;
            case "remove_localForageLocalStorage_bulk":
                await clearLocalForageLocalStorage("bulk");
                break;
            case "set_localForageLocalStorage":
                await setLocalForageLocalStorage(info.docs);
                break;
            case "get_localForageLocalStorage":
                data = await getLocalForageLocalStorage(info);
                break;
            case "remove_localForageLocalStorage":
                await clearLocalForageLocalStorage();
                break;
            case "set_localForageLocalStorage_setItems":
                await setLocalForageLocalStorage(info.docs, "setItems");
                break;
            case "get_localForageLocalStorage_setItems":
                data = await getLocalForageLocalStorage(info, "setItems");
                break;
            case "remove_localForageLocalStorage_setItems":
                await clearLocalForageLocalStorage("setItems");
                break;
            case "set_localForageIDB_bulk":
                await setLocalForageIDB(info.docs, "bulk");
                break;
            case "get_localForageIDB_bulk":
                data = await getLocalForageIDB(info, "bulk");
                break;
            case "remove_localForageIDB_bulk":
                await clearLocalForageIDB("bulk");
                break;
            case "set_localForageIDB":
                await setLocalForageIDB(info.docs);
                break;
            case "get_localForageIDB":
                data = await getLocalForageIDB(info);
                break;
            case "remove_localForageIDB":
                await clearLocalForageIDB();
                break;
            case "set_localForageIDB_setItems":
                await setLocalForageIDB(info.docs, "setItems");
                break;
            case "get_localForageIDB_setItems":
                data = await getLocalForageIDB(info, "setItems");
                break;
            case "remove_localForageIDB_setItems":
                await clearLocalForageIDB("setItems");
                break;
            case "set_pouch":
                await setPouch(info.docs);
                break;
            case "get_pouch":
                data = await getPouch(info.limit, "normal", info.numDocs);
                break;
            case "remove_pouch":
                await clearPouch("normal", info.numDocs);
                break;
            case "set_pouch_bulk":
                await setPouch(info.docs, "bulk");
                break;
            case "get_pouch_bulk":
                data = await getPouch(info.limit, "bulk");
                break;
            case "remove_pouch_bulk":
                await clearPouch("bulk");
                break;
            case "set_dexie":
                await setDexie(info.docs);
                break;
            case "get_dexie":
                data = await getDexie(info, "normal");
                break;
            case "remove_dexie":
                await clearDexie("normal");
                break;
            case "set_dexie_bulk":
                await setDexie(info.docs, "bulk");
                break;
            case "get_dexie_bulk":
                data = await getDexie(info, "bulk");
                break;
            case "remove_dexie_bulk":
                await clearDexie("bulk");
                break;
            case "set_taffy":
                setTaffy(info.docs);
                break;
            case "get_taffy":
                data = getTaffy(info);
                break;
            case "remove_taffy":
                clearTaffy();
                break;
        }
    }catch(error) {
        console.log(error);
        info.error = error;
    }
    info.timeSpent = performance.now() - timeStart;
    data ? info.command = data.command : false;
    template("display", info, "display");
    disabledButtonFalse()
    console.log(data)
    if(data && (info.command == "get" || info.command == "filter") && info.limit != "No Limit") {
        data.label = info.label;
        template("table-"+info.jsonType+"-json", data, "previewContainer");
    }else{
        $("#previewContainer").html("");
    }
}

function template(templateName, data, container = "previewContainer") {
    console.log(data)
    var template = $.templates("#" + templateName + "-template");
    var htmlOutput = template.render(data);
    $("#" + container).html(htmlOutput);
}

function loadAllJSON() {
    var numDocs = ["1000_big", "10000_big", "100000_big", "1000_small", "10000_small", "100000_small"]
    numDocs.forEach(async function(e) {
        json["docs_" + e] = await getJSON(e);
        e == "1000_big" ? setSelectOptions(json["docs_" + e]) : false;
    })
}

function setSelectOptions(docs) {
    var set = ["CreditCard", "Country", "Gender", "JobTitle"];
    set.forEach(function(e) {
        var data = getOptionsData(docs, e);
        template("select", data, "select" + e);
    })
}

function getOptionsData(docs, search) {
    var data = docs.objects.filter(function(value, index, array) {
        return array.findIndex(function(e) {
            return e[search] === value[search]
        }) === index;
    }).map(function(e) {
        return {option: e[search]}
    }).sort(function(a, b){
        if(a.option < b.option) { return -1; }
        if(a.option > b.option) { return 1; }
        return 0;
    })
    return {
        search: search,
        data: data
    }
}

function getJSON(numDocs) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: 'GET',
            url: "data/"+numDocs+".json",
            success: function(response) {
                response ? resolve(response) : reject("Get JSON is failed!");
            },
            error: function() {
                reject("Get JSON is failed!");
            }
        });
    })
}

function extraFilter(data, gender, creditCard, job, country) {
    var filters = {}
    gender ? filters["Gender"] = gender : false;
    creditCard ? filters["CreditCard"] = creditCard : false;
    job ? filters["JobTitle"] = job : false;
    country ? filters["Country"] = country : false;

    data = data.filter(function(e) {
        for(var index in filters) {
            if(e[index] === undefined || e[index] != filters[index]) return false
        }
        return true;
    })
    var command = Object.keys(filters).length === 0 && filters.constructor === Object ? "get" : "filter"
    return {command: command, objects: data}
}

function setLocalStorage(docs, method = "normal") {
    if(method == "bulk") {
        localStorage.setItem("localStorage_speedtest", JSON.stringify(docs));
    }else{
        docs.objects.forEach(function(doc, index) {
            localStorage.setItem("localStorage_speedtest_docs_"+index, JSON.stringify(doc));
        })
    }
}

function getLocalStorage(info, method = "normal") {
    if(method == "bulk") {
        if(localStorage.getItem("localStorage_speedtest")) {
            var data = JSON.parse(localStorage.getItem("localStorage_speedtest"));
            data = extraFilter(data.objects, info.gender, info.creditCard, info.job, info.country);
            data.objects = info.limit == "No Limit" ? data.objects : data.objects.slice(0, info.limit);
            return data;
        }else{
            throw "No Data is found!"
        }
    }else{
        if(localStorage.getItem("localStorage_speedtest_docs_0")) {
            var data = [];
            for(var index in localStorage) {
                index.includes("localStorage_speedtest_docs_") ? data.push(JSON.parse(localStorage.getItem(index))) : false;
            }
            data = extraFilter(data, info.gender, info.creditCard, info.job, info.country);
            data.objects = info.limit == "No Limit" ? data.objects : data.objects.slice(0, info.limit);
            return data;
        }else{
            throw "No Data is found!"
        }
    }
}

function clearLocalStorage(method = "nomal") {
    if(method == "bulk") {
        localStorage.removeItem("localStorage_speedtest");
    }else{
        for(var index in localStorage) {
            if(index.includes("localStorage_speedtest_docs_")) { localStorage.removeItem(index) }
        }
    }
}

function openIDB() {
    var request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = function() {
        idb = request.result;
    }
    request.onerror = function() {
        console.log(request.errorCode);
    }
    request.onblocked = function() {
        console.log(request);
    }
    request.onupgradeneeded = function(e) {
        var db = request.result;
        var store = db.createObjectStore(STORE_NAME, {keyPath: "ID"})
        store.createIndex('index_gender', 'Gender');
        store.createIndex('index_job', 'JobTitle');
        store.createIndex('index_country', 'Country');
        store.createIndex('index_credit_card', 'CreditCard');
    }
};

function getIDBObjectStore(mode) {
    var tx = idb.transaction(STORE_NAME, mode);
    return tx.objectStore(STORE_NAME);
}

function setIDB(docs) {
    return new Promise(function(resolve, reject) {
        var store = getIDBObjectStore("readwrite");
        var request;

        docs.objects.forEach(function(e) {
            request = store.put(e);
        })

        request.onsuccess = resolve;
        request.onerror = reject;
    })
}

function getIDB(limit) {
    return new Promise(function(resolve, reject) {
        var store = getIDBObjectStore("readonly");
        var request = limit == "No Limit" ? store.getAll() : store.getAll(IDBKeyRange.bound("0", "9"), limit);

        request.onsuccess = function() {
            request.result.length != 0 ? resolve({objects: request.result}) : reject("No data is found!");
        };
    })
}

function clearIDB() {
    return new Promise(function(resolve, reject) {
        var store = getIDBObjectStore("readwrite");
        var request = store.clear();

        request.onsuccess = resolve;
        request.onerror = reject;
    })
}

function setCache(info) {
    return new Promise(function(resolve, reject) {
        if(!cacheAvailable) { reject("Cache API is not available!") }

        caches.open('mycache').then(function(cache) {
            cache.put('/cache_speedtest/docs/'+info.jsonType+'/'+info.numDocs+'.json', new Response(JSON.stringify(info.docs))).then(function() {
                resolve();
            }).catch(function(error) {
                reject(error);
            });
        })

        caches.open('mycache').then(function(cache) {
            cache.put('/cache_speedtest/docs/', new Response(JSON.stringify(info.docs))).then(function() {
                resolve();
            }).catch(function(error) {
                reject(error);
            });
        })
    })
}

function getCache(info) {
    return new Promise(function(resolve, reject) {
        if(!cacheAvailable) { reject("Cache API is not available!") }

        caches.open('mycache').then(function(cache) {
            cache.match('/cache_speedtest/docs/').then(function(response) {
                return response.json();
            }).then(function(data) {
                data = extraFilter(data.objects, info.gender, info.creditCard, info.job, info.country);
                data.objects = info.limit == "No Limit" ? data.objects : data.objects.slice(0, info.limit);
                resolve(data)
            }).catch(function() {
                reject("No data is found!");
            })
        })
    })
}

function clearCache() {
    return new Promise(function(resolve, reject) {
        if(!cacheAvailable) { reject("Cache API is not available!") }

        caches.open('mycache').then(function(cache) {
            caches.delete('mycache').then(function() {
                $("#previewContainer").html("");
                resolve()
            }).catch(function(error) {
                reject(error);
            })
        })
    })
}

function setLocalForageLocalStorage(docs, method = "nomal") {
    return new Promise(function(resolve, reject) {
        if(method == "bulk") {
            localForageLocalStorage.setItem("localForage_speedtest", docs).then(function() {
                resolve()
            }).catch(function(error) {
                reject(error)
            });
        }else if(method == "setItems"){
            var data = {};
            docs.objects.forEach(function(e, index) {
                data["localForage_speedtest_docs_"+index] = e
            })
            localForageLocalStorage.setItems(data).then(function() {
                resolve()
            }).catch(function(error) {
                reject(error)
            });
        }else{
            docs.objects.forEach(function(doc, index) {
                localForageLocalStorage.setItem("localForage_speedtest_docs_"+index, doc).then(function() {
                    if(docs.objects.length - 1 == index) { resolve() }
                }).catch(function(error) {
                    reject(error)
                });;
            })
        }
    })
}

function getLocalForageLocalStorage(info, method = "nomal") {
    return new Promise(async function(resolve, reject) {
        if(method == "bulk") {
            localForageLocalStorage.getItem("localForage_speedtest").then(function(response) {
                if(response) {
                    response = extraFilter(response.objects, info.gender, info.creditCard, info.job, info.country);
                    response.objects = info.limit == "No Limit" ? response.objects : response.objects.slice(0, info.limit);
                    resolve(response)
                }else{
                    reject("No Data is found!")
                }
            }).catch(function(error) {
                reject(error);
            });
        }else if(method == "setItems"){
            localForageLocalStorage.keys().then(function(keys) {
                if(keys.length != 0) {
                    keys.includes("localForage_speedtest") ? keys.splice("localForage_speedtest", 1) : false
                }else{
                    reject("No Data is found!")
                }
                localForageLocalStorage.getItems(keys).then(function(response) {
                    response = Object.values(response)
                    response = extraFilter(response, info.gender, info.creditCard, info.job, info.country);
                    response.objects = info.limit == "No Limit" ? response.objects : response.objects.slice(0, info.limit);
                    resolve(response)
                }).catch(function(error) {
                    reject(error)
                });;
            })
        }else{
            var data = [];
            localForageLocalStorage.iterate(function(value, key, iterationNumber) {
                (key == "localForage_speedtest") ? false : data.push(value);
            }).then(function() {
                if(data === undefined || data.length == 0) {
                    reject("No Data is found!")
                }else{
                    data = extraFilter(data, info.gender, info.creditCard, info.job, info.country);
                    data.objects = info.limit == "No Limit" ? data.objects : data.objects.slice(0, info.limit);
                    resolve(data);
                }
            }).catch(function(error) {
                reject(error);
            });
        }
    })
}

function clearLocalForageLocalStorage(method = "nomal") {
    return new Promise(function(resolve, reject) {
        if(method == "bulk") {
            localForageLocalStorage.removeItem("localForage_speedtest").then(function() {
                resolve()
            }).catch(function(error) {
                reject(error)
            });
        }else if(method == "setItems"){
            localForageLocalStorage.keys().then(function(keys) {
                localForageLocalStorage.removeItems(keys).then(function(response) {
                    resolve()
                }).catch(function(error) {
                    reject(error)
                });;
            })
        }else{
            localForageLocalStorage.iterate(function(value, key, iterationNumber) {
                key == "localForage_speedtest" ? false : localForageLocalStorage.removeItem(key);
            }).then(function() {
                resolve();
            }).catch(function(error) {
                reject(error);
            });
        }
    })
}

function setLocalForageIDB(docs, method = "nomal") {
    return new Promise(function(resolve, reject) {
        if(method == "bulk") {
            localForage.setItem("localForage_speedtest", docs).then(function() {
                resolve()
            }).catch(function(error) {
                reject(error)
            });
        }else if(method == "setItems"){
            var data = {};
            docs.objects.forEach(function(e, index) {
                data["localForage_speedtest_docs_"+index] = e
            })
            localForage.setItems(data).then(function() {
                resolve()
            }).catch(function(error) {
                reject(error)
            });
        }else{
            docs.objects.forEach(function(doc, index) {
                localForage.setItem("localForage_speedtest_docs_"+index, doc).then(function() {
                    if(docs.objects.length - 1 == index) { resolve() }
                }).catch(function(error) {
                    reject(error)
                });;
            })
        }
    })
}

function getLocalForageIDB(info, method = "nomal") {
    return new Promise(async function(resolve, reject) {
        if(method == "bulk") {
            localForage.getItem("localForage_speedtest").then(function(response) {
                if(response) {
                    response = extraFilter(response.objects, info.gender, info.creditCard, info.job, info.country);
                    response.objects = info.limit == "No Limit" ? response.objects : response.objects.slice(0, info.limit);
                    resolve(response)
                }else{
                    reject("No Data is found!")
                }
            }).catch(function(error) {
                reject(error);
            });
        }else if(method == "setItems"){
            localForage.keys().then(function(keys) {
                if(keys.length != 0) {
                    keys.includes("localForage_speedtest") ? keys.splice("localForage_speedtest", 1) : false
                }else{
                    reject("No Data is found!")
                }
                localForage.getItems(keys).then(function(response) {
                    response = Object.values(response)
                    response = extraFilter(response, info.gender, info.creditCard, info.job, info.country);
                    response.objects = info.limit == "No Limit" ? response.objects : response.objects.slice(0, info.limit);
                    resolve(response)
                }).catch(function(error) {
                    reject(error)
                });;
            })
        }else{
            var data = [];
            localForage.iterate(function(value, key, iterationNumber) {
                (key == "localForage_speedtest") ? false : data.push(value);
            }).then(function() {
                if(data === undefined || data.length == 0) {
                    reject("No Data is found!")
                }else{
                    data = extraFilter(data, info.gender, info.creditCard, info.job, info.country);
                    data.objects = info.limit == "No Limit" ? data.objects : data.objects.slice(0, info.limit);
                    resolve(data);
                }
            }).catch(function(error) {
                reject(error);
            });
        }
    })
}

function clearLocalForageIDB(method = "nomal") {
    return new Promise(function(resolve, reject) {
        if(method == "bulk") {
            localForage.removeItem("localForage_speedtest").then(function() {
                resolve()
            }).catch(function(error) {
                reject(error)
            });
        }else if(method == "setItems"){
            localForage.keys().then(function(keys) {
                localForage.removeItems(keys).then(function(response) {
                    resolve()
                }).catch(function(error) {
                    reject(error)
                });;
            })
        }else{
            localForage.iterate(function(value, key, iterationNumber) {
                key == "localForage_speedtest" ? false : localForage.removeItem(key);
            }).then(function() {
                resolve();
            }).catch(function(error) {
                reject(error);
            });
        }
    })
}

function setPouch(docs, method = "nomal") {
    return new Promise(function(resolve, reject) {
        docs.objects.forEach(function(e) {
            e._id = "pouch_speedtest_docs_" + e.ID
        })
        if(method == "bulk") {
            pouch.bulkDocs(docs.objects).then(function() {
                resolve()
            }).catch(function(error) {
                reject(error)
            })
        }else{
            docs.objects.forEach(function(doc, index) {
                pouch.put(doc).then(function() {
                    if(docs.objects.length - 1 == index) { resolve() }
                }).catch(function(error) {
                    reject(error)
                });;
            })
        }
    })
}

function getPouch(limit, method = "nomal", numDocs) {
    return new Promise(function(resolve, reject) {
        if(method == "bulk") {
            var options = {include_docs: true}
            limit == "No Limit" ? false : options.limit = parseInt(limit);
            pouch.allDocs(options).then(function(response) {
                if(response.total_rows != 0) {
                    var data = response.rows.map(function(e) {
                        return e.doc;
                    })
                    resolve({objects:data})
                }else{
                    reject("No Data is found!")
                }
            }).catch(function (error) {
                reject(error)
            });
        }else{
            limit = limit == "No Limit" ? numDocs : limit;

            Promise.resolve().then(async function() {
                var data = []
                for(var i = 1; i <= limit; i++) {
                    var doc = await pouch.get("pouch_speedtest_docs_"+i)
                    data.push(doc)
                }
                console.log(data)
                resolve({objects:data})
            }).catch(function(error) {
                error.name == "not_found" ?  reject("No Data is found!") : reject(error)
            })
        }
    })
}

function clearPouch(method = "nomal", numDocs) {
    return new Promise(function(resolve, reject) {
        if(method == "bulk") {
            pouch.destroy().then(function () {
                pouch = new PouchDB('pouch_speedtest');
                resolve()
            }).catch(function (error) {
                reject(error)
            });
        }else{
            for(var i = 1; i <= numDocs; i++) {
                pouch.get("pouch_speedtest_docs_"+i).then(function(doc) {
                    return pouch.remove(doc);
                }).then(function(result) {
                    resolve()
                }).catch(function (error) {
                    error.name == "not_found" ?  reject("") : reject(error)
                });
            }  
        }
    })
}

function setDexie(docs, method = "nomal") {
    return new Promise(function(resolve, reject) {
        docs.objects.forEach(function(e) {
            e._id = "pouch_speedtest_docs_" + e.ID
        })
        if(method == "bulk") {
            dexie.docs.bulkPut(docs.objects).then(function() {
                resolve()
            }).catch(function(error) {
                reject(error)
            })
        }else{
            docs.objects.forEach(function(doc, index) {
                dexie.docs.put(doc).then(function() {
                    if(docs.objects.length - 1 == index) { resolve() }
                }).catch(function(error) {
                    reject(error)
                });;
            })
        }
    })
}

function getDexie(info, method = "nomal") {
    return new Promise(function(resolve, reject) {
        var filters = {}
        info.gender ? filters["Gender"] = info.gender : false;
        info.creditCard ? filters["CreditCard"] = info.creditCard : false;
        info.job ? filters["JobTitle"] = info.job : false;
        info.country ? filters["Country"] = info.country : false;

        var query = dexie.docs;
        query = Object.keys(filters).length !== 0 ? query.where(filters) : query;

        if(method == "bulk") {
            limit = info.limit == "No Limit" ? info.numDocs : info.limit;
            query.limit(limit).toArray().then(function(response) {
                console.log(response)
                if(response.length != 0) {
                    resolve({command: "get", objects:response})
                }else{
                    reject("No Data is found!")
                }
            }).catch(function (error) {
                reject(error)
            });
        }else{
            limit = info.limit == "No Limit" ? info.numDocs : info.limit;
            Promise.resolve().then(async function() {
                var data = []
                await query.limit(limit).eachPrimaryKey(async function(key) {
                    var doc = await dexie.docs.get(key)
                    data.push(doc)
                })
                data.length != 0 ? resolve({command: "get", objects:data}) : reject("No Data is found!")  
            }).catch(function(error) {
                reject(error)
            })
        }
    })
}

function clearDexie(method = "nomal") {
    return new Promise(function(resolve, reject) {
        if(method == "bulk") {
            dexie.docs.toCollection().keys().then(function(keys) {
                return dexie.docs.bulkDelete(keys)
            }).then(function() {
                resolve()
            }).catch(function(error) {
                reject(error)
            })
        }else{
            dexie.transaction('rw', dexie.docs, async () => {
                var count = await dexie.docs.count();
                if(count == 0) {
                    resolve()
                }else{
                    dexie.docs.each(function(doc) {
                        dexie.docs.delete(doc.ID).then(function() {
                            resolve()
                        }).catch(function(error) {
                            reject(error)
                        })
                    })
                }
            });           
        }
    })
}

function setTaffy(docs) {
    taffy.insert(docs.objects)
}

function getTaffy(info) {
    var query = {}
    info.gender ? query["Gender"] = info.gender : false;
    info.creditCard ? query["CreditCard"] = info.creditCard : false;
    info.job ? query["JobTitle"] = info.job : false;
    info.country ? query["Country"] = info.country : false;

    limit = info.limit == "No Limit" ? 0 : info.limit;

    if(Object.keys(query).length === 0 && query.constructor === Object) {
        var data = taffy().limit(limit).get()
        var command = "get"
    }else{
        var data = taffy().filter(query).limit(limit).get()
        var command = "filter";
    }
    if(data.length == 0) throw "No Data is found!"
    return {command: command, objects: data}
}

function clearTaffy() {
    taffy().remove();
}