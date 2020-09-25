'use strict'
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
class District
{

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  };

  setName(aname) {
   thisname  = aname;
  };

  getWards()
  {
    return this.wards;
  };

  setWards(somewards)
  {
   this. wards = somewards;
  }

  getStreets()
  {
    return this.streets;
  };

  getStreets()
  {
    return this.streets;
  };

  setGroups(somegroups)
  {
    this.groups = somegroups;
  }

  getGroups()
  {
    return this.groups;
  }

}



class Ward
{

  constructor(anid, aname)
  {
    this.WardId = anid;
    this.Name = aname;
    this.KML = "";
    this.Shape = {};
    this.Subwards =[];
  }

}

class Wards
{
  wardlist={};

  constructor(path)
  {
    this.wardlist = this.loadAllWards(path);
  }


  loadAllWards(path)
  {
    var Connect = new XMLHttpRequest();
    Connect.open("GET", path, false);
    Connect.setRequestHeader("Content-Type", "text/xml");
    Connect.send(null);
    var TheDocument = Connect.responseXML;
    var rgroups = TheDocument.getElementsByTagName("ward");
    var wardlist = [];


    for (var i = 0; i < rgroups.length; i++)
    {
      var rgroup = rgroups[i];

      var name = rgroup.getAttribute('Name');
      var wardid = rgroup.getAttribute('WardId');
      let award = new Ward(wardid,name);


        var x = rgroup.getElementsByTagName("kml")[0];
        if (x != undefined) {
          var y = x.childNodes[0];
          var txt = y.nodeValue;
          award.KML = txt;
        }
        var bns = rgroup.getElementsByTagName("bounds")[0];
        if (bns != undefined) {
          var ashape = {};
          ashape.maxlon= parseFloat(bns.getAttribute("maxlon"));
          ashape.minlon=parseFloat(bns.getAttribute("minlon"));
          ashape.maxlat=parseFloat(bns.getAttribute("maxlat"));
          ashape.minlat= parseFloat(bns.getAttribute("minlat"));
          ashape.midlat=(ashape.maxlat + ashape.minlat) / 2;
          ashape.midlon= (ashape.maxlon + ashape.minlon) / 2;

          award.Shape = ashape;
        }
        var swds = rgroup.getElementsByTagName("subward");
        if (swds != undefined) {
          var subwards = [];
        for( var s =0;s<swds.length;s++)
        {
          var swdxml = swds[s];
          var asubward = {};
          asubward.Subwardid=swdxml.getAttribute("Subwardid");
          asubward.Name = swdxml.getAttribute("Name");
          subwards[asubward.Subwardid]=asubward;
        }
        award.Subwards= subwards;

        }
        wardlist[wardid]=award;
    }

    return wardlist;
  }
}

class RoadGroup
{

  // GroupCode = "";
  // DistrictWard = "";
  // SubWard = "";
  // KML = "";
  // Shape = [maxlon: , midlon: , minlon: , maxlat: , midlat: , minlat: ];

}

class RoadGroups
{
  //grouplist = new array();

  constructor(path)
  {
    this.grouplist  = this.loadAllGroups(path);
   }



    loadAllGroups(path)
    {
      let roadgrouplist = [];
      var Connect = new XMLHttpRequest();
      Connect.open("GET", path, false);
      Connect.setRequestHeader("Content-Type", "text/xml");
      Connect.send(null);
      var TheDocument = Connect.responseXML;
      var roadgroups = TheDocument.getElementsByTagName("RoadGroup");
      for (var i = 0; i < roadgroups.length; i++) {
        var roadgroupxml = roadgroups[i];
        var aroadgroup = new RoadGroup();
        aroadgroup.GroupCode = roadgroupxml.getAttribute('Group_code');
        aroadgroup.DistrictWard = roadgroupxml.getAttribute('District_Ward');
        aroadgroup.SubWard = roadgroupxml.getAttribute('Sub_Group');
        var x= roadgroupxml.getElementsByTagName("Principal_Road")[0];
        aroadgroup.PrincipalRoad = x.childNodes[0].nodeValue;
        x= roadgroupxml.getElementsByTagName("Properties")[0];
        aroadgroup.Properties = x.childNodes[0].nodeValue;
        x= roadgroupxml.getElementsByTagName("Electors")[0];
        aroadgroup.Electors = x.childNodes[0].nodeValue;
        x= roadgroupxml.getElementsByTagName("Priority")[0];
        aroadgroup.Priority = x.childNodes[0].nodeValue;
        x= roadgroupxml.getElementsByTagName("Priority_Rank")[0];
        aroadgroup.PriorityRank = x.childNodes[0].nodeValue;
        x= roadgroupxml.getElementsByTagName("County_Division")[0];
        if (x != undefined) {aroadgroup.CountyDivision = x.childNodes[0].nodeValue};
        x = roadgroupxml.getElementsByTagName("kml")[0];
        if (x != undefined) {
          var y = x.childNodes[0];
          var txt = y.nodeValue;
          aroadgroup.KML = txt;
        }
        var bns = roadgroupxml.getElementsByTagName("bounds")[0];
        if (bns != undefined) {
          var ashape = {};
          ashape.maxlon= parseFloat(bns.getAttribute("maxlon"));
          ashape.minlon=parseFloat(bns.getAttribute("minlon"));
          ashape.maxlat=parseFloat(bns.getAttribute("maxlat"));
          ashape.minlat= parseFloat(bns.getAttribute("minlat"));
          ashape.midlat=(ashape.maxlat + ashape.minlat) / 2;
          ashape.midlon= (ashape.maxlon + ashape.minlon) / 2;

          aroadgroup.Shape = ashape;
        }
        roadgrouplist[ aroadgroup.GroupCode  ] =aroadgroup;

      }
      return roadgrouplist;
    }




}

class Streets
{
  //streetlist = new array();

  constructor(path)
  {
    this.streetlist = this.loadAllStreets(path);
  }

  loadAllStreets(path)
  {

    var Connect = new XMLHttpRequest();
    Connect.open("GET", path, false);
    Connect.setRequestHeader("Content-Type", "text/xml");
    Connect.send(null);

    var TheDocument = Connect.responseXML;
    var streets = TheDocument.getElementsByTagName("street");
    let streetlist = [];
    for (var i = 0; i < streets.length; i++)
    {
      var streetxml = streets[i];
      let astreet = new Street();
      astreet.GroupCode = streetxml.getAttribute('Group_code');
      astreet.Name = streetxml.getAttribute('Street');
      astreet.Households = streetxml.getAttribute('Households');
      astreet.PollingDistrict = streetxml.getAttribute('PD');
      streetlist.push(astreet);
    }
    return streetlist;
  }


}

class Street
{
  // Name = "";
  //  Part = "";
  //  PollingDistrict = "";
  //  Households = 0;
  //   Electors = 0;
  // StreetGroup = "";
}


