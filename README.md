# Music Listening Trends 2023 on Spotify Platform (Data Science and Data Visualization Project)

This project explores and visualizes music listening trends on Spotify for 2023. Using a comprehensive dataset, the project examines user behavior, audio features, and trends through interactive, dynamic visualizations powered by D3.js. Insights include key audio characteristics, correlations, and emerging trends in digital music consumption.


## Features

1. Distribution Histograms with KDE Lines:
    - Analyze the frequency distribution of audio features like danceability, energy, and acousticness.
    - Smooth KDE (Kernel Density Estimation) lines add clarity to visualize the probability density of the data.

2. Heatmap:
    - Explore correlations between audio features, highlighting relationships like danceability vs. energy or speechiness vs. valence.

3. Scatter Plots:
    - Investigate relationships between the number of streams and audio features like energy, valence, and danceability.

4. Pie Chart:
    - Visualize the top five years with the most song releases, providing a historical perspective.

5. Interactive Tooltips:
    - Hover over any chart element to reveal additional details about the data, such as specific feature values or song attributes.

## Objectives
The primary goals of this project are:
  - Data Cleaning and Preparation: Process the dataset to address missing values, inconsistencies, or duplicates, ensuring accurate representation.
  - Trend Analysis: Explore relationships between song features (e.g., energy, tempo, liveness) and their popularity, identifying factors driving success on Spotify.
  - Interactive Visualization: Use D3.js to present data in an accessible and engaging manner through interactive charts and graphs.
  - Insight Discovery: Uncover hidden patterns, such as how certain features like danceability or valence correlate with streaming numbers or artist popularity.

## Dataset
The dataset, `spotify-2023.csv`, was sourced from Kaggle and includes the following attributes:

### Basic Information
  - `track_name:` Name of the song.
  - `artist(s)_name:` Names of the contributing artist(s).
  - `released_year:` Year the song was released.
  - `in_spotify_playlists:` Number of Spotify playlists featuring the song.
  - `streams:` Total number of streams on Spotify.

### Audio Features
  - `bpm:` Beats per minute (tempo).
  - `danceability_%:` Suitability of the song for dancing.
  - `energy_%:` Intensity or activity level of the song.
  - `acousticness_%:` Degree of acoustic sound in the track.
  - `instrumentalness_%:` Instrumental content in the song.
  - `liveness_%:` Presence of live performance elements.
  - `speechiness_%:` Amount of vocal content.
  - `valence_%:` Positivity or mood of the song.

## Visualizations
1. Distribution Histograms with KDE Lines
  - These histograms display the frequency distribution of key audio features, complemented by KDE lines for smoother trends.
  - Example: Danceability's distribution highlights which range of songs is most suitable for dancing.

2. Heatmap
  - The heatmap visualizes correlations between audio features using color intensity.
  - Example: Understand the relationship between high-energy songs and their valence (positivity).

3. Scatter Plots
  - Scatter plots show relationships between the number of streams and specific audio features.
  - Example: Songs with higher danceability might have more streams, revealing user preferences.

4. Pie Chart
  - Represents the top five years with the most song releases, providing insights into historical trends in music production.

Interactive Elements
  - Tooltips: Provide detailed information for each data point or chart element.
  - Hover Effects: Enhance user interaction by highlighting elements on mouseover.

## Installation

1. Clone the repository:
```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
2. Open with Live Server: `html/DistributionHistograms.html` (for example) in a web browser to view the visualizations.


## Project Structure
📁 Project Root
├── datasets/                                    # Contains the dataset
│   └── spotify-2023.csv                         # Dataset for analysis and visualizations
├── html/                                        # HTML files for the project
│   ├── DistributionHistograms.html             # HTML for histogram visualizations
│   ├── Header.html                              # HTML for the header component
│   ├── HeatMap.html                             # HTML for heatmap visualizations
│   ├── ScatterPlot.html                         # HTML for scatter plot visualizations
│   └── Top5.html                                # HTML for pie chart (Top 5 years)
├── js/                                          # JavaScript files for visualizations
│   ├── DistributionHistograms.js               # Script for creating histograms with KDE lines
│   ├── Header.js                                # Script for handling header functionality
│   ├── HeatMap.js                               # Script for generating the heatmap
│   ├── ScatterPlot.js                           # Script for creating scatter plots
│   └── Top5.js                                  # Script for pie chart visualizations



## Technologies Used
- D3.js: JavaScript library for creating interactive and dynamic visualizations.
- HTML/CSS: For structuring and styling the web interface.

## Team Contributions

| Team Member           | Contribution | Github                                                                     |
|-----------------------|--------------|----------------------------------------------------------------------------|
| Đoàn Trần Thuận       | 25%          | <a href="https://github.com/ThuanTheBadLuckCoder">ThuanTheBadLuckCoder</a> |
| Huy Nguyen            | 25%          | <a href="https://github.com/huynq022">huynq022</a>                         |
| Lê Tinh Nhựt          | 25%          | <a href="https://github.com/ltnct12922">ltnct12922</a>                     |
| Đinh Quang Hiển       | 25%          | <a href="https://github.com/ititiu20201">ititiu20201(Be)</a>               |

## References
1. <a href="https://www.kaggle.com/datasets/nelgiriyewithana/top-spotify-songs-2023">Spotify Most Streamed Songs 2023 Dataset</a>
2. <a href="https://newsroom.spotify.com/2023-11-29/top-songs-artists-podcasts-albums-trends-2023/">Spotify Newsroom 2023 Trends</a>
3. <a href="https://github.com/jivanjotk/Most-Streamed-Spotify-Songs-2023-Analysis-">GitHub: Most-Streamed Spotify Songs Analysis</a>

## Example Output

Below is an example of the histograms with KDE lines for feature distributions and the heatmap:

*Histograms:*

![image](https://github.com/user-attachments/assets/e54cccf8-e142-493b-b2cd-3eff708fd46f)


*Heatmap:*

![image](https://github.com/user-attachments/assets/58ad2329-54a1-4266-8518-6fd96f71bdbd)


*Scatter Plots:*

![image](https://github.com/user-attachments/assets/e888e92e-902c-4341-b3fb-9b04b008607e)


*Pie Chart:*

![image](https://github.com/user-attachments/assets/b8fc3585-d9cd-43b0-b775-03f17a4e3350)








