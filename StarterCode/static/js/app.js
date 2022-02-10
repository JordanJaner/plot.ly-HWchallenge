// retrieve data
d3.json("samples.json").then(data => console.log(data))

// give dropdown function
function init() {
    let dropdownMenu = d3.select("#selDataset");

// read in json file
    d3.json("samples.json").then(data => {
        let sampleID = data.names;
        sampleID.forEach(sample => {dropdownMenu.append("option").text(sample).property("value", sample)
     });
 // give dropdown menu values
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
    
// trace was created as well as slicing and reversing for the bar chart
            let trace1 = {
             x: sample_values.slice(0,11).reverse(),
             y: otu_ids.slice(0,11).reverse().map(row => "OTU" + row),
            text: otu_labels.slice(0,11).reverse(),
            type: "bar",
            orientation: "h"
                 };
                 //array was created in order to plot bar chart
                 let data1 = [trace1];
                 let layout = {
                     title: "The Top 10 Operational Taxonomic Units",
                    height: 600,
                     width: 900,    
                 };
                 Plotly.newPlot("bar", data1, layout);
         });
     };
//create bubble graph
function bubbleChart (otuData){
    d3.json('samples.json').then((data)=>{
        let otusamplesID = data.samples;
        let otuArray = otusamplesID.filter(object => object.id == otuData
    );
        let otuResult = otuArray[0];
        // console.log(otuResult); to check
//rename variables
        let otu_ids = otuResult.otu_ids;
        let otu_labels = otuResult.otu_labels;
        let sample_values = otuResult.sample_values;
        
// trace and bubble chart was created
            let trace2 = {
             x: otu_ids,
             y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values,
            }
                 };
                 //array was created in order to plot bar chart
                 let data2 = [trace2];
                 console.log(otu_ids);
                 let layout2 = {
                     title: "All Operational Taxonomic Units",
                     xaxis: {title: "OTU ID"},
                     height: 600,
                     width: 1500,    
                 };
                 Plotly.newPlot("bubble", data2, layout2);
         });
     };
// show information
function metaData (otuData){
    d3.json("samples.json").then(data =>{
        let metaDataDemographics = data.metadata;
        let otuArray = metaDataDemographics.filter(object => object.id == otuData
    );
        let otuResult = otuArray[0];
        let metademo = d3.select("#sample-metadata");
        metademo.html("");
        Object.entries(otuResult).forEach(([key, value]) => {
            metademo.append("h5").text(`${key}: ${value}`)
        });
        console.log(otuResult);
    })

};
// display the data
function optionChanged(dataID) {
    console.log(dataID);
    barChart(dataID);
    bubbleChart(dataID);
    metaData(dataID);
};
init();