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

    // Zoom function
    const zoom = d3.zoom()
        .scaleExtent([1, 10]) // Zoom scale
        .translateExtent([[0, 0], [width + margin.left + margin.right, height + margin.top + margin.bottom]]) // Pan boundaries
        .on("zoom", (event) => {
            svg.selectAll("rect")
                .attr("transform", event.transform);
            svg.selectAll("path.line")
                .attr("transform", event.transform);
            svg.selectAll("g.axis")
                .call(event.transform.rescaleX(x));
            svg.selectAll("g.axis")
                .call(event.transform.rescaleY(y));
        });

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
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                    .html(`Value: ${d.x0.toFixed(2)}<br>Count: ${d.length}`)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`);
                d3.select(this).style("opacity", 1);  // Highlight bar
            })
            .on("mousemove", (event) => {
                tooltip.style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`);
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
                d3.select(this).style("opacity", 0.6);  // Restore bar opacity
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
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", line)
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                    .html(`X: ${d[0][0].toFixed(2)}<br>Density: ${d[0][1].toFixed(2)}`)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`);
                d3.select(this).style("stroke-width", 3).style("stroke", "orange");  // Highlight line
            })
            .on("mousemove", (event) => {
                tooltip.style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY - 20}px`);
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
                d3.select(this).style("stroke-width", 2).style("stroke", "red");  // Restore line style
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

        // Apply zoom
        svg.call(zoom);
    });
});
