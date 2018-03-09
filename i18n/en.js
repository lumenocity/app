export default {

  ui: {

    tabs: {
      accounts: 'Accounts',
      send: 'Send',
      settings: 'Settings'
    },

    inputs: {
      stellar_address: {
        placeholder: 'Enter address'
      },
      account_picker: {
        placeholder: 'Select an account'
      },
      asset_amount: {
        placeholder: 'Enter amount (ie. 55)'
      },
      inflation_pools: {
        placeholder: 'Select a pool'
      }
    },

    common: {
      close: 'Close',
      status: 'Status',
      date: 'MMMM D, YYYY @ H:mm',
      inflation_address: 'Inflation pool address',
      federated_address: 'Federated address',
      account_address: 'Account address'
    }

  },

  onboarding: {
    header: 'Add Account',
    segment_existing_account: 'Import Existing',
    about_import: `An account is similar to a traditional bank's account in that it holds funds and allows you to send and receive them.

Please add the secret (private key) for the account here, using text input or a QR code scanner.`,
    add_btn: 'Import account',
    federate_btn: 'Create federated address',
    set_inflation_btn: 'Set inflation pool',
    finalise_btn: 'Done',
    about_federation: `
Normal Stellar account addresses are 56 characters, and are made up of random letters and numbers. This makes it pretty difficult to send funds around!

But luckily, there's a solution - it's called "federation". Federation allows you to alias your 56-character address to something easier to remember. This is called your "federated address": these take the format similar to email and look like this:

    fiiv*lumenocity.io
    
Lumenocity has its own federated address service, lumenocity.io. You can choose a username to use for the first part. A username must be made up of only letters or numbers.`,
    about_inflation: `On the Stellar network, a tiny fee is paid for each transaction. The Stellar organisation redestributes this amount to users about once a week in a process called "inflation".

But to take advantage of it, you need to be voted for by other users. Ordinary people tend not to be able to get enough votes, but there is a way to collect it anyways - by nominating someone else to collect them for you, then forward them to you. This is called an "inflation pool".

To take advantage of this, please select a pool below - these are community-run. Lumenocity recommends Lumenaut since it has 0 fees!`,
    finalise: 'Account import is done! Here are your details:'
  },

  accounts: {
    list_header: 'Accounts',
    view_header: 'Viewing',
    current_balance: 'Current balance:',
    total_balance: 'Total Balance:',
    no_accounts: 'You have absolutely no accounts',
    no_transactions: 'You have absolutely no transactions',
    balance: 'Balance',

    actions: {
      title: 'Account Actions',
      send: 'Send address to a friend',
      inflation: 'Set inflation',
      federate: 'Federate address',
      rename: 'Rename account',
      wut: 'What is this?'
    }
  },

  send: {
    form_header: 'Send Funds',
    status_header: 'Tracker',
    send_btn: 'Send',
    new_send_btn: 'New Transaction',
    view_on_stellarchain: 'View on StellarChain',

    status: {
      processing: 'processing',
      completed: 'completed'
    }
  },

  settings: {
    header: 'Settings',

    actions: {
      purge: 'Clear all data'
    }
  },

  transaction: {
    header: 'Transaction',
    no_hash: 'Awaiting transaction ID',
    effects: {
      create_account: 'Account initialised',
      account_credited: 'Received {{amount}} {{assetAbbreviation}}',
      account_debited: 'Sent {{amount}} {{assetAbbreviation}}',
      set_options: 'Changed preferences'
    }
  },

  effects: {
    create_account: 'Account initialised',
    account_credited: 'Received {{amount}} {{assetAbbreviation}} from {{truncFrom}}',
    account_debited: 'Sent {{amount}} {{assetAbbreviation}} to {{truncTo}}'
  },

  errors: {
    NO_INTERNET: 'You are not connected to internet',
    REQUEST_FAILED: 'There was an error connecting to the network',

    fallback_message: 'An error has occurred'
  }

}
