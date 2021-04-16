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
    this.rggroups = new Rggroups(edxml);
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

class Rggroups
{

  constructor(edxml)
  {

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
      arggroup.Bounds = JSON.parse(bnds);
      arggroup.Rgsubgroups = new Rgsubgroups(arggroupxml);
      this[arggroup.RggroupId] = arggroup;
    }

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
    this.Households = swdxml.getAttribute("Households");
    this.Roadgroups = new RoadGroups(swdxml);
    this.Bounds = JSON.parse(swdxml.getAttribute('Bounds'));
  }
}




class RoadGroup {
  constructor(rgxml) {
    this.RoadgroupId = rgxml.getAttribute("RoadgroupId");
    this.Name = rgxml.getAttribute("Name");
    this.Households = rgxml.getAttribute("Households");
    this.KML = rgxml.getAttribute("KML");
    this.Streets = new Streets(rgxml);
  }
}

class RoadGroups {

  constructor(swdxml) {
    var rgsxml = swdxml.getElementsByTagName("roadgroup");
    if (rgsxml !== undefined) {
      for (var r = 0; r < rgsxml.length; r++) {
        var rgxml = rgsxml[r];
        var aroadgroup = new RoadGroup(rgxml);
        this[aroadgroup.RoadgroupId] = aroadgroup;
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
  }

  makeId() {
    if (this.part !== undefined) {
      return this.Name + '/' + this.part;
    } else {
      return this.Name;
    }

  }
}
