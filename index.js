const fetch = require('node-fetch');

module.exports = async () => {
    const response = await fetch('https://nutzdoch.einfachiota.de/nodes');
    const nodes = await response.json();
    nodes.forEach(function(node) {
        node.score = calc_points(node)
    })
    return nodes;
};


const calc_points = function(node) {
    var points = 0
    var factor = 1
    node.commands.forEach(function (entry) {
        switch (entry.command) {
            case 'attachToTangle':
                factor = 50
                break
            case 'broadcastTransactions':
                factor = 5
                break
            case 'checkConsistency':
                factor = 5
                break
            case 'findTransactions':
                factor = 5
                break
            case 'getBalances':
                factor = 3
                break
            case 'getInclusionStates':
                factor = 3
                break
            case 'getNodeInfo':
                factor = 1
                break
            case 'getTransactionsToApprove':
                factor = 3
                break
            case 'getTrytes':
                factor = 3
                break
            case 'storeTransactions':
                factor = 20
                break
            case 'wereAddressesSpentFrom':
                factor = 5
                break
            default:
                multi = 1
        }
        points = points + entry.count * factor - entry.millis / 1000
    })
    return Math.round(points)
}
