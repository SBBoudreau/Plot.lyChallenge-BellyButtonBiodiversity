    // Create charts
function createCharts(id){
    d3.json("samples.json").then((data)=>{
    // data.filter()  
    sampleArray = data.samples.filter(obj=>obj.id==id)
        
        // Create the Trace
    var trace1 = {
        x: sampleArray[0].otu_ids.slice(0,10),
        y: sampleArray[0].sample_values.slice(0,10),
        type: "bar",
        orientation: 'h',
        text: sampleArray[0].otu_labels.slice(0,10)
    };
    
    // Create the data array for the horizontal bar chart plot
    var data1 = [trace1];
    
    // Define the plot layout
    var layout = {
        title: "Top 10 OTU's found in This Individual",
        xaxis: { title: "Otu ID's" },
        yaxis: { title: "Sample Values" }
    };
    
    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data1, layout);

    var trace2= {
        x: sampleArray[0].otu_ids,
        y: sampleArray[0].sample_values,
        text: sampleArray[0].otu_labels,
        mode: 'markers',
        marker: {
          color: sampleArray[0].otu_ids,
          size: sampleArray[0].sample_values
        }
      };
      
      var data2 = [trace2];
      
      var layout = {
        title: 'Bubble Chart Displaying Each Sample',

      };
      
      Plotly.newPlot('bubble', data2, layout);

    //   metadataArray = data.metadata.filter(obj=>obj.id==id);

    //     return metadataArray.id == selected;
      
    //   console.log(metadataArray)



    })

}

d3.json("samples.json").then((data)=>{
    var dropDown = d3.select("#selDataset")
    data.names.forEach((ids)=>{

        dropDown.append("option").text(ids).property('value', ids)


    })
    createCharts(data.names[0])


})

function optionChanged(selected){
    createCharts(selected);
    displayMetadata(selected)

}
function displayMetadata(sample) {
    d3.json("samples.json").then((data)=>{
        var metadataArray = data.metadata.filter(obj=>obj.id==sample);
        var displayMetadataArray= metadataArray[0];
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(displayMetadataArray).forEach(([key, value]) => {
            demographicInfo.append("h6").text(`${key}: ${value}`);
        });
    });
    
}
