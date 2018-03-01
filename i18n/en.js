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
    account_created: 'Account initialised',
    signer_created: 'Account set up',
    account_credited: 'Received funds'
  },

  errors: {
    NO_INTERNET: 'You are not connected to internet',
    REQUEST_FAILED: 'There was an error connecting to the network',

    fallback_message: 'An error has occurred'
  }

}
