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
      }
    },

    common: {
      close: 'Close',
      status: 'Status'
    }

  },

  onboard: {
    header: 'Add Account',
    new_caption: 'An account can be created for you on the Stellar network. It is free, but a small minimum balance of 5 XLM must be in the account for you to be able to use it.',
    private_key_caption: 'An account is similar to a traditional bank\'s account in that it holds funds and allows you to send and receive them.',
    existing_key_message: 'If you have an existing private key, you can input it here to load it into Interstellar.',
    add_btn: 'Add account'
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

  effects: {
    create_account: 'Account initialised',
    account_credited: 'Received {{amount}} {{assetAbbreviation}} from {{truncFrom}}',
    account_debited: 'Sent {{amount}}{{assetAbbreviation}} to {{truncTo}}'
  },

  errors: {
    NO_INTERNET: 'You are not connected to internet',
    REQUEST_FAILED: 'There was an error connecting to the network',

    fallback_message: 'An error has occurred'
  }

}
