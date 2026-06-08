
const fs = require('fs');
const path = require('path');

const talksData = [
  {
    "title": "The Future of WebAssembly",
    "speakers": ["Alex Johnson"],
    "category": ["Web Development", "Performance"],
    "description": "Explore how WebAssembly is changing the landscape of web applications, enabling near-native performance in browsers."
  },
  {
    "title": "Kubernetes in Production: Best Practices",
    "speakers": ["Maria Garcia", "David Lee"],
    "category": ["DevOps", "Cloud Native"],
    "description": "Learn essential strategies and best practices for deploying and managing Kubernetes clusters in production environments."
  },
  {
    "title": "Machine Learning with TensorFlow.js",
    "speakers": ["Sophia Chen"],
    "category": ["AI/ML", "JavaScript"],
    "description": "Discover how to build and deploy machine learning models directly in the browser using TensorFlow.js."
  },
  {
    "title": "Secure Coding for Node.js Applications",
    "speakers": ["James White"],
    "category": ["Security", "Node.js", "Backend"],
    "description": "Understand common security vulnerabilities in Node.js and how to implement robust defenses."
  },
  {
    "title": "Modern CSS Layouts: Flexbox & Grid",
    "speakers": ["Emily Davis"],
    "category": ["Frontend", "CSS"],
    "description": "Master the latest CSS layout techniques, Flexbox and Grid, to create responsive and dynamic user interfaces."
  },
  {
    "title": "Introduction to Quantum Computing",
    "speakers": ["Michael Brown", "Sarah Green"],
    "category": ["Emerging Tech", "Quantum"],
    "description": "An accessible introduction to the fascinating world of quantum computing and its potential impact."
  }
];

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Event Schedule</title>
    <style>
        /* INJECT_CSS_HERE */
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Tech Event Schedule</h1>
            <p>A day filled with insightful technical talks.</p>
        </header>

        <div class="search-bar">
            <input type="text" id="categorySearch" placeholder="Search by category (e.g., Web Development)">
        </div>

        <main id="schedule-container">
            <!-- Schedule will be injected here by JavaScript -->
        </main>

        <footer>
            <p>&copy; 2026 Tech Event. All rights reserved.</p>
        </footer>
    </div>
    <script>
        // INJECT_TALKS_DATA_HERE
        // INJECT_JS_HERE
    </script>
</body>
</html>
`;

const cssContent = `
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f7f6;
    color: #333;
    line-height: 1.6;
}

.container {
    max-width: 1000px;
    margin: 30px auto;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
}

header {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #e0e0e0;
    margin-bottom: 20px;
}

header h1 {
    color: #2c3e50;
    margin-bottom: 10px;
    font-size: 2.5em;
}

header p {
    color: #7f8c8d;
    font-size: 1.1em;
}

.search-bar {
    margin-bottom: 25px;
    text-align: center;
}

.search-bar input[type="text"] {
    width: 80%;
    padding: 12px 15px;
    border: 1px solid #ccc;
    border-radius: 25px;
    font-size: 1em;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
}

.search-bar input[type="text"]:focus {
    border-color: #3498db;
    box-shadow: 0 0 8px rgba(52, 152, 219, 0.4);
    outline: none;
}

.talk-card, .break-card {
    background-color: #ecf0f1;
    border-left: 5px solid #3498db;
    margin-bottom: 15px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease-in-out;
}

.talk-card:hover {
    transform: translateY(-5px);
}

.talk-card h2 {
    color: #2c3e50;
    margin-top: 0;
    font-size: 1.8em;
}

.talk-card p {
    margin: 5px 0;
    font-size: 0.95em;
}

.talk-card .time {
    font-weight: bold;
    color: #e67e22;
    font-size: 1.1em;
}

.talk-card .speakers {
    color: #27ae60;
    font-style: italic;
}

.talk-card .category {
    background-color: #34495e;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.85em;
    margin-right: 5px;
    display: inline-block;
    margin-top: 5px;
}

.talk-card .description {
    margin-top: 15px;
    color: #555;
}

.break-card {
    border-left-color: #e74c3c;
    background-color: #fdedec;
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
    color: #c0392b;
}

.break-card .time {
    color: #c0392b;
}

footer {
    text-align: center;
    padding-top: 20px;
    margin-top: 30px;
    border-top: 1px solid #e0e0e0;
    color: #7f8c8d;
    font-size: 0.9em;
}
`;

const jsContent = `
const eventTalks = /* TALKS_DATA_PLACEHOLDER */;

document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const categorySearchInput = document.getElementById('categorySearch');

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function renderSchedule(talksToRender) {
        scheduleContainer.innerHTML = ''; // Clear previous schedule

        let currentTime = new Date();
        currentTime.setHours(10, 0, 0); // Event starts at 10:00 AM

        talksToRender.forEach((talk, index) => {
            const talkStartTime = new Date(currentTime);
            const talkEndTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1 hour talk

            const talkCard = document.createElement('div');
            talkCard.classList.add('talk-card');
            talkCard.innerHTML = '<p class="time">' + formatTime(talkStartTime) + ' - ' + formatTime(talkEndTime) + '</p>' +
                '<h2>' + talk.title + '</h2>' +
                '<p class="speakers">Speakers: ' + talk.speakers.join(', ') + '</p>' +
                '<p>' +
                    talk.category.map(cat => '<span class="category">' + cat + '</span>').join('') +
                '</p>' +
                '<p class="description">' + talk.description + '</p>';
            scheduleContainer.appendChild(talkCard);

            currentTime = new Date(talkEndTime.getTime() + 10 * 60 * 1000); // 10 minutes transition

            // Insert lunch break after the 3rd talk (index 2)
            if (index === 2) {
                const lunchStartTime = new Date(currentTime);
                const lunchEndTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1 hour lunch

                const breakCard = document.createElement('div');
                breakCard.classList.add('break-card');
                breakCard.innerHTML = '<p class="time">' + formatTime(lunchStartTime) + ' - ' + formatTime(lunchEndTime) + '</p>' +
                    '<p>Lunch Break</p>';
                scheduleContainer.appendChild(breakCard);
                currentTime = new Date(lunchEndTime); // Update current time after lunch
            }
        });
    }

    function filterTalks() {
        const searchTerm = categorySearchInput.value.toLowerCase();
        const filteredTalks = eventTalks.filter(talk =>
            talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
        );
        renderSchedule(filteredTalks);
    }

    categorySearchInput.addEventListener('input', filterTalks);

    // Initial render of the full schedule
    renderSchedule(eventTalks);
});
