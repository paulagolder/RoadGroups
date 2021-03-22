


function makePageheader()
{
  var outstring = "";
  outstring +='<div class="routbutton right"><a href="./#wards"  class="routebutton" data-role="button" data-inline="true" data-mini="true">';
  outstring += window.District.name;
  outstring += "</a></div>";
  return outstring;
}






function showwards()
{
  var allwards = window.Wards;
  var outstring = "";
  outstring += "<div class='list'> ";
  var c = 0;
  for (var wardid in allwards) {
    var ward = allwards[wardid];
    var style ="";
    if (ward.KML)
    {
      var style =" style =\"background-color: "+ window.colors[c] + ";\"";
      c++;
    }

    outstring += "<div class='row' ><div class='pbutton' "+style+ " ><a class=\"button\" href=\"./#ward\" data-role=\"button\"  data-mini=\"true\"  ";
    outstring += " onclick=\"changeMypage( 'ward',\'" + wardid + "\'); \" >" + wardid + "</a></div>";


    outstring += "<div>" + ward.Name + "</div>";
    outstring += "</div>";
  }
  outstring += "</div>";
  return outstring;
}


function showward() {
  var wdid = window.wardid;
  var award = window.Wards[wdid];
  var c = 0;
  var outstring = "<div class='heading' ><div>" + award.WardId + "</div><div >" + award.Name + "</div>";
  outstring +="</div>";
  outstring += "<div class='list'> ";
  var subwards = award.Subwards;
  for (var asubwardid in subwards) {
    var roadgroupcount = 0;
    var asubward = subwards[asubwardid];
    for (var groupid in asubward.Roadgroups) {
      roadgroupcount++;
    }
    outstring += "<div class='row'>";
    outstring += "<div style='background-color:" + window.colors[c] + ";' >";
    outstring += "<a class=\"button\" href=\"#\" data-role=\"button\"  data-mini=\"true\" data-iconpos=\"right\" ";
    outstring += " onclick=\"changeMypage( 'subward',\'" + asubward.SubwardId + "\'); \" >" + asubward.Name + "</a></div>";
    outstring += "<div>" + roadgroupcount + " RoadGroups </div>";
    outstring += "</div>";
    c++;
  }
  outstring += "</div>";
  return outstring;
}

function showsubward() {
  var wdid = window.wardid;
  var award = window.Wards[wdid];
  var subwardid = window.subwardid;
  var asubward = award.Subwards[subwardid];
  var grouplist = asubward.Roadgroups;
  var outstring = "<div class='heading' ><div>" + asubward.SubwardId + "</div>";
  outstring += '<div class="routebutton" ><a href="#ward"  class="routebutton" data-role="button" data-inline="true" data-mini="true">'+award.Name +'</a></div>';
  outstring += "<div>" + asubward.Name + "</div></div>";
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
    outstring += "<div>" + agroup.Name + "</div>";
    outstring += "<div>" + "<input class=\"printcheckbox\" type=\"checkbox\" id=\"printlist\" name=\"printlist\" value='" + agroup.RoadgroupId + "'></div>";
    outstring += "</div>";
    c++;
  }

  outstring += "  <div></div>";
  return outstring;
}


function showroadgroup() {
  var wdid = window.wardid;
  var award = window.Wards[wdid];
  var subwardid = window.subwardid;
  var asubward = award.Subwards[subwardid];
  var grouplist = asubward.Roadgroups;
  var aroadgroup = grouplist[window.roadgroupid];
  var outstring = "";
  outstring += "<div class='upperheading' ><div> RoadGroup:" + aroadgroup.RoadgroupId +":"+aroadgroup.Name+" (HH:" + aroadgroup.Households + ")</div></div>";
  outstring += "<div class='lowerheading' >";
  outstring += '<div class="routebutton" ><a href="#ward"  class="routebutton" data-role="button" data-inline="true" data-mini="true">'+award.Name +'</a></div>';
  outstring += '<div class="routebutton" ><a href="#subward"  class="routebutton" data-role="button" data-inline="true" data-mini="true">'+asubward.Name +'</a></div>';
  outstring += "</div>";

  outstring += "<div  class='streetlist' >";
  var streets = aroadgroup.Streets;
  for (var streetid in streets)
  {
    var street = streets[streetid];
    var streetname = street.makeId();
    var note = street.Qualifier;
    var households = street.Households;
    outstring += " <div>" + streetname +  "</div>";
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
           maxZoom: 18,
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
    mymap.fitBounds(e.target.getBounds(), {
      padding: [5, 5],
    });
   // kmllayer.bindPopup(label);
  });

  return kmllayer;
}

function addMyKML2(mymap, kmlfile, style, label='')
{

  var runLayer = omnivore.kml(kmlfile)
  .on('ready', function() {
    mymap.fitBounds(runLayer.getBounds());
    runLayer.eachLayer(function(layer) {
      runLayer.bindPopup(layer.feature.properties.name);
      runLayer.setStyle( style);
      //runLayer.bindPopup(label);
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
      const bounds = track.getBounds();
      amap.fitBounds(bounds);
    }
    track.bindPopup(label);
  });
  return track;
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
  // $('#wardsscroll').css('height', height);

}

$(document).on("pageshow", "#xwards", function() {


  document.getElementById("wardspanel").innerHTML = showwards("");
  window.refreshcontactlist = false;

});



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
  for (var wardid in window.Wards) {
    var award = window.Wards[wardid];
    var subwards = award.Subwards;
    for (var asubwardid in subwards) {
      var asubward = subwards[asubwardid];
      var rgrouplist = asubward.Roadgroups;
      for (var index in rgrouplist) {
        var aroadgroup = rgrouplist[index];
        var streets = aroadgroup.Streets;
        for (var streetid in streets) {
          var astreet = streets[streetid];
          if (astreet.Name.toLowerCase().includes(searchfield))
          {
            astreet.roadgroupid = aroadgroup.RoadgroupId;
            astreet.subwardid = asubwardid;
            astreet.wardid = wardid;
            foundlist.push(astreet);
          }
        }
      }
    }
  }
  if (foundlist.length == 1) {
    var fstreet = foundlist[0];
    var roadgroup = fstreet.roadgroupid;
    window.wardid = fstreet.wardid;
    window.subwardid = fstreet.subwardid;
    window.roadgroupid = roadgroup;
    changeMypage("roadgroup", roadgroup);
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
 function is_browser_gps_capable()
 {
 var _locator_object;
 try
 {
 _locator_object = navigator.geolocation;
 }
 catch (e)
 {
 return false;

 }
 if (_locator_object)
   return true;
 else
   return false;
 }
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

function pdfout()
{
  createPdf();
  async function createPdf() {
    var rglist = [];
    var wdid = window.wardid;
    var award = window.Wards[wdid];
    var subwardid = window.subwardid;
    var asubward = award.Subwards[subwardid];
    var grouplist = asubward.Roadgroups;
    var inputElements = document.getElementsByClassName('printcheckbox');
    for(var i=0; inputElements[i]; ++i){
      if(inputElements[i].checked){
        var checkedValue = inputElements[i].value;
        rglist.push(checkedValue);
      }
    }
   if(rglist.length ==0)
   {
    for (var index in grouplist) {

      rglist.push( index);
    }
   }
    var margin = 10;
    const pdfDoc = await PDFLib.PDFDocument.create();
    var page = pdfDoc.addPage();
    var row =0;
    var col= 0;
    var rmax=2;
    var cmax=2;
    var pwidth = page.getWidth();
    var pheight = page.getHeight();
    var iwidth = (pwidth - 3 * margin)/2;
    var iheight = ( pheight - 3 * margin)/2;
    for( rg of rglist)
    {

      var rgpngpath = 'images/'+rg+'.png';
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
      row= row+1;
      if( row ==rmax)
      {
        row = 0;
        page = pdfDoc.addPage();
      }
    }
      }

    }
    const pdfBytes = await pdfDoc.save()
   download(pdfBytes, subwardid+".pdf", "application/pdf");

  }
}
