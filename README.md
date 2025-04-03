# Smart Freelance Gig Finder

A web app to find freelance gigs based on your skills, with a trends graph showing skills demand.

## Features
- Scrape freelance gigs and store them in a SQLite database.
- Search gigs by skills with a matching score.
- Visualize skills demand using a bar graph (Chart.js).
- Deployed on Render: [Live URL](https://smartgigfinder.onrender.com)

## Tech Stack
- **Backend**: Node.js, Express, SQLite
- **Frontend**: HTML, CSS, JavaScript, Chart.js
- **Scraper**: Python, BeautifulSoup

## Setup
1. Clone the repo: `git clone https://github.com/venkateshpb/smartgigfinder.git`
2. Install dependencies: `cd backend && npm install`
3. Run the scraper: `cd scraper && python scrape.py`
4. Start the app: `cd backend && npm start`
5. Open `http://localhost:3000` in your browser.

## Deployment
- Deployed on Render with a `render.yaml` configuration.
- SQLite database (`gigs.db`) is populated during deployment.