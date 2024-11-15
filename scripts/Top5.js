// Load data from CSV
d3.csv("../datasets/spotify-2023.csv").then(data => {
    // Step 1: Process the data to count releases by year
    const yearCount = d3.rollups(
        data,
        v => v.length,
        d => d.released_year
    ).sort((a, b) => b[1] - a[1]);

    // Step 2: Take the top 5 years with the most releases
    const top5Years = yearCount.slice(0, 5);

    // Step 3: Calculate the total releases for the top 5 years
    const totalReleases = d3.sum(top5Years, d => d[1]);

    // Step 4: Create the pie chart with a smaller radius
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 3;  // Reduced radius for a smaller pie chart

    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
        .value(d => d[1]);

    const arc = d3.arc()
        .innerRadius(1)
        .outerRadius(radius);

    

    const marginOuterArc = 1.15;
    const outerArc = d3.arc()
        .innerRadius(radius * marginOuterArc)  // Further distance from the circle
        .outerRadius(radius * marginOuterArc);

    svg.selectAll("path")
        .data(pie(top5Years))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data[0]))
        .attr("stroke", "white")
        .style("stroke-width", "2px");

    // Add percentage labels inside each segment
    svg.selectAll(".percent-label")
        .data(pie(top5Years))
        .enter()
        .append("text")
        .attr("class", "percent-label")
        .text(d => `${((d.data[1] / totalReleases) * 100).toFixed(1)}%`)
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "black");

    // Add year labels outside each segment
    svg.selectAll(".year-label")
        .data(pie(top5Years))
        .enter()
        .append("text")
        .attr("class", "year-label")
        .text(d => `${d.data[0]}`)
        .attr("transform", d => `translate(${outerArc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "black");
});
