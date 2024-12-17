// KDE helper functions
function kernelDensityEstimator(kernel, X) {
    return function(V) {
        return X.map(x => [x, d3.mean(V, v => kernel(x - v))]);
    };
}

// Adjust the kernel for smoother results
function kernelEpanechnikov(k) {
    return function(v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
}

// Load CSV file
d3.csv("../datasets/spotify-2023.csv").then(data => {
    console.log("Data loaded:", data); // Debug line to check data

    const features = ['danceability_%', 'energy_%', 'valence_%', 'acousticness_%', 'instrumentalness_%', 'liveness_%', 'speechiness_%'];
    const width = 1400;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    // Tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "#fff")
        .style("border", "1px solid #ddd")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("box-shadow", "0 2px 4px rgba(0,0,0,0.1)")
        .style("pointer-events", "none")
        .style("opacity", 0);

    features.forEach((feature, index) => {
        // Append an SVG for each feature with a vertical layout
        const svg = d3.select("#chart-container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const featureData = data.map(d => +d[feature]);

        // Set up scales
        const x = d3.scaleLinear()
            .domain([d3.min(featureData), d3.max(featureData)])
            .range([0, width]);

        const y = d3.scaleLinear()
            .range([height, 0])
            .nice();

        // Set up histogram bins
        const histogram = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(30)); // 30 bins, matching seaborn example

        const bins = histogram(featureData);
        y.domain([0, d3.max(bins, d => d.length)]);

        // Draw histogram bars
        svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
        .attr("x", d => x(d.x0) + 1)
        .attr("y", d => y(d.length))
        .attr("width", d => x(d.x1) - x(d.x0) - 1)
        .attr("height", d => y(0) - y(d.length))
        .style("fill", "red")
        .style("opacity", 0.6)
        .on("mouseover", function(event, d) {
            tooltip.style("opacity", 1)
            .html(`X: ${d.x0.toFixed(2)}<br>Count: ${d.length}`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`);
        
        // Change color to yellow and add highlight effect
        d3.select(this)
            .transition()
            .duration(200) // Smooth transition effect
            .style("fill", "yellow")
            .style("opacity", 1);
    })
    .on("mousemove", (event) => {
        tooltip.style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`);
    })
    .on("mouseout", function() {
        tooltip.style("opacity", 0);

        // Revert color to red and original opacity
        d3.select(this)
            .transition()
            .duration(200) // Smooth transition effect
            .style("fill", "red")
            .style("opacity", 0.6);
    });

        // Calculate and draw KDE line
        const bandwidth = 2.5; // Adjusted for smoother KDE
        const kde = kernelDensityEstimator(kernelEpanechnikov(bandwidth), x.ticks(100));
        const density = kde(featureData);

        const line = d3.line()
            .curve(d3.curveBasis) // Smooth line
            .x(d => x(d[0]))
            .y(d => y(d[1] * featureData.length * bandwidth * 0.8)); // Adjust scale factor for KDE line height
        
        svg.append("path")
            .datum(density)
            .attr("class", "line")
            .attr("fill", "none")

            //Change kde line color: Red --> Blue
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", line)

            //Update: Fix the kde line
            .on("mousemove", function (event) {
                // Get mouse position relative to the KDE path
                const mouseX = d3.pointer(event, this)[0];
                const xValue = x.invert(mouseX); // Convert pixel position to data domain
                
                // Interpolate to find the closest KDE density value
                const closestPoint = density.reduce((a, b) => 
                    Math.abs(b[0] - xValue) < Math.abs(a[0] - xValue) ? b : a
                );
        
                // Show tooltip with interpolated density value
                tooltip.style("opacity", 1)
                    .html(`X: ${closestPoint[0].toFixed(2)}<br>Density: ${closestPoint[1].toFixed(4)}`)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`);
            })
            .on("mouseout", function () {
                tooltip.style("opacity", 0);
            });

        // X-axis
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .append("text")
            .attr("x", width / 2)
            .attr("y", 35)
            .attr("fill", "black")
            .style("font-size", "12px")
            .text(feature);

        // Y-axis
        svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -40)
            .attr("x", -height / 2)
            .attr("dy", "1em")
            .attr("fill", "black")
            .style("font-size", "12px")
            .text("Frequency");

        // Title for each subplot
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(`Distribution of ${feature}`);
        
        // Update: Add Legend
        const legend = svg.append("g")
        .attr("transform", `translate(${width - 150}, ${margin.top})`); // Adjust position to the top-right corner

        // Legend for KDE line
        legend.append("line")
        .attr("x1", 0)
        .attr("x2", 15)
        .attr("y1", 30)
        .attr("y2", 30)
        .attr("stroke", "blue")
        .attr("stroke-width", 2);

        legend.append("text")
        .attr("x", 20)
        .attr("y", 34)
        .style("font-size", "12px")
        .text("Density (KDE line)");
    });
});
