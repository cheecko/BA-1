<script id="display-template" type="text/x-template">
    <div class="row flex-column flex-wrap">
        <span class="col">{{:command}} {{:numDocs}} docs {{if limit && limit != "No Limit"}}with limit {{:limit}}{{else limit && limit == "No Limit"}} with no limit{{/if}} using {{:label}}</span>
        {{if timeSpent || timeSpent == 0}}<span class="col">Took {{:timeSpent}} ms</span>{{/if}}
        {{if error}}<span class="col">Error: {{:error}}</span>{{/if}}
    </div>
</script>

<script id="table-big-json-template" type="text/x-template">
    <h3>{{:label}}</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Gender</th>
                <th scope="col">Job</th>
                <th scope="col">Country</th>
                <th scope="col">CreditCard</th>
                <th scope="col">Email</th>
            </tr>
        </thead>
        <tbody>
            {{for objects}}
                <tr>
                    <td>{{:ID}}</td>
                    <td>{{:FirstNameLastName}}</td>
                    <td>{{:Gender}}</td>
                    <td>{{:JobTitle}}</td>
                    <td>{{:Country}}</td>
                    <td>{{:CreditCard}}</td>
                    <td>{{:EmailAddress}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>

<script id="table-small-json-template" type="text/x-template">
    <h3>{{:label}}</h3>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">GUID</th>
            </tr>
        </thead>
        <tbody>
            {{for objects}}
                <tr>
                    <td>{{:ID}}</td>
                    <td>{{:GUID}}</td>
                </tr>
            {{/for}}
    </tbody>
    </table>
</script>