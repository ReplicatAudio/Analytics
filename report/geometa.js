const fs = require('fs');
const geodata = require('./reports/geoips.json');

function sort(ref)
{
    let sortable = [];
    for (var item in ref) {
        sortable.push([item, ref[item]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    let objSorted = {}
    sortable.forEach(function(item){
        objSorted[item[0]]=item[1]
    })
    return objSorted;
}

function run()
{
    let countries = {};
    let states = {};
    let cities = {};
    for (let item of geodata)
    {
        const country = item["country_name"];
        if(countries[country])
        {
            countries[country]++;
        }
        else
        {
            countries[country] = 1;
        }
        //
        if(country === "United States")
        {
            const state = item["state_prov"];
            if(states[state])
            {
                states[state]++;
            }
            else
            {
                states[state] = 1;
            }
            let city = item["city"];
            city += " "+item["state_prov"];
            city += " "+item["zipcode"];
            if(city === ""){city="Unknown"};
            if(cities[city])
            {
                cities[city]++;
            }
            else
            {
                cities[city] = 1;
            }
        }
        
    }
    countries = sort(countries);
    states = sort(states);
    cities = sort(cities);
    const out = {
        countries,
        states,
        cities
    };
    fs.writeFileSync(__dirname+"/reports/geometa.json", JSON.stringify(out, null, 2));
}
run();