const fetch = require('node-fetch')
const {JWT} = require('google-auth-library')
const key = require('../service-account.json')
const GOOGLEAPIS_SCOPES = ['https://www.googleapis.com/auth/firebase.messaging']

/**
 * @returns {Promise<string>}
 */
async function getAccessToken() {
    const jwtClient = new JWT(
        key.client_email,
        null,
        key.private_key,
        GOOGLEAPIS_SCOPES,
        null
    )
    try {
        const tokens = await jwtClient.authorize()
        return tokens.access_token
    } catch (e) {
        console.error(e)
    }
}

/**
 * @param {string[]} fcmTokens
 * @param {Object} notification
 * @param {string} notification.body
 * @param {string} notification.title
 * @param {string} notification.activity
 * @param {int} notification.data
 * @returns {Promise}
 */
async function sendFcmNotification(fcmTokens, notification) {
    const googleToken = await getAccessToken()
    const {body, title, activity, data} = notification
    const requests = fcmTokens.map(fcmToken => {
        fetch('https://fcm.googleapis.com/v1/projects/qrmenuapp-b28d7/messages:send', {
            'method': 'POST',
            'headers': {
                'Authorization': 'Bearer ' + googleToken,
            },
            'body': JSON.stringify({
                "message": {
                    "token": fcmToken,
                    "data": {
                        "body": body,
                        "title": title,
                        "activity": activity,
                        "data": data
                    },
                    "android": {
                        "priority": "HIGH"
                    }
                }
            })
        }).then(res => console.log("fcm_response -> " + res))
    })
    return Promise.all(requests).catch(console.error)
}

module.exports = { sendFcmNotification }
