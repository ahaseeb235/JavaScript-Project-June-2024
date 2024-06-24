// Fetch and initialize data
let candidates = [];
fetch('finalListOfCandidates2024.json')
    .then(response => response.json())
    .then(data => {
        candidates = data;
        populateAlphabetFilter();
        populateRegionFilter();
        populatePoliticalPartyFilter();
        populatefinalVerdictFilter();
        displayCandidates(candidates);
    });

// Populate alphabet filter
function populateAlphabetFilter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetFilter = document.getElementById('alphabetFilter');
    
    for (let char of alphabet) {
        const button = document.createElement('button');
        button.textContent = char;
        button.onclick = () => filterByAlphabet(char);
        alphabetFilter.appendChild(button);
    }
}

// Populate region filter
function populateRegionFilter() {
    const regions = [...new Set(candidates.map(candidate => candidate.constituency))];
    const regionFilter = document.getElementById('regionFilter');
    
    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });
}

// populate political party filter
function populatePoliticalPartyFilter() {
    const politicalPartys = [...new Set(candidates.map(candidate => candidate.politicalParty))];
    
    politicalPartys.forEach(politicalParty => {
        const option = document.createElement('option');
        option.value = politicalParty;
        option.textContent = politicalParty;
        politicalPartyFilter.appendChild(option);
    });
}

// populate final verdict
function populatefinalVerdictFilter() {
    const finalVerdicts = [...new Set(candidates.map(candidate => candidate.finalVerdict))];
    
    finalVerdicts.forEach(finalVerdict => {
        const option = document.createElement('option');
        option.value = finalVerdict;
        option.textContent = finalVerdict;
        finalVerdictFilter.appendChild(option);
    });

}




// Display candidates in table
function displayCandidates(candidatesToDisplay) {
    const tbody = document.getElementById('candidateTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    candidatesToDisplay.forEach(candidate => {
        const row = document.createElement('tr');
        
       
        for (let key in candidate) {
            const cell = document.createElement('td');
            cell.textContent = candidate[key];
            row.appendChild(cell);
        }

    // Adding highlight class if the candidate is elected
        if (candidate.finalVerdict === 'Elected') {
            row.style.backgroundColor = 'lightgreen';
        }

        tbody.appendChild(row);
    });
}

// Filter by alphabet
function filterByAlphabet(char) {
    let filteredCandidates = candidates;

    if (char !== 'All') {
        filteredCandidates = candidates.filter(candidate => candidate.fullName.startsWith(char));
    }

    applyFilters(filteredCandidates);
}

// Apply gender, region, political party and final verdict filters
function applyFilters(filteredCandidates = candidates) {
    const genderFilter = document.getElementById('genderFilter').value;
    const regionFilter = document.getElementById('regionFilter').value;
    const finalVerdictFilter = document.getElementById('finalVerdictFilter').value;
    const politicalPartyFilter = document.getElementById('politicalPartyFilter').value;

    if (genderFilter) {
        filteredCandidates = filteredCandidates.filter(candidate => candidate.Gender === genderFilter);
    }

    if (regionFilter) {
        filteredCandidates = filteredCandidates.filter(candidate => candidate.constituency === regionFilter);
    }

    if (finalVerdictFilter) {
        filteredCandidates = filteredCandidates.filter(candidate => candidate.finalVerdict === finalVerdictFilter);
    }

    if (politicalPartyFilter) {
        filteredCandidates = filteredCandidates.filter(candidate => candidate.politicalParty === politicalPartyFilter);
    }

    displayCandidates(filteredCandidates);
}



