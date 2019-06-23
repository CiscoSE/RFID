/*

Copyright (c) 2019 Cisco and/or its affiliates.

This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at

               https://developer.cisco.com/docs/licenses

All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.

*/

const xapi = require('xapi');

var cardnumber = "";
var activecard="";

var startTime=1561103288822;
var currTime="";

var personalRooms={
  "0009213811": "stevabra@acecloud.webex.com",
  "0008731543": "",
  "0008719067": "stevenwebexteams@collaborationgdc.webex.com"
}

function mapper(key){
  switch(key){
    case "KEY_0":
      return "0";
    case "KEY_1":
      return "1";
    case "KEY_2":
      return "2";
    case "KEY_3":
      return "3";
    case "KEY_4":
      return "4";
    case "KEY_5":
      return "5";
    case "KEY_6":
      return "6";
    case "KEY_7":
      return "7";
    case "KEY_8":
      return "8";
    case "KEY_9":
      return "9";
  }
}

function stitcher(number){
  cardnumber=cardnumber+number;
}


function unlock(){
  console.log(cardnumber);
}

function getPersonalRoom(number){
   return personalRooms[number];
}

function clearScreen(){
   xapi.command("UserInterface Message TextLine Display", {'Text': "Swipe your card to Begin", "X":5000, "Y":8000, "Duration": 0})
   xapi.config.set("UserInterface Features HideAll", "True")
   xapi.command("UserInterface Extensions Panel Remove",{"PanelId": "panel_3"})
   xapi.command("UserInterface Extensions Panel Remove",{"PanelId": "panel_4"})
}

function buildScreen(){
    xapi.command("UserInterface Message TextLine Clear")
    xapi.config.set("UserInterface Features HideAll", "False")
    xapi.config.set("UserInterface Features Call Start", "Auto")
    xapi.command('UserInterface Extensions Set', {
      ConfigId: 'AdvancedSettings',
      'body': "<Extensions><Version>1.5</Version><Panel><PanelId>panel_3</PanelId><Type>Home</Type><Icon>Webex</Icon><Order>1</Order><Color>#07C1E4</Color><Name>Personal Room</Name><Page><Name>Personal Room</Name><Row><Name>Joining your personal Room</Name></Row><PageId>personalRoomButton</PageId><Options/></Page></Panel><Panel><PanelId>panel_4</PanelId><Type>Home</Type><Icon>Power</Icon><Order>2</Order><Color>#FF3D67</Color><Name>Logout</Name><Page><Name>Log Out</Name><Row><Name>Log Out</Name></Row><PageId>logoutButton</PageId><Options/></Page></Panel></Extensions>"
  });

}



clearScreen()
xapi.command("UserInterface Message TextLine Display", {'Text': "Swipe your card to Begin", "X":5000, "Y":7500, "Duration": 0})


if(Date.now()-startTime>300000)
  console.log("crossed 5 mins")
else
 console.log("not yet 5")

xapi.event.on('UserInterface InputDevice Key Action', (event) => {

  if(event.Type=="Pressed"&&event.Key!="KEY_ENTER"){
      var number = mapper(event.Key);
      stitcher(number)
  }

  if(event.Key=="KEY_ENTER"&&event.Type=="Pressed"){
      activecard=cardnumber
      cardnumber=""
      console.log(activecard);
      buildScreen();
      //check for IT card
      if(activecard=="0008719067"){
        xapi.command("UserInterface Message TextLine Display", {'Text': "Hello Steven", "X":5000, "Y":7500, "Duration": 3})
      }
      if(activecard=="0008731543"){
        xapi.config.set('UserInterface SettingsMenu Visibility',"Auto");
        xapi.command("UserInterface Message TextLine Display", {'Text': "Hello IT personnel", "X":5000, "Y":7500, "Duration": 3})
      }
      else
        xapi.config.set('UserInterface SettingsMenu Visibility',"Hidden");

  }

})



//one button to personal room
xapi.event.on('UserInterface Extensions Page Action', (event) => {
   if(event.Type == 'Opened' && event.PageId == 'personalRoomButton'){

      xapi.command('Dial', {'Number': getPersonalRoom(activecard)});
   }
})

//logout
xapi.event.on('UserInterface Extensions Page Action', (event) => {

   if(event.Type == 'Opened' && event.PageId == 'logoutButton'){
    //xapi.command("UserInterface Extensions Panel Save", {"PanelId": "panel_4"})

    //xapi.command("UserInterface Message TextLine Display", {'Text': "Swipe your Access card to Begin", "X":5000, "Y":7000, "Duration": 0})
    //xapi.config.set("UserInterface Features Call Start", "Hidden")
    clearScreen();
    xapi.config.set('UserInterface SettingsMenu Visibility',"Hidden");
    // if(cardnumber!="0008731543"){
    // xapi.command('Phonebook Search', {'PhonebookId': '1', 'Tag': 'Favorite'}).then((favs) => {
    //   favorites[cardnumber]=[];
    //   var contactIds=[];
    //   favs.Contact.forEach(element => {
    //     favorites[cardnumber].push({"Name":element.Name, "Number": element.ContactMethod[0].Number})
    //   });

    //   favs.Contact.forEach(element => {
    //     contactIds.push(element.ContactId)
    //   });

    //   contactIds.forEach(element => {
    //     xapi.command('Phonebook Contact Delete',{"ContactId": element});
    //   })

    //   cardnumber="";
    // });
    // }
    // else
    //   cardnumber="";


        }
});

//UserInterface Features


  // xapi.command("UserInterface Message TextLine Display", {'Text': "asdas", "X":5000, "Y":7000, "Duration": 5})
  //xapi.command("UserInterface Message TextLine Clear")

  //remove call button     xapi.config.set("UserInterface Features Call Start", "Auto/Hidden")
  //remove all default buttons xapi.config.set("UserInterface Features HideAll", "False/True")
