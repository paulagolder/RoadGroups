class Delivery
{

  constructor(path)
  {
    var Connect = new XMLHttpRequest();
    Connect.open("GET", path, false);
    Connect.setRequestHeader("Content-Type", "text/xml");
    Connect.send(null);
    var TheDocument = Connect.responseXML;
    var edxml = TheDocument.documentElement;
    this.name = edxml.getAttribute('Name');
    this.deliveryid = edxml.getAttribute('DeliveryId');
    this.KML = edxml.getAttribute('KML');
    this.rggroups =[];
    this.Bounds = new Bounds();
    var arggroupsxml = edxml.getElementsByTagName("rggroup");
    for (var i = 0; i < arggroupsxml.length; i++)
    {
      var arggroupxml = arggroupsxml[i];
      var name = arggroupxml.getAttribute('Name');
      var arggroupid = arggroupxml.getAttribute('RggroupId');
      let arggroup = new Rggroup(arggroupid, name);
      arggroup.Households = arggroupxml.getAttribute('Households');
      arggroup.KML =  arggroupxml.getAttribute('KML');
      var bnds = arggroupxml.getAttribute('Bounds');
      arggroup.Bounds = JSON.parse(bnds,true);
      this.Bounds.expandbounds(arggroup.Bounds);
      arggroup.Rgsubgroups = new Rgsubgroups(arggroupxml);
      this.rggroups[arggroup.RggroupId] = arggroup;
    }
  }

  getName() {
    return this.name;
  }

  setName(aname) {
    this.name = aname;
  }

  getDeliveryId() {
    return this.DeliveryId;
  }

  setDeliveryId(aname) {
    this.DeliveryId = aname;
  }

  getKML() {
    return this.KML;
  }

  setKML(aname) {
    this.KML = aname;
  }


  getRggroups() {
    return this.arggroups;
  }

  setRggroups(somearggroups) {
    this.arggroups = somearggroups;
  }

  makeKML(arggroupxml) {
    var x = arggroupxml.getElementsByTagName("kml")[0];
    if (x !== undefined) {
      var y = x.childNodes[0];
      var txt = y.nodeValue;
      return txt;
    }
    return null;
  }




}



class Rggroup
{

  constructor(anid, aname) {
    this.RggroupId = anid;
    this.Name = aname;
    this.KML = "";
    this.Bounds = {};
    this.Rgsubgroups = [];
  }




}



class Rgsubgroups {

  constructor(wdxml) {
    var swds = wdxml.getElementsByTagName("rgsubgroup");
    if (swds !== undefined) {
      for (var s = 0; s < swds.length; s++) {
        var swdxml = swds[s];
        var argsubgroup = new Rgsubgroup(swdxml);
        this[argsubgroup.RgsubgroupId] = argsubgroup;
      }
    }
  }
}


class Rgsubgroup {
  constructor(swdxml) {
    this.RgsubgroupId = swdxml.getAttribute("RgsubgroupId");
    this.Name = swdxml.getAttribute("Name");
    if(this.Name=='') this.Name= this.RgsubgroupId;
    this.Households = swdxml.getAttribute("Households");
    this.Rounds = new Rounds(swdxml);
    var bnds = swdxml.getAttribute('Bounds');
    this.Bounds = JSON.parse(bnds,true);
  }
}




class Round {
  constructor(rgxml) {
    this.RoundId = rgxml.getAttribute("RoundId");
    this.Name = rgxml.getAttribute("Name");
     this.Label = rgxml.getAttribute("Label");
    this.Households = rgxml.getAttribute("Households");
    this.KML = rgxml.getAttribute("KML");

    var bnds = rgxml.getAttribute('Bounds');
    if(bnds) this.Bounds = JSON.parse(bnds,true);
    this.Streets = new Streets(rgxml);
  }
}

class Rounds {

  constructor(swdxml) {
    var rgsxml = swdxml.getElementsByTagName("round");
    if (rgsxml !== undefined) {
      for (var r = 0; r < rgsxml.length; r++) {
        var rgxml = rgsxml[r];
        var around = new Round(rgxml);
        this[around.Label] = around;
      }
    }
  }
}

class Streets {

  constructor(rgxml) {
    var stsxml = rgxml.getElementsByTagName("street");
    if (stsxml !== undefined) {
      for (var t = 0; t < stsxml.length; t++) {
        var stxml = stsxml[t];
        var astreet = new Street(stxml);
        this[astreet.makeId()] = astreet;
      }
    }
  }


}

class Street {
  constructor(stxml) {
    this.Name = stxml.getAttribute("Name");
    this.Part = stxml.getAttribute("Part");
    this.Households = stxml.getAttribute("Households");
    this.Qualifier = stxml.getAttribute("Qualifier");
    this.Note = stxml.getAttribute("Note");
  }

  makeId() {
    if (this.part !== undefined) {
      return this.Name + '/' + this.part;
    } else {
      return this.Name;
    }

  }
}

class Bounds{

  constructor()
  {
    this.bounds = {};
    this.bounds.dist = -1;
    this.bounds.maxlat = null;
    this.bounds.maxlong = null;
    this.bounds.minlat = null;
    this.bounds.minlong = null;
  }


  expandbounds(bounds)
  {
    if(this.bounds.minlat === null)  this.bounds.minlat =  bounds.minlat;
    if(this.bounds.maxlong === null)  this.bounds.maxlong =  bounds.maxlong;
    if((bounds.minlat !== null) && (this.bounds.minlat >  bounds.minlat)) this.bounds.minlat = bounds.minlat;
    if((bounds.maxlong !== null) && (this.bounds.maxlong <  bounds.maxlong)) this.bounds.maxlong = bounds.maxlong;
    if(this.bounds.maxlat === null)  this.bounds.maxlat =  bounds.maxlat;
    if(this.bounds.minlong === null)  this.bounds.minlong =  bounds.minlong;
    if((bounds.maxlat !== null) && ( this.bounds.maxlat < bounds.maxlat))  this.bounds.maxlat= bounds.maxlat;
    if((bounds.minlong !== null) && ( this.bounds.minlong > bounds.minlong))  this.bounds.minlong = bounds.minlong;
  }


}
