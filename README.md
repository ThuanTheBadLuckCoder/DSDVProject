# Spotify Dataset Visualization

This project visualizes the audio features of tracks from a Spotify dataset using D3.js and HTML/CSS. Key attributes like danceability, energy, valence, acousticness, instrumentalness, liveness, and speechiness are analyzed and displayed in various interactive visualizations, including histograms with KDE lines and heatmaps, to explore the distribution and correlation of audio characteristics.


## Features

- **Distribution Histograms:** chart showing the distribution of sound characteristics
- **Heatmap:** chart showing the correlation between the sound characteristics of the song
- **Pie Chart:** chart showing the 5 years with the most songs


## Dataset

The dataset used in this project, spotify-2023.csv, contains attributes for each track, including:

- **Basic track information:** track_name, artist(s)_name, released_year, etc.
- **Audio features:** bpm, danceability_%, energy_%, acousticness_%, instrumentalness_%, liveness_%, and speechiness_%.


## Installation

1. Clone the repository:
```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
2. Open `index.html` in a web browser to view the visualizations.


## Usage

- **Distribution Histograms:** The histograms visualize each feature's frequency distribution, with KDE lines added for smoothness.
- **Heatmap:** The heatmap displays correlations between the audio features, useful for identifying patterns across different attributes.


## Project Structure

`index.html:` Main HTML file for the project.

`style.css:` Contains custom styles for the visualizations.

`DistributionHistograms.js:` JavaScript code for generating histograms with KDE lines.

`Heatmap.js:` JavaScript code for generating the heatmap of audio feature correlations.

`spotify-2023.csv:` Dataset used for visualizations.


## Technologies Used

`D3.js:` For creating interactive and dynamic visualizations.

`HTML/CSS:` For structuring and styling the web page.

`Python (optional):` Used for data preprocessing and testing visualizations with Seaborn in Jupyter Notebooks.


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


## Project Contributions

| Team Member           | Contribution | Github                                                                     |
|-----------------------|--------------|----------------------------------------------------------------------------|
| Đoàn Trần Thuận       | 25%          | <a href="https://github.com/ThuanTheBadLuckCoder">ThuanTheBadLuckCoder</a> |
| Huy Nguyen            | 25%          | <a href="https://github.com/huynq022">huynq022</a>                         |
| Lê Tinh Nhựt          | 25%          | <a href="https://github.com/ltnct12922">ltnct12922</a>                     |
| Đinh Quang Hiển       | 25%          | <a href="https://github.com/ititiu20201">ititiu20201(Be)</a>               |





