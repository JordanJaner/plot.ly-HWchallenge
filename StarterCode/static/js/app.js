// retrieve data
d3.json("samples.json").then(data => console.log(data))
// give dropdown function
function optionChanged() {
    let dropdownMenu = d3.select("#selDataset");
// read in json file
    d3.json("samples.json").then(data => {
        let sampleID = data.names;
        sampleID.forEach(sample => {dropdownMenu.append("option").text(sample).property("value", sample)
     });
 // gives dropdown menu values from function calls
     let dataID = dropdownMenu.property("value");
     console.log(dataID);
     barChart(dataID);
     bubbleChart(dataID);
     metaData(dataID);
    });
};
// BAR CHART
function barChart (otuData){
    d3.json('samples.json').then((data)=>{
        let otusamplesID = data.samples;
        let otuArray = otusamplesID.filter(object => object.id == otuData
    );
        let otuResult = otuArray[0];
//rename variables
        let otu_ids = otuResult.otu_ids;
        let otu_labels = otuResult.otu_labels;
        let sample_values = otuResult.sample_values;
// data for the bar chart
            let barData = {
            x: sample_values.slice(0,11).reverse(),
            y: otu_ids.slice(0,11).reverse().map(row => "OTU" + row),
            text: otu_labels.slice(0,11).reverse(),
            type: "bar",
            orientation: "h"
                 };
                 let barArray = [barData];
                 let layout = {
                    title: "Top 10 OTU's",
                    height: 500,
                    width: 800,    
                 };
                 Plotly.newPlot("bar", barArray, layout);
         });
     };
//BUBBLE CHART
function bubbleChart (otuData){
    d3.json('samples.json').then((data)=>{
        let otusamplesID = data.samples;
        let otuArray = otusamplesID.filter(object => object.id == otuData
    );
        let otuResult = otuArray[0];
//rename variables
        let otu_ids = otuResult.otu_ids;
        let otu_labels = otuResult.otu_labels;
        let sample_values = otuResult.sample_values;
// data for bubble chart was created
            let bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values,
            }
                 };
                 let bubbleArray = [bubbleData];
                 console.log(otu_ids);
                 let layout2 = {
                    title: "All OTU",
                    xaxis: {title: "OTU ID"},
                    height: 500,
                    width: 1300,    
                 };
                 Plotly.newPlot("bubble", bubbleArray, layout2);
         });
     };
// show information
function metaData (otuData){
    d3.json("samples.json").then(data =>{
        let metaDataDemographics = data.metadata;
        let otuArray = metaDataDemographics.filter(object => object.id == otuData
    );
        let otuResult = otuArray[0];
        let metaSamples = d3.select("#sample-metadata");
        metaSamples.html("");
        Object.entries(otuResult).forEach(([key, value]) => {
            metaSamples.append("h5").text(`${key}: ${value}`)
        });
        console.log(otuResult);
    })
};