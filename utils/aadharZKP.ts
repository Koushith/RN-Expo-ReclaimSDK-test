import { Reclaim } from '@reclaimprotocol/reactnative-sdk';

export async function startVerificationFlow() {
  console.log('startVerificationFlow---------------------')
  try {

    const reclaimClient = new Reclaim.ProofRequest("0xfC8Bb49259646B83AdB677216B577CFFdD56e65f") // your app ID. 
    const APP_SECRET = "0x5ab45066574a6b91c2def8a5131411a1308f533b1bc5aad6a23b78c40b277b11" // your app secret key.


    const providerIds = [
      '5e1302ca-a3dd-4ef8-bc25-24fcc97dc800', // Aadhaar Card Date of Birth
    ];


    const appDeepLink = 'YOUR_APP_DEEP_LINK_HERE' //TODO: replace with your app deep link
    reclaimClient.setAppCallbackUrl(appDeepLink)

    await reclaimClient.addContext(
      ("users address"),
      ("add a message")
    )

    await reclaimClient.buildProofRequest(providerIds[0])

    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET)
    )

    console.log('signature',)
    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest()

    console.log('requestUrl', requestUrl)
    console.log('statusUrl', statusUrl)

    await reclaimClient.startSession({
      onSuccessCallback: proof => {
        console.log('Verification success', proof)
        // Your business logic here
      },
      onFailureCallback: error => {
        console.error('Verification failed', error)
        // Your business logic here to handle the error
      }
    })
    
  } catch (error) {
    console.log('startVerificationFlow---------------------error', error)
    
  }
}