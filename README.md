![Lumenocity logo](https://lumenocity.io/apple-touch-icon.png)

Lumenocity is a wallet built for Android and iOS on the Stellar network.

## Features

In v1, the aim is to make a minimal viable product. There's a lot of features still coming, and this is step one, to first of all gauge interest and also to establish a solid platform for further development.

So here's what we've got:

 * Full support for internationalisation
 * Multiple accounts
 * Federation w/ the lumenocity.io server (you*lumenocity.io)
 * Setting up an inflation pool, with a few popular inflation pools built in for ease of use
 * Name your accounts so that they are easier to keep track of
 * QR codes can be used to export your keys, send your address to a friend or to pay your friend

## Roadmap

This is a big project. I started this in February and the aim was to get an app in the app stores for the judging phase of the Build Challenge on March 15th. But here's a sampling of what's coming:

 * [Push notifications for transactions to/from your accounts in the app](https://github.com/lumenocity/app/issues/9)
 * [Complete support for all assets on StellarTerm - this means showing them but also the ability to send and receive them](https://github.com/lumenocity/app/issues/10)
 * [Send funds to anyone via email - they will get an email prompting them to collect your sent assets](https://github.com/lumenocity/app/issues/8)
 * [Integration with the contact list on the phone, allowing you to set Stellar addresses to them](https://github.com/lumenocity/app/issues/11)
 * [Fund/invite an account/user](https://github.com/lumenocity/app/issues/12)

## Who made this?

I am [@mtimofiiv](https://fiiv.io) and I am building this project. I've been working in web development since 2010. I am currently a freelancer and digital nomad. I teach and write as well. If you want to hire me for a project, feel free to contact me at [contact at fiiv.io](mailto:contact@fiiv.io).

If you're interested in contributing, please don't hesitate to get in touch, I'd love the help ;)

## Contributing

If you want to improve this software, I'd welcome the contribution! Submit an issue or a PR!

## A note on using Haul instead of Metro packager

This project uses the [Haul packager](https://github.com/callstack/haul) instead of the customary [Metro](https://facebook.github.io/metro/) that comes standard with React Native. The reason is that Lumenocity uses the [Stellar JS SDK](https://github.com/stellar/js-stellar-sdk) (to manage communications with the Horizon API), and its dependency graph involves several environment-dependent modules (such as in Node, it will use the `vm` module). These are fundamental to the SDK since they handle a lot of the cryptographic functions under the hood.

Where it causes problems is that Metro thinks it should bundle Node.js modules such as `vm` instead of using the fallbacks. If someone can help with this problem, I'd love to hear from you! But in the meantime, Haul it is!

## Running

 * `yarn start:[android|ios]` will start the bundling process for a given platform
 * `yarn ios` does an iOS build and deploys it to either Xcode's simulator or a connected device
 * `yarn android` does an Android build and deploys it to any running devices
 * `yarn build:android` does a signed Android build
 * `yarn generate:key` creates signing keys for use with Android's signed builds
