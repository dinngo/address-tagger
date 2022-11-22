# Address Tagger

### Introduction

Address Tagger is a very handy tooltip written in javascript that allows you to automatically verify the wallet addresses and their holders through a personal/organization wallet address book.

Address Tagger offers a wallet address book function where you can assign aliases to addresses. It will display the wallet alias when you select or hover over an address so that you can clearly see who owns the address.

### tl;dr Benefits

Some of the benefits of using Address Tagger

- Fast initial setup
- Automatically verify & display the alias of noted wallet addresses
- Easily organize a personal/organization wallet address book

### Background & use case

When using GnosisSafe to execute transactions with multi-sig wallets, we used to cross-check a wallet address book in an excel sheet to map a person with a wallet. Not only does it take time, but it also brings up operational risk. By building Address Tagger, we hoped to simplify the process and reduce risk.

Address Tagger is simple to set up, and you no longer need to manually check an excel sheet, since all you need to do is mousing over an address to see the name you gave to the wallet address.
For example, there’re two addresses - Alice’s & Bob’s.

Address A: 0xABCDEFGHIJKLMNOPQRSTUVWXYZ
Address B: 0xZYXWVUTSRQPONMLKJIHGFEDCBA

In order to distinguish these two wallets, Carol can assign address A an alias, such as Alice's wallet, and address B, such as Bob's wallet. Whenever Carol selects address A on a page, it will appear as "Alice's wallet."

### Usage

- Go to brave://extensions/ or chrome://extensions/
- Enable `Developer mode`
- Click `Load unpacked`
- Select this folder
- Done
