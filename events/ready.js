module.exports = (client) => {
    client.user.setActivity(`${process.env.PREFIX}help | ${client.version}`, {
        type: 0
    })
    console.log('Tweetsplit is working.')
    console.log('Owner ID is: ' + process.env.OWNERID)
}