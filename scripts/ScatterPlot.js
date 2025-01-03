d3.csv("../datasets/spotify-2023.csv").then(data => {
    const features = ['danceability_%', 'valence_%', 'energy_%', 'acousticness_%', 'liveness_%', 'speechiness_%'];
    const width = 1400;
    const height = 300;
    const margin = {top: 20, right: 30, bottom: 50, left: 120};

    features.forEach(feature => {
        // Create container for each scatter plot
        const container = d3.select("#chart-container")
            .append("div")
            .attr("class", "scatter-plot");

        // Add title for each feature plot
        container.append("div")
            .attr("class", "title")
            .text(`Streams and ${feature}`);

        // Create SVG for scatter plot
        const svg = container.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Prepare data by converting numeric values
        const featureData = data.map(d => ({
            featureValue: +d[feature],
            streams: +d.streams
        }));

        // Calculate correlation
        const correlation = calculateCorrelation(featureData.map(d => d.featureValue), featureData.map(d => d.streams));

        // Add correlation text
        container.append("div")
            .attr("class", "correlation")
            .text(`Correlation: ${correlation.toFixed(2)}`);

        // Set up scales
        const x = d3.scaleLinear()
            .domain(d3.extent(featureData, d => d.featureValue))
            .range([0, width - margin.left - margin.right]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(featureData, d => d.streams)])
            .range([height - margin.top - margin.bottom, 0]);

        // Add gridlines
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x).tickSize(-(height - margin.top - margin.bottom)).tickFormat(''))
            .style("color", "#ddd");

        svg.append("g")
            .attr("class", "grid")
            .call(d3.axisLeft(y).tickSize(-(width - margin.left - margin.right)).tickFormat(''))
            .style("color", "#ddd");

        // Add X axis
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
            .call(d3.axisBottom(x))
            .append("text")
            .attr("x", (width - margin.left - margin.right) / 2)
            .attr("y", 40)
            .attr("fill", "black")
            .style("font-size", "12px")
            .text(feature);

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -120)
            .attr("x", -(height - margin.top - margin.bottom) / 10)
            .attr("dy", "1em")
            .attr("fill", "black")
            .style("font-size", "12px")
            .text("Streams on Spotify");

        // Draw points with interaction
        const tooltip = container.append("div")
            .style("position", "absolute")
            .style("background", "#fff")
            .style("border", "1px solid #ddd")
            .style("padding", "5px")
            .style("border-radius", "5px")
            .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
            .style("pointer-events", "none")
            .style("opacity", 0);

        svg.selectAll("circle")
            .data(featureData)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.featureValue))
            .attr("cy", d => y(d.streams))
            .attr("r", 3)
            .style("fill", "red")
            .style("opacity", 0.6)
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                    .html(`Feature: ${d.featureValue.toFixed(2)}<br>Streams: ${d.streams}`)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`);
            })
            .on("mousemove", (event) => {
                tooltip.style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`);
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            });

        // Add zoom and pan
        const zoom = d3.zoom()
            .scaleExtent([1, 10]) // Zoom scale
            .translateExtent([[0, 0], [width, height]]) // Pan boundaries
            .on("zoom", (event) => {
                svg.selectAll("circle")
                    .attr("transform", event.transform);
                svg.selectAll("g.axis").call(event.transform.rescaleX(x));
                svg.selectAll("g.axis").call(event.transform.rescaleY(y));
            });

        svg.call(zoom);
    });
});

// Function to calculate Pearson correlation coefficient
function calculateCorrelation(xArray, yArray) {
    const n = xArray.length;
    const sumX = d3.sum(xArray);
    const sumY = d3.sum(yArray);
    const sumXY = d3.sum(xArray.map((xi, i) => xi * yArray[i]));
    const sumX2 = d3.sum(xArray.map(xi => xi * xi));
    const sumY2 = d3.sum(yArray.map(yi => yi * yi));

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return denominator === 0 ? 0 : numerator / denominator;
}
