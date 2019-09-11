module.exports = (client) => {
    client.user.setActivity("with a knife?", {
        type: 0
    })
    console.log('Tweetsplit is working.')
    console.log('Owner ID is: ' + process.env.OWNERID)
}