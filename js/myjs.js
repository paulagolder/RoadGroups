
function makePageheader()
{
  var outstring = "";
  outstring +='<div class="routbutton right"><a href="./#rggroups"  class="routebutton" data-role="button" data-inline="true" data-mini="true">';
  outstring += window.Delivery.name;
  outstring += "</a></div>";
  return outstring;
}

function showrggroups()
{
  var allgroups = window.Rggroups;
  var outstring = "";
  outstring += "<div class='list'> ";
  var c = 0;
  for (var rggroupid in allgroups) {
    var rggroup = allgroups[rggroupid];
    var style ="";
    if (rggroup.KML)
    {
      var style =" style =\"background-color: "+ window.colors[c] + ";\"";
      c++;
    }

    outstring += "<div class='row' ><div class='pbutton' "+style+ " ><a class=\"button\" href=\"./#rggroup\" data-role=\"button\"  data-mini=\"true\"  ";
    outstring += " onclick=\"changeMypage( 'rggroup',\'" + rggroupid + "\'); \" >" + rggroupid + "</a></div>";


    outstring += "<div>" + rggroup.Name + "</div>";
    outstring += "</div>";
  }
  outstring += "</div>";
  return outstring;
}


function showrggroup() {
  var wdid = window.rggroupid;
  var arggroup = window.Rggroups[wdid];
  var rgsubgroups = arggroup.Rgsubgroups;
  var roadgroupcount = 0;
  var households = 0;
  for (var argsubgroupid in rgsubgroups) {
    var argsubgroup = rgsubgroups[argsubgroupid];
    for (var groupid in argsubgroup.Roadgroups) {
      roadgroupcount++;
      var hh = parseInt(argsubgroup.Roadgroups[groupid].Households);
      if(!isNaN(hh))
      {
        households = households + hh;
      }
    }
  }
  var c = 0;
  var outstring = "<div class='heading' ><div>" + arggroup.RggroupId + "</div><div >" + arggroup.Name + "</div>";
  outstring += "<div class=\"hh\">" + households + " HH</div>";
  outstring += "<div class=\"rg\">" + roadgroupcount + " RoadGroups </div>";
  outstring +="</div>";
  outstring += "<div class='list'> ";

  for (var argsubgroupid in rgsubgroups)
  {
    var roadgroupcount = 0;
    var households = 0;
    var argsubgroup = rgsubgroups[argsubgroupid];
    for (var groupid in argsubgroup.Roadgroups)
    {
      roadgroupcount++;
      var hh = parseInt(argsubgroup.Roadgroups[groupid].Households);
      if(!isNaN(hh))
      {
        households = households + hh;
      }
    }
    outstring += "<div class='row'>";
    outstring += "<div class=\"button\" style='background-color:" + window.colors[c] + ";' >";
    outstring += "<a class=\"button\" href=\"#\" data-role=\"button\"  data-mini=\"true\" data-iconpos=\"right\" ";
    outstring += " onclick=\"changeMypage('rgsubgroup',\'" + argsubgroup.RgsubgroupId + "\'); \" >" + argsubgroup.Name + "</a></div>";
    outstring += "<div class=\"hh\">" + households + " HH</div>";
    outstring += "<div class=\"rg\">" + roadgroupcount + " RoadGroups </div>";
    outstring += "</div>";
    c++;
  }
  outstring += "</div>";
  return outstring;
}

function showrgsubgroup() {
  var wdid = window.rggroupid;
  var arggroup = window.Rggroups[wdid];
  var rgsubgroupid = window.rgsubgroupid;
  var argsubgroup = arggroup.Rgsubgroups[rgsubgroupid];
  var grouplist = argsubgroup.Roadgroups;
  var roadgroupcount = 0;
  var households = 0;

  for (var groupid in argsubgroup.Roadgroups) {
    roadgroupcount++;
    var hh = parseInt(argsubgroup.Roadgroups[groupid].Households);
    if(!isNaN(hh))
    {
      households = households + hh;
    }
  }

  var outstring = "<div class='heading' ><div>" + argsubgroup.RgsubgroupId + "</div>";
  outstring += '<div class="routebutton" ><a href="#rggroup"  class="routebutton" data-role="button" data-inline="true" data-mini="true">'+arggroup.Name +'</a></div>';
  outstring += "<div>" + argsubgroup.Name + "</div>";
  outstring += "<div class=\"hh\">" + households + " HH</div>";
  outstring += "<div class=\"rg\">" + roadgroupcount + " RoadGroups </div>";
  outstring += "</div>";
  outstring += "<div class='list'   >";
  window.sliplist =[];
  var c = 0;
  for (var index in grouplist) {
    window.sliplist.push(index);
    var agroup = grouplist[index];
    outstring += "<div class='row' >";
    outstring += "<div style='background-color:" + window.colors[c] + ";' >";
    outstring += " <a class=\"button\" href=\"#\" data-role=\"button\"  data-mini=\"true\" data-iconpos=\"right\" ";
    outstring += " onclick=\"changeMypage( 'roadgroup',\'" + agroup.RoadgroupId + "\'); \" >" + agroup.RoadgroupId + "</a></div>";
    outstring += "<div class=\"name\">" + agroup.Name + "</div>";
    outstring += "<div class=\"hh\">" + agroup.Households + " HH</div>";
    outstring += "<div>" + "<input class=\"printcheckbox\" type=\"checkbox\" id=\"printlist\" name=\"printlist\" value='" + agroup.RoadgroupId + "'></div>";
    outstring += "</div>";
    c++;
  }
  outstring += "  <div></div>";
  return outstring;
}


function showroadgroup() {
  var wdid = window.rggroupid;
  var arggroup = window.Rggroups[wdid];
  var rgsubgroupid = window.rgsubgroupid;
  var argsubgroup = arggroup.Rgsubgroups[rgsubgroupid];
  var grouplist = argsubgroup.Roadgroups;
  var aroadgroup = grouplist[window.roadgroupid];
  var outstring = "";
  if(!aroadgroup)
  {
    outstring += "<div class='upperheading' ><div> RoadGroup:" + window.roadgroupid+" not found </div></div>";
    return outstring;
  }
  outstring += "<div class='upperheading' ><div> RoadGroup:" + aroadgroup.RoadgroupId +":"+aroadgroup.Name+" (HH:" + aroadgroup.Households + ")</div></div>";
  outstring += "<div class='lowerheading' >";
  outstring += '<div class="routebutton" ><a href="#rggroup"  class="routebutton" data-role="button" data-inline="true" data-mini="true">'+arggroup.Name +'</a></div>';
  outstring += '<div class="routebutton" ><a href="#rgsubgroup"  class="routebutton" data-role="button" data-inline="true" data-mini="true">'+argsubgroup.Name +'</a></div>';
  outstring += "</div>";

  outstring += "<div  class='streetlist' >";
  var streets = aroadgroup.Streets;
  var streetcount = Object.keys(streets).length
  var lc=Math.ceil(streetcount/7);

  var nl=0;
  for (var streetid in streets)
  {
    var street = streets[streetid];
    var streetname = street.makeId();
    var note = street.Qualifier;
    var households = street.Households;
    if(nl ==0) outstring += " <div  class='streetrow"+lc+"' >" ;
    outstring += " <div>" + streetname +  "</div>";
    nl++;
    if(nl ==lc)
    {
      outstring += " </div>" ;
      nl=0;
    }

  }
  outstring += "</div>";
  outstring += "<div  class='partlist' >";
  var streets = aroadgroup.Streets;
  for (var streetid in streets)
  {
    var street = streets[streetid];
    var streetname = street.makeId();
    var note = street.Qualifier;
    var households = street.Households;
    if(note && note.length >2)
      outstring += " <div>" + streetname +":"+note+"</div>";
  }
  outstring += "</div>";
  return outstring;
}

function CheckUrl(url) {
  var http = null;
  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    http = new XMLHttpRequest();
  } else { // code for IE6, IE5
    http = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (http !== null) {
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
  } else
    return false;
}

function mymappera(mymap)
{
  mapLink ='<a href="http://openstreetmap.org">OpenStreetMap</a>';
  L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 20, minZoom: 10,
    }).addTo(mymap);

    setTimeout(function() { mymap.invalidateSize();}, 1200);
    return mymap;
}

function addMyKML(mymap, kmlfile, style)
{

  var kmllayer = new L.KML(kmlfile, { async: true });
  kmllayer.on("loaded", function(e)
  {
    kmllayer.setStyle( style);
    mymap.addLayer(kmllayer);
   // mymap.fitBounds(e.target.getBounds(), {
   //   padding: [5, 5],
   // });
    kmllayer.addTo(mymap);
    // kmllayer.bindPopup(label);
  });

  return kmllayer;
}

function addMyKML2(mymap, kmlfile, style, label='')
{

  var runLayer = omnivore.kml(kmlfile)
  .on('ready', function() {

    runLayer.eachLayer(function(layer) {
      runLayer.bindPopup(layer.feature.properties.name);
      runLayer.setStyle( style);
    });

  })
  .addTo(mymap);

  return runLayer;
}


function makeKMLLayer(amap,kmlfilepath,style, fitbounds=false, label='')
{
  var track =null;
  fetch(kmlfilepath).then(res => res.text()).then(kmltext =>
  {
    const parser = new DOMParser();
    const kml = parser.parseFromString(kmltext, 'text/xml');
    track = new L.KML(kml);
    track.setStyle(style);
    amap.addLayer(track);
    if(fitbounds)
    {
   //   const bounds = track.getBounds();
  //    amap.fitBounds(bounds);
    }
    track.bindPopup(label);
  });
  return track;
}


function setBounds(amap, mybounds)
{
  if(!mybounds) return;
  if(!mybounds.maxlat) return;
  var bounds =[];

  bounds.push([ mybounds.maxlat, mybounds.minlong]);
  bounds.push([ mybounds.maxlat,mybounds.maxlong]);
  bounds.push([ mybounds.minlat,mybounds.maxlong]);
  bounds.push([ mybounds.minlat,mybounds.minlong]);
  bounds.push([ mybounds.maxlat, mybounds.minlong]);
  amap.fitBounds(bounds, { padding: [20, 20] });
}

function drawBox(amap,mybounds)
{
var bounds =[];
bounds.push([ mybounds.maxlat, mybounds.minlong]);
bounds.push([ mybounds.maxlat,mybounds.maxlong]);
bounds.push([ mybounds.minlat,mybounds.maxlong]);
bounds.push([ mybounds.minlat,mybounds.minlong]);
bounds.push([ mybounds.maxlat, mybounds.minlong]);
var polyline = L.polyline(bounds).addTo(amap);
}


function setMarkers(amap,amybounds)
{
  var mybounds = amybounds;
  var nwlat =  mybounds.maxlat;
  var nwlong =  mybounds.minlong;
  var marker = L.marker([nwlat, nwlong]).addTo(amap);
  var selat =  mybounds.minlat;
  var selong =  mybounds.maxlong;
  marker = L.marker([selat, selong]).addTo(amap);
  marker = L.marker([selat, nwlong]).addTo(amap);
  marker = L.marker([nwlat, selong]).addTo(amap);
}

function setScrollHeight() {
  var wo = window.orientation;
  var height = $(window).width();

  if (wo === undefined) {
    height = $(window).height();
  } else {
    height = $(window).width();
    if (wo === 0 || wo == 180) height = $(window).height();
  }
  height = height - 200;
}

var copyToClipboard = (function() {
  var _dataString = null;
  document.addEventListener("copy", function(e) {
    if (_dataString !== null) {
      try {
        e.clipboardData.setData("text/plain", _dataString);
        e.preventDefault();
      } finally {
        _dataString = null;
      }
    }
  });
  return function(data) {
    _dataString = data;
    document.execCommand("copy");
  };
})();

function addBounds(abounds, bbounds) {
  if (abounds.contains(L.point(0, 0, true))) {
    abounds = bbounds;
  } else {
    abounds.extends(bbounds.getBottomLeft());
    abounds.extends(bbounds.getBottomRight());
    abounds.extends(bbounds.getTopLeft());
    abounds.extends(bbounds.getTopRight());
  }
}


function doSearch() {
  var searchfield = document.getElementById('searchfield').value;
  searchfield = searchfield.toLowerCase();
  var foundlist = [];
  for (var rggroupid in window.Rggroups) {
    var arggroup = window.Rggroups[rggroupid];
    var rgsubgroups = arggroup.Rgsubgroups;
    for (var argsubgroupid in rgsubgroups) {
      var argsubgroup = rgsubgroups[argsubgroupid];
      var rgrouplist = argsubgroup.Roadgroups;
      for (var index in rgrouplist) {
        var aroadgroup = rgrouplist[index];
        var streets = aroadgroup.Streets;
        for (var streetid in streets) {
          var astreet = streets[streetid];
          if (astreet.Name.toLowerCase().includes(searchfield))
          {
            astreet.roadgroupid = aroadgroup.RoadgroupId;
            astreet.rgsubgroupid = argsubgroupid;
            astreet.rggroupid = rggroupid;
            foundlist.push(astreet);
          }
        }
      }
    }
  }
  if (foundlist.length == 1) {
    var fstreet = foundlist[0];
    var roadgroupid = fstreet.roadgroupid;
    window.rggroupid = fstreet.rggroupid;
    window.rgsubgroupid = fstreet.rgsubgroupid;
    window.roadgroupid = roadgroup;
    changeMypage("roadgroup", roadgroupid);
    clearSearch();
  } else if (foundlist.length < 1) {
    alert(" No Match found: try another street name ");
  } else if (foundlist.length < 8) {
    var text = "Too many matches found " + "\n";
    for (var n = 0; n < foundlist.length; n++) {
      text += foundlist[n].Name + "\n";
    }
    alert(text);
  } else {
    alert("too many matches found" + '\n' +
    " give more detail" + '\n'
    );
  }
}

function clearSearch() {

  document.getElementById("searchfield").value = "";
}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
}

function is_browser_gps_capable()
{
  return false;
}

/*
 * function is_browser_gps_capable()
 * {
 * var _locator_object;
 * try
 * {
 * _locator_object = navigator.geolocation;
 * }
 * catch (e)
 * {
 * return false;
 *
 * }
 * if (_locator_object)
 *  return true;
 * else
 *  return false;
 * }
 */


function watchLocation(successCallback, errorCallback) {
  successCallback = successCallback || function() {};
  errorCallback = errorCallback || function() {};


  // Try HTML5-spec geolocation.
  var geolocation = navigator.geolocation;

  function handleSuccess(position) {
    successCallback(position.coords);
  }
  if (geolocation) {
    // We have a real geolocation service.
    try {
      handleSuccess(position);


      geolocation.watchPosition(handleSuccess, errorCallback, {
        enableHighAccuracy: true,
        maximumAge: 5000 // 5 sec.
      });
    } catch (err) {
      errorCallback();
    }
  } else {
    errorCallback();
  }
}

function pdfout(mode)
{
  var rggid = window.rggroupid;
  var arggroup = window.Rggroups[rggid];
  var argsubgroup = arggroup.Rgsubgroups[rgsubgroupid];
  var mylist = [];
  switch(mode) {
    case "rggroups":
      var grouplist = window.Rggroups;
      var outfile = window.deliveryname+".pdf";
      var shape ="a5l";
      break;
    case "rggroup":
      var grouplist = arggroup.Rgsubgroups;
      var outfile = rggroupid+".pdf";
      var shape ="a5l";
      break;
    case "rgsubgroup":
      var grouplist = argsubgroup.Roadgroups;
      var outfile = rgsubgroupid+".pdf";
      var inputElements = document.getElementsByClassName('printcheckbox');
      for(var i=0; inputElements[i]; ++i)
      {
        if(inputElements[i].checked){
          var checkedValue = inputElements[i].value;
          mylist.push(checkedValue);
        }
      }
      var shape ="a6p";
      break;
  }

  if(mylist.length ==0)
  {
    for (var index in grouplist) {

      mylist.push( index);
    }
  }

  if(shape=="a5l")
     createPdfA5(mylist);
  else
     createPdfA6(mylist);


  async function createPdfA6( mylist)
  {
    var margin = 10;
    const pdfDoc = await PDFLib.PDFDocument.create();
    var page = pdfDoc.addPage();

    var col= 0;
    var rmax=1;
    var cmax=2;
    var row =rmax;
    var pwidth = page.getWidth();
    var pheight = page.getHeight();
    var iwidth = (pwidth - 3 * margin)/2;
    var iheight = ( pheight - 3 * margin)/2;
    for( rg of mylist)
    {
      //var rgpngpath = 'images/'+rg+'.png';
      var rgpngpath = window.imagepath+rg+'.png';
      if(CheckUrl(rgpngpath))
      {
        var rgpngbytes =  await fetch(rgpngpath).then((res) => res.arrayBuffer());
        var rgpngimage = await pdfDoc.embedPng(rgpngbytes);
        var rgpngdims1 = rgpngimage.scale(1);
        var hscale = iheight / rgpngdims1.height ;
        var wscale = iwidth / rgpngdims1.width;
        var scale = hscale;
        if( wscale < hscale ) scale = wscale;
        var rgpngdims = rgpngimage.scale(scale);

        page.drawImage(rgpngimage, {
          x: col*pwidth/2+margin,
          y: row*pheight/2 + margin,
          width: rgpngdims.width,
          height: rgpngdims.height,
        })
        col= col+1;
        if( col == cmax)
        {
          col =0;
          row= row-1;
          if(row <0)
          {
            row = rmax;
            page = pdfDoc.addPage();
          }
        }
      }

    }
    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, outfile, "application/pdf");

  }

  async function createPdfA5( mylist)
  {
    var margin = 10;

    const pdfDoc = await PDFLib.PDFDocument.create();
    var page = pdfDoc.addPage([  842, 595]);

    var col= 0;
    var rmax=1;
    var cmax=2;
    var row =0;
    var pwidth = page.getWidth();
    var pheight = page.getHeight();
    var iwidth = (pwidth - (cmax+1) * margin)/cmax;
    var iheight = (pheight - (rmax+1) * margin)/rmax;

    var colwidth = margin + iwidth;
    var rowheight = margin +iheight;
    for( rg of mylist)
    {
      //var rgpngpath = 'images/'+rg+'.png';
      var rgpngpath = window.imagepath+rg+'.png';
      if(CheckUrl(rgpngpath))
      {
        var rgpngbytes =  await fetch(rgpngpath).then((res) => res.arrayBuffer());
        var rgpngimage = await pdfDoc.embedPng(rgpngbytes);
        var rgpngdims1 = rgpngimage.scale(1);
        var hscale = iheight / rgpngdims1.height ;
        var wscale = iwidth / rgpngdims1.width;

        var scale = hscale;
        if( wscale < hscale ) scale = wscale;
        var rgpngdims = rgpngimage.scale(scale);

        page.drawImage(rgpngimage, {
          x: colwidth*col+margin,
          y: rowheight*row+margin,
          width: rgpngdims.width,
          height: rgpngdims.height,
        })
        col= col+1;
        if( col == cmax)
        {
          col =0;
          row= row+1;
          if(row = rmax)
          {
            row = 0;
            page = pdfDoc.addPage([  842, 595]);
          }
        }
      }

    }
    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, outfile, "application/pdf");

  }
}



function redecode(mystr)
{
  var instr = mystr.replace(/&amp;/g  , '&');
  instr = instr.replace(/&gt;/g  , '>');
  instr = instr.replace(/&lt;/g   , '<');
  instr = instr.replace(/&quot;/g  ,  '"');
  instr = instr.replace(/&#39;/g   ,"'");
  return instr;
}


