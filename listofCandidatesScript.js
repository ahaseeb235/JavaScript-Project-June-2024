 // Fetch JSON data using async fetch method
 async function fetchData() {
    const response = await fetch('listofCandidates2024.json'); // reference to JSON file
    const data = await response.json();
    processCandidates(data);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

function processCandidates(data) {
    displayAlphabetIndex(data);
    displayCandidates(data, 'All');
}

function displayAlphabetIndex(candidates) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const indexDiv = document.getElementById('alphabetIndex');
    indexDiv.innerHTML = '';

 // The All button   
    const allButton = document.createElement('button');
    allButton.innerText = 'All';
    allButton.onclick = () => displayCandidates(candidates, 'All');
    indexDiv.appendChild(allButton);

    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.innerText = letter;
        button.onclick = () => displayCandidates(candidates, letter);
        indexDiv.appendChild(button);
    });
}

function displayCandidates(candidates, filter) {
    const tbody = document.getElementById('candidatesBody');
    tbody.innerHTML = '';

    const filteredCandidates = filter === 'All' ? candidates : candidates.filter(candidate => candidate.firstName[0].toUpperCase() === filter);

    filteredCandidates.forEach(candidate => {
        const row = document.createElement('tr');

        const firstNameCell = document.createElement('td');
        firstNameCell.setAttribute('data-label', 'First Name');
        const firstNameLink = document.createElement('a');
        //firstNameLink.href = `#`; // Modify href as needed
        firstNameLink.innerText = candidate.firstName;
        firstNameCell.appendChild(firstNameLink);
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.setAttribute('data-label', 'Last Name');
        lastNameCell.innerText = candidate.lastName;
        row.appendChild(lastNameCell);

        const politicalPartyCell = document.createElement('td');
        politicalPartyCell.setAttribute('data-label', 'Political Party');
        const politicalPartyLink = document.createElement('a');
        //politicalPartyLink.href = `#`; // Modify href as needed
        politicalPartyLink.innerText = candidate.politicalParty;
        politicalPartyCell.appendChild(politicalPartyLink);
        row.appendChild(politicalPartyCell);

        const regionRepCell = document.createElement('td');
        regionRepCell.setAttribute('data-label', 'Region Rep');
        regionRepCell.innerText = candidate.regionRep;
        row.appendChild(regionRepCell);

        const votesRecCell = document.createElement('td');
        votesRecCell.setAttribute('data-label', 'Votes Rec');
        votesRecCell.innerText = candidate.votesRec;
        row.appendChild(votesRecCell);

        const finalVerdictCell = document.createElement('td');
        finalVerdictCell.setAttribute('data-label', 'Final Verdict');
        finalVerdictCell.innerText = candidate.finalVerdict;
        row.appendChild(finalVerdictCell);

        tbody.appendChild(row);
    });
}