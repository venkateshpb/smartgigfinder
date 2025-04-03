function fetchGigs() {
    const skills = document.getElementById('skills').value;
    const url = skills ? `/gigs?skills=${skills}` : '/gigs';
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(gigs => {
            console.log("Gigs data:", gigs);
            document.getElementById('gigs').innerHTML = gigs.length > 0 
                ? gigs.map(g => `<p>${g.title} - ${g.skills} (Score: ${g.score.toFixed(2)}%)</p>`).join('')
                : '<p>No matching gigs found.</p>';
        })
        .catch(error => {
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
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Gigs'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Skills'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

fetchGigs();
fetchSkillsTrends();