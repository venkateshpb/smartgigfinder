function fetchGigs() {
    const skills = document.getElementById('skills').value;
    const url = skills ? `/gigs?skills=${skills}` : '/gigs';
    const gigsDiv = document.getElementById('gigs');
    const loadingDiv = document.getElementById('loading');

    // Show loading spinner
    gigsDiv.innerHTML = '';
    loadingDiv.style.display = 'block';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(gigs => {
            loadingDiv.style.display = 'none';
            gigsDiv.innerHTML = gigs.length > 0 
                ? gigs.map(g => `<p>${g.title} - ${g.skills} (Score: ${g.score.toFixed(2)}%)</p>`).join('')
                : '<p>No matching gigs found.</p>';
        })
        .catch(error => {
            loadingDiv.style.display = 'none';
            gigsDiv.innerHTML = '<p style="color: #ff6b6b; text-align: center;">Error fetching gigs. Please try again later.</p>';
            console.error('Fetch error:', error);
        });
}

function fetchSkillsTrends() {
    fetch('/skills-trends')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(skillsCount => {
            const labels = Object.keys(skillsCount);
            const data = Object.values(skillsCount);

            const ctx = document.getElementById('skillsChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Skills Demand',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.3)',
                            'rgba(54, 162, 235, 0.3)',
                            'rgba(255, 206, 86, 0.3)',
                            'rgba(75, 192, 192, 0.3)',
                            'rgba(153, 102, 255, 0.3)',
                            'rgba(255, 159, 64, 0.3)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Gigs',
                                font: { size: 14 }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Skills',
                                font: { size: 14 }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                font: { size: 14 }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            document.getElementById('skillsChart').parentElement.innerHTML = 
                '<p style="color: #ff6b6b; text-align: center;">Error loading chart. Please try again later.</p>';
        });
}

document.getElementById('skills').value = '';
fetchGigs();
fetchSkillsTrends();