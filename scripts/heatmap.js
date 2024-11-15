// Function to calculate correlation between two arrays
function calculateCorrelation(arr1, arr2) {
    const n = arr1.length;
    const mean1 = d3.mean(arr1);
    const mean2 = d3.mean(arr2);
    const covariance = d3.sum(arr1.map((d, i) => (d - mean1) * (arr2[i] - mean2))) / n;
    const stdDev1 = Math.sqrt(d3.sum(arr1.map(d => Math.pow(d - mean1, 2))) / n);
    const stdDev2 = Math.sqrt(d3.sum(arr2.map(d => Math.pow(d - mean2, 2))) / n);
    return covariance / (stdDev1 * stdDev2);
}

// Load data from CSV and calculate correlation matrix
d3.csv("../datasets/spotify-2023.csv").then(data => {
    const features = ['bpm', 'danceability_%', 'valence_%', 'energy_%', 'acousticness_%', 'instrumentalness_%', 'liveness_%', 'speechiness_%'];
    
    // Convert feature columns to arrays of numbers
    const featureData = features.map(feature => data.map(d => +d[feature]));

    // Calculate the correlation matrix
    const correlationMatrix = features.map((featureX, i) => {
        return features.map((featureY, j) => calculateCorrelation(featureData[i], featureData[j]));
    });

    // Create the heatmap
    const cellSize = 80;
    const width = cellSize * features.length;
    const height = cellSize * features.length;

    const svg = d3.select("svg")
        .attr("width", width + 100)
        .attr("height", height + 100)
        .append("g")
        .attr("transform", "translate(50, 50)");

    const colorScale = d3.scaleSequential()
        .domain([-1, 1])
        .interpolator(d3.interpolateRdBu);  // Red for negative, blue for positive correlations

    // Draw the heatmap cells
    svg.selectAll("rect")
        .data(correlationMatrix.flatMap((row, i) => row.map((value, j) => ({ x: i, y: j, value }))))
        .enter()
        .append("rect")
        .attr("x", d => d.x * cellSize)
        .attr("y", d => d.y * cellSize)
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("fill", d => colorScale(d.value));

    // Add labels for rows and columns
    svg.selectAll(".x-label")
        .data(features)
        .enter()
        .append("text")
        .attr("class", "x-label")
        .attr("x", (_, i) => i * cellSize + cellSize / 2)
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .text(d => d);

    svg.selectAll(".y-label")
        .data(features)
        .enter()
        .append("text")
        .attr("class", "y-label")
        .attr("x", -5)
        .attr("y", (_, i) => i * cellSize + cellSize / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("font-size", "10px")
        .text(d => d);

    // Add correlation values inside the cells
    svg.selectAll("text.cell-text")
        .data(correlationMatrix.flatMap((row, i) => row.map((value, j) => ({ x: i, y: j, value }))))
        .enter()
        .append("text")
        .attr("class", "cell-text")
        .attr("x", d => d.x * cellSize + cellSize / 2)
        .attr("y", d => d.y * cellSize + cellSize / 2)
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .style("font-size", "10px")
        .style("fill", "black")
        .text(d => d.value.toFixed(2));
});
