const onboardingImport = `An account is similar to a traditional bank's account in that it holds funds and allows you to send and receive them.

Please add the secret (private key) for the account here, using text input or a QR code scanner.`

const onboardingFederation = `Normal Stellar account addresses are 56 characters, and are made up of random letters and numbers. This makes it pretty difficult to send funds around!

But luckily, there's a solution - it's called "federation". Federation allows you to alias your 56-character address to something easier to remember. This is called your "federated address": these take the format similar to email and look like this:

    fiiv*lumenocity.io
    
Lumenocity has its own federated address service, lumenocity.io. You can choose a username to use for the first part. A username must be made up of only letters or numbers.`

const onboardingInflation = `On the Stellar network, a tiny fee is paid for each transaction. The Stellar organisation redestributes this amount to users about once a week in a process called "inflation".

But to take advantage of it, you need to be voted for by other users. Ordinary people tend not to be able to get enough votes, but there is a way to collect it anyways - by nominating someone else to collect them for you, then forward them to you. This is called an "inflation pool".

To take advantage of this, please select a pool below - these are community-run. Lumenocity recommends Lumenaut since it has 0 fees!`

const accountHelpInflation = `On the Stellar network, a tiny fee is paid for each transaction. The Stellar organisation redestributes this amount to users about once a week in a process called "inflation".

But to take advantage of it, you need to be voted for by other users. Ordinary people tend not to be able to get enough votes, but there is a way to collect it anyways - by nominating someone else to collect them for you, then forward them to you. This is called an "inflation pool".

To take advantage of this, please select a pool below - these are community-run. Lumenocity recommends Lumenaut since it has 0 fees!`

const accountHelpFederation = `Normal Stellar account addresses are 56 characters, and are made up of random letters and numbers. This makes it pretty difficult to send funds around!
    
But luckily, there's a solution - it's called "federation". Federation allows you to alias your 56-character address to something easier to remember. This is called your "federated address": these take the format similar to email and look like this:

    fiiv*lumenocity.io
    
Lumenocity has its own federated address service, lumenocity.io. You can choose a username to use for the first part. A username must be made up of only letters or numbers.`

const accountHelpRename = `Let's face it, Stellar's default addresses are difficult to remember.
Don't blame yourself - they're 56 characters of random numbers and letters! Lumenocity wants to help you with this!

To that end, you can name your accounts anything you want, and this name will be what you can use in the app to do things to your account. Remember though, that this is only available inside the app, and does not actually store anything on the blockchain.`

export default {
  onboardingImport,
  onboardingFederation,
  onboardingInflation,
  accountHelpInflation,
  accountHelpFederation,
  accountHelpRename
}
