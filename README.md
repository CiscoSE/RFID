# RFID
[![published](https://static.production.devnetcloud.com/codeexchange/assets/images/devnet-published.svg)](https://developer.cisco.com/codeexchange/github/repo/CiscoSE/RFID)

## Introduction
This use case aims to show the ability of a Cisco Endpoint to be used to provide access control with an RFID card reader. When an employee swipes their card, the device unlocks and allows them to place calls, whiteboard, etc. It also allows them to quickly join their personal rooms with the touch of a button. If an IT personnel swipes their card, the device not only unlocks, but also gives full access to settings. In both cases, when a user logs out, the device locks again.

## Table of contents
* [Components](#components)
* [Prerequisite](#Prerequisite)
* [Setup](#setup)


## Components
* Any Cisco Video Endpoint with a Touch 10 panel or a Dx80. For more information on supported devices visit:   https://help.webex.com/en-us/n18glho/In-Room-Controls-and-Use-of-an-External-Video-Switch-with-Room-Devices
* An RFID card reader. The code developed using the following card reader: https://www.amazon.in/dp/B01F3FRIOC/ref=cm_sw_r_cp_api_i_2PJ.CbB4HFG79

## Prerequisite
* You must have admin access to the Cisco Endpoint.

## Setup
To run this project, complete the following steps:

### Step 1
Clone the repository on your computer using the following command
```
$ git clone https://github.com/CiscoSE/RFID.git
```
### Step 2
Access the admin panel of the device, and upload the script [macro.js](./macro.js) as a new macro.

### Step 3
Make changes to the card numbers and personal meetings rooms in the variable **personalRooms**

### Step 4
Start the script. Once you swipe a card, the respective level of access to the device is given. Users can quickly join their personal meeting rooms with a touch of the pmr button. If the card belongs to a user from the IT department(card number 0008731543), it even unlocks the settings panel.
