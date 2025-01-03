const getVoteKey = (vote) => {
    switch (vote) {
        case 'Yes':
            return 'yes';
        case 'Missing Information':
            return 'mi';
        case 'No':
            return 'no';
    }
}

module.exports = {
    getVoteKey
}