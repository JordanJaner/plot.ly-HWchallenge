// Function for change on dropdown menu
function optionChanged(selectedID){
    console.log(selectedID);
    // Read the json file
    d3.json("data/samples.json").then((data) => {
    // Clears dropdown
    d3.select("selDataset").html("");   
    // Select the metadata array and append each item and adds ID to dropdown
    data.metadata.forEach(item =>
         {
         d3.select ("selDataset").append('option').attr('value', item.id).text(item.id);
         });
    // Select value
    d3.select("selDataset").node().value = selectedID;
    
    // Filter Metadata for selected ID from dropdown
    const MetadataID = data.metadata.filter(item=> (item.id == selectedID));
    // Check the metadata for the selected ID
    console.log(MetadataID);
    
    const panelDisplay = d3.select("sample-metadata");
    panelDisplay.html("");
    Object.entries(MetadataID[0]).forEach(item=> 
       {
          panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
       });
 
    // BAR CHART
    // Filter sample array data for the selected ID
    const idSample = data.samples.filter(item => parseInt(item.id) == selectedID); 
    
    // Slice top 10 sample values
    let sampleValue = idSample[0].sample_values.slice(0,10);
    sampleValue= sampleValue.reverse();
    let otuID = idSample[0].otu_ids.slice(0,10);
    otuID = otuID.reverse();
    let otuLabels = idSample[0].otu_labels
    otuLabels = otuLabels.reverse();
 
    // Y axis of bar chart
    const yAxis = otuID.map(item => 'OTU' + " " + item);
       // console.log(yAxis);
    
    // Define the layout and trace object, edit color and orientation
       const trace = {
       y: yAxis,
       x: sampleValue,
       type: 'bar',
       orientation: "h",
       text:  otuLabels,
       marker: {
          color: 'rgb(154, 140, 152)',
          line: {
             width: 3
         }
        }
       },
       layout = {
       title: 'Top 10 Operational Taxonomic Units (OTU)/Individual',
       xaxis: {title: 'Number of Samples Collected'},
       yaxis: {title: 'OTU ID'}
       };
 
       // Plot using Plotly
       Plotly.newPlot('bar', [trace], layout,  {responsive: true});    
       
 // BUBBLE CHART
 // Remove Sample value and otuID from individual
 let sampleValue1 =idSample[0].sample_values;
 let otuID1= idSample[0].otu_ids;
 
 // Define the layout and trace object, edit color and orientation
 const trace1 = {
    x: otuID1,
    y: sampleValue1,
    mode: 'markers',
    marker: {
      color: otuID1,
      size: sampleValue1
    }
  },
 
  layout1 = {
    title: '<b>Bubble Chart For Each Sample</b>',
    xaxis: {title: 'OTU ID'},
    yaxis: {title: 'Number of Samples Collected'},
    showlegend: false,
    height: 800,
    width: 1800
    };
    
 // Plot using Plotly
 Plotly.newPlot('bubble', [trace1], layout1);
 
 });
 }