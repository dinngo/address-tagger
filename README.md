# Address Tagger - Chrome Extension

### Introduction

Address Tagger is a very handy tooltip written in javascript that allows you to automatically verify wallet addresses through a personal/organization wallet address book. 

It does this through a wallet address book function which allows you to assign aliases to addresses. It displays the wallet alias when you select or hover over an address so that you can clearly see who owns the address.

###  Benefits

Some of the benefits of using Address Tagger

- Fast initial setup
- Automatically verify & display the alias of noted wallet addresses
- Easily organize personal/organizational wallet address books
- Reduces the chance of sending tokens to the wrong address
- Increases transparency 

### Background & use case

As an example, when using GnosisSafe to execute transactions with multisig wallets, we used to cross-check a wallet address book in an excel sheet to map a person with a wallet. Not only does it take time, but it also increases operational risk. By building Address Tagger, we can simplify the process and reduce risk.

Address Tagger is simple to use, and no longer requires us to manually check an excel sheet. All we need to do to verify is mouse over an address to see the name assigned to the wallet address.

For example, there are two addresses - Alice’s & Bob’s.

- Address A: 0xABCDEFGHIJKLMNOPQRSTUVWXYZ
- Address B: 0xZYXWVUTSRQPONMLKJIHGFEDCBA

In order to distinguish these two wallets, Carol can assign address A an alias, such as Alice's wallet, and address B, as Bob's wallet. Whenever Carol selects address A on a page, it will appear as ‘Alice's wallet’.

### Usage

- Go to brave://extensions/ or chrome://extensions/
- Enable `Developer mode`
- Click `Load unpacked`
- Select this folder
- Done
