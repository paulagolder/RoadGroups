
class District
{

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setName(aname) {
    this.name  = aname;
  }

  getWards()
  {
    return this.wards;
  }

  setWards(somewards)
  {
    this. wards = somewards;
  }

  getStreets()
  {
    return this.streets;
  }

  setStreets(streetlist)
  {
    this.streets  = streetlist;
  }

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


  constructor(path)
  {
    var Connect = new XMLHttpRequest();
    Connect.open("GET", path, false);
    Connect.setRequestHeader("Content-Type", "text/xml");
    Connect.send(null);
    var TheDocument = Connect.responseXML;
    var wardsxml = TheDocument.getElementsByTagName("ward");
    for (var i = 0; i < wardsxml.length; i++)
    {
      var wardxml = wardsxml[i];
      var name = wardxml.getAttribute('Name');
      var wardid = wardxml.getAttribute('WardId');
      let award = new Ward(wardid,name);
      award.Households =     wardxml.getAttribute('Households');
      award.KML = this.makeKML(wardxml);
      award.Shape = this.makeShape(wardxml);
      award.Subwards=new Subwards(wardxml);
      this[award.WardId]=award;
    }

  }




  makeKML(wardxml)
  {
    var x = wardxml.getElementsByTagName("kml")[0];
    if (x !== undefined)
    {
      var y = x.childNodes[0];
      var txt = y.nodeValue;
      return txt;
    }
    return null;
  }

 makeShape(wardxml)
  {
    var bns = wardxml.getElementsByTagName("bounds")[0];
    if (bns !== undefined)
    {
      var ashape = {};
      ashape.maxlon= parseFloat(bns.getAttribute("maxlon"));
      ashape.minlon=parseFloat(bns.getAttribute("minlon"));
      ashape.maxlat=parseFloat(bns.getAttribute("maxlat"));
      ashape.minlat= parseFloat(bns.getAttribute("minlat"));
      ashape.midlat=(ashape.maxlat + ashape.minlat) / 2;
      ashape.midlon= (ashape.maxlon + ashape.minlon) / 2;
      return ashape;
    }
    return null;
  }
}


class Subwards
{

  constructor(wdxml)
  {
      var swds = wdxml.getElementsByTagName("subward");
      if (swds !== undefined)
      {
        for( var s =0;s<swds.length;s++)
        {
          var swdxml = swds[s];
          var asubward = new Subward(swdxml);
          this[asubward.SubwardId]=asubward;
        }
      }
    }
}


class Subward
{
  constructor ( swdxml )
  {
    this.SubwardId=swdxml.getAttribute("SubwardId");
    this.Name = swdxml.getAttribute("Name");
    this.Households = swdxml.getAttribute("Households");
    this.Roadgroups=new RoadGroups(swdxml);
  }
}




class RoadGroup
{
   constructor(rgxml)
   {
     this.RoadgroupId=rgxml.getAttribute("RoadgroupId");
     this.Name = rgxml.getAttribute("Name");
     this.Households = rgxml.getAttribute("Households");
     this.Streets = new Streets(rgxml);
    }
}

class RoadGroups
{

  constructor(swdxml)
  {
    var rgsxml = swdxml.getElementsByTagName("roadgroup");
    if (rgsxml !== undefined)
    {
      for( var r =0;r<rgsxml.length;r++)
      {
        var rgxml = rgsxml[r];
        var aroadgroup = new RoadGroup(rgxml);
        this[aroadgroup.RoadgroupId]=aroadgroup;
      }
    }
  }
}

class Streets
{

  constructor(rgxml)
  {
    var stsxml = rgxml.getElementsByTagName("street");
    if (stsxml !== undefined)
    {
      for( var t =0;t<stsxml.length;t++)
      {
        var stxml = stsxml[t];
        var astreet = new Street(stxml);
        this[astreet.makeId()]=astreet;
      }
    }
  }


}

class Street
{
  constructor(stxml)
  {
     this.Name = stxml.getAttribute("Name");
     this.Part = stxml.getAttribute("Part");
     this.Households = stxml.getAttribute("Households");
  }

  makeId()
  {
    if(this.part !== undefined)
    {
      return this.Name+"/"+this.part;
    }
    else
    {
       return this.Name;
    }

  }
}


