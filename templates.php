<script id="artist-template" type="text/x-template">
    <option value="Artist" selected>Artist</option>
    {{for data}}
        <option value="{{:artist}}">{{:artist}}</option>
    {{/for}}
</script>

<script id="cookies-template" type="text/x-template">
    <h3>Cookies</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Album</th>
                <th scope="col">Artist</th>
                <th scope="col">Year</th>
                <th scope="col">Genre</th>
            </tr>
        </thead>
        <tbody>
            {{for data}}
                <tr>
                    <td>{{:album}}</td>
                    <td>{{:artist}}</td>
                    <td>{{:year}}</td>
                    <td>{{:genre}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>

<script id="localStorage-template" type="text/x-template">
    <h3>localStorage</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Album</th>
                <th scope="col">Artist</th>
                <th scope="col">Year</th>
                <th scope="col">Genre</th>
            </tr>
        </thead>
        <tbody>
            {{for data}}
                <tr>
                    <td>{{:album}}</td>
                    <td>{{:artist}}</td>
                    <td>{{:year}}</td>
                    <td>{{:genre}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>

<script id="indexedDB-template" type="text/x-template">
    <h3>IndexedDB</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Album</th>
                <th scope="col">Artist</th>
                <th scope="col">Year</th>
                <th scope="col">Genre</th>
            </tr>
        </thead>
        <tbody>
            {{for data}}
                <tr>
                    <td>{{:album}}</td>
                    <td>{{:artist}}</td>
                    <td>{{:year}}</td>
                    <td>{{:genre}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>

<script id="cacheStorage-template" type="text/x-template">
    <h3>Cache Storage</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Album</th>
                <th scope="col">Artist</th>
                <th scope="col">Year</th>
                <th scope="col">Genre</th>
            </tr>
        </thead>
        <tbody>
            {{for data}}
                <tr>
                    <td>{{:album}}</td>
                    <td>{{:artist}}</td>
                    <td>{{:year}}</td>
                    <td>{{:genre}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>

<script id="localForageLocalStorage-template" type="text/x-template">
    <h3>localForage localStorage</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Album</th>
                <th scope="col">Artist</th>
                <th scope="col">Year</th>
                <th scope="col">Genre</th>
            </tr>
        </thead>
        <tbody>
            {{for data}}
                <tr>
                    <td>{{:album}}</td>
                    <td>{{:artist}}</td>
                    <td>{{:year}}</td>
                    <td>{{:genre}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>

<script id="localForageIndexedDB-template" type="text/x-template">
    <h3>localForage IndexedDB</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Album</th>
                <th scope="col">Artist</th>
                <th scope="col">Year</th>
                <th scope="col">Genre</th>
            </tr>
        </thead>
        <tbody>
            {{for data}}
                <tr>
                    <td>{{:album}}</td>
                    <td>{{:artist}}</td>
                    <td>{{:year}}</td>
                    <td>{{:genre}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>

<script id="searchPouchDB-template" type="text/x-template">
    <h3>PouchDB</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Album</th>
                <th scope="col">Artist</th>
                <th scope="col">Year</th>
                <th scope="col">Genre</th>
            </tr>
        </thead>
        <tbody>
            {{for docs}}
                <tr>
                    <td>{{:album}}</td>
                    <td>{{:artist}}</td>
                    <td>{{:year}}</td>
                    <td>{{:genre}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>

<script id="pouchDB-template" type="text/x-template">
    <h3>PouchDB</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Album</th>
                <th scope="col">Artist</th>
                <th scope="col">Year</th>
                <th scope="col">Genre</th>
            </tr>
        </thead>
        <tbody>
            {{for rows}}
                <tr>
                    <td>{{:doc.album}}</td>
                    <td>{{:doc.artist}}</td>
                    <td>{{:doc.year}}</td>
                    <td>{{:doc.genre}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>

<script id="taffyDB-template" type="text/x-template">
    <h3>TaffyDB</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Album</th>
                <th scope="col">Artist</th>
                <th scope="col">Year</th>
                <th scope="col">Genre</th>
            </tr>
        </thead>
        <tbody>
            {{for data}}
                <tr>
                    <td>{{:album}}</td>
                    <td>{{:artist}}</td>
                    <td>{{:year}}</td>
                    <td>{{:genre}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>

<script id="dexie-template" type="text/x-template">
    <h3>Dexie</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Album</th>
                <th scope="col">Artist</th>
                <th scope="col">Year</th>
                <th scope="col">Genre</th>
            </tr>
        </thead>
        <tbody>
            {{for data}}
                <tr>
                    <td>{{:album}}</td>
                    <td>{{:artist}}</td>
                    <td>{{:year}}</td>
                    <td>{{:genre}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>