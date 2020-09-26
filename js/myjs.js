function showwards()
{
  var allwards = window.Wards.wardlist;
  var allroadgroups = window.RoadGroups;
  var outstring = ""
  outstring = "<div  class=\"wards\" >";
  for(var wardid in allwards){
    ward = allwards[wardid];

    outstring += "<div class='row' ><div><a class=\"button\" href=\"#\" data-role=\"button\" data-icon=\"check\" data-mini=\"true\" data-iconpos=\"right\" ";
    outstring +=  " onclick=\"changeMypage( 'ward',\'"+wardid+"\'); \" >"+wardid+"</a></div>";
    outstring += "<div>"+ward['Name']+"</div>";
    outstring += "</div>";
  }
  outstring += "</div>";
  return outstring;
}


function showward()
{
  var wdid = window.wardid;
  var award = window.Wards.wardlist[wdid];
  var grouplist = window.RoadGroups.grouplist;
  var outstring = "<div class='heading' ><div>"+award.WardId+"</div><div >"+award.Name+"</div></div>";
  outstring += "<div class='list'> ";
  var subwards = award['Subwards'];
  for(var asubwardid in subwards)
  {
    var roadgroupcount=0;
    var asubward = subwards[asubwardid];
    for(var groupid in grouplist)
    {
      var agroup = grouplist[groupid];
      var subgroupgcount=0;
      if( agroup.GroupCode.startsWith(asubwardid))
      {
        roadgroupcount++;
      }
    }
    outstring += "<div class='row'>";
    outstring += "<div><a class=\"button\" href=\"#\" data-role=\"button\"  data-mini=\"true\" data-iconpos=\"right\" ";
    outstring +=  " onclick=\"changeMypage( 'subward',\'"+asubward.Subwardid+"\'); \" >"+asubward.Name+"</a></div>";
    outstring += "<div>"+roadgroupcount+" RoadGroups </div>";
    outstring += "</div>";
  }
  outstring += "</div>";
  return outstring;
}

function showsubward()
{
  var wdid = window.wardid;
  var award = window.Wards.wardlist[wdid];
  var subwardid =  window.subwardid;
  var asubward = award['Subwards'][subwardid];
  var grouplist = window.RoadGroups.grouplist;
  var outstring = "<div class='heading' ><div>"+asubward.Subwardid+"</div><div >"+award.Name+"</div><div>"+asubward.Name+"</div></div>";
  outstring += "<div class='list'  style='overflow-y: scroll;' >";

  var c=0;
  for(var index in grouplist)
  {
    var agroup = grouplist[index];

    if( agroup.GroupCode.startsWith(subwardid))
    {
      outstring += "<div class='row' >";
      if( CheckUrl("maps/"+index +".kml"))
      {
        outstring += "<div style='background-color:"+window.colors[c]+";' >";
      }
      else
        outstring += "<div>";
      outstring += " <a class=\"button\" href=\"#\" data-role=\"button\"  data-mini=\"true\" data-iconpos=\"right\" ";
      outstring +=  " onclick=\"changeMypage( 'roadgroup',\'"+agroup.GroupCode+"\'); \" >"+agroup.GroupCode+"</a></div>";
      outstring +=  "<div>"+ agroup.PrincipalRoad+"..etc</div>";
      outstring +=  "</div>";
      c++;
    }
  }

  outstring += "  <div></div>";
  return outstring;
}


function showroadgroup()
{
  var groupid =  window.roadgroupid;
  var roadgroup =  window.RoadGroups.grouplist[groupid];
  var wdid = window.RoadGroups.grouplist[groupid].DistrictWard;
  var award = window.Wards.wardlist[wdid];
  var subwardid =  roadgroup.SubWard;
  var asubward = award['Subwards'][subwardid];
  var outstring = "<div class='heading' ><div>"+groupid+"</div><div >"+award.Name+"</div><div>"+asubward.Name+"</div></div>";
   outstring += "<div class='heading' ><div> Households:"+roadgroup.Properties+"</div>";
   outstring += "<div >Electors:"+roadgroup.Electors+"</div></div>";

  outstring += "<div  class='streetlist' >";
  var streets = window.Streets.streetlist;
  var nostreets =streets.length;
  for (var i = 0; i < streets.length; i++)
  {
    var street = streets[i];
    var attid =street.GroupCode;
    var streetname =street.Name;
    var households =street.Households;
    if(attid == groupid)
    {
      outstring +=  " <div>"+streetname+" ("+households+") </div>";
    }
  }
  outstring += "</div>";

  return outstring;
}



function CheckUrl(url)
{
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
    var http=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    var http=new ActiveXObject("Microsoft.XMLHTTP");
  }
  http.open('HEAD', url, false);
  http.send();
  return http.status!=404;
}



function mymappera(mymap,lat, long, zoom)
{

  if(zoom <1 ) zoom = 1;
  // if (mymap != undefined) mymap.remove();
  // var mymap = L.map(mapdiv).
  mymap.setView([ lat , long], zoom);
  mymap.setView([ lat , long], zoom);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicGF1bGFnb2xkZXIiLCJhIjoiY2pneXhhbWoyMmkxazMzcDZncHFhODlkdiJ9.edTBTkIMndOfkYHlYp4eAQ'
  }).addTo(mymap);
  //  var marker = L.marker([lat , long]).addTo(mymap);
  setTimeout(function () { mymap.invalidateSize() }, 1200);
  return mymap;
}


function mymapper(lat, long, zoom)
{

  if(zoom <1 ) zoom = 1;
  // if (mymap != undefined) mymap.remove();
  mymap = L.map('mapdiv').setView([ lat , long], zoom);
  // amap.setView([ lat , long], zoom);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicGF1bGFnb2xkZXIiLCJhIjoiY2pneXhhbWoyMmkxazMzcDZncHFhODlkdiJ9.edTBTkIMndOfkYHlYp4eAQ'
  }).addTo(mymap);
  //  var marker = L.marker([lat , long]).addTo(mymap);
  setTimeout(function () { mymap.invalidateSize() }, 1200);
  return mymap;
}

function fileExists(url)
{
  var http = new XMLHttpRequest();
  http.open('HEAD', url, false);
  http.send();
  return http.status!=404;
}


function addKML(mymap,kmlfilename,color="#9e9e9e")
{
  //var color = "#FF0000"
  var kmllist = new Array();
  comune = omnivore.kml(kmlfilename);
  comune.on('ready', function() {
    this.setStyle({color: color , weight: 10});
  });
  kmllist.push(comune);
  var kmlLayer = L.layerGroup(kmllist);
  //kmlLayer.on("loaded", function(e)
  //{
  //  kmlLayer.eachLayer(function(layer) {
  //    layer.bindPopup(layer.toGeoJSON().feature.properties.name);
  //   });
  // });
  kmlLayer.addTo(mymap);

}


function addMyKML(mymap,kmlfile,color)
{

  // mymappera(mymap, 52.6854, -1.8304, 14);
  var kmllayer = new L.KML(kmlfile, {async: true});
  kmllayer.on("loaded", function(e)
  {
    kmllayer.setStyle({color: color , weight: 14});
    mymap.fitBounds(e.target.getBounds(), {padding: [50,50]});
  });
  mymap.addLayer(kmllayer);
  return kmllayer
}

function getKML(kmlfilename,color="#9e9e9e", afg)
{

  comune = omnivore.kml(kmlfilename,null,afg);
  comune.on('ready', function() {
    this.setStyle({color: color , weight: 10});
  });
  return comune;

}


function setScrollHeight()
{
  var wo = window.orientation;
  var   height = $(window).width();

  if (wo === undefined)
  {
    height = $(window).height()
  }
  else
  {
    var   height = $(window).width();
    if(wo ==0 || wo ==180) height = $(window).height();
  }
  height = height-200;
  // $('#wardsscroll').css('height', height);

}

$(document).on("pageshow","#wards",function()
{
  if( window.refreshcontactlist )
  {
    document.getElementById("wardspanel").innerHTML = showroadgroups("") ;
    window.refreshcontactlist=false;
  }
});



var copyToClipboard = (function() {
  var _dataString = null;
  document.addEventListener("copy", function(e){
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

function addBounds(abounds,bbounds)
{
  if(abounds.contains(L.point(0,0,true)))
  {
    abounds = bbounds;
  }else
  {
    abounds.extends(bbounds.getBottomLeft());
    abounds.extends(bbounds.getBottomRight());
    abounds.extends(bbounds.getTopLeft());
    abounds.extends(bbounds.getTopRight());
  }
}


function doSearch()
{
  var searchfield = document.getElementById('searchfield').value;
  searchfield = searchfield.toLowerCase();
  var foundlist = [];
  var n =  window.Streets.streetlist.length;
  for(var i =0; i<n ;i++)
  {
    var astreet =  window.Streets.streetlist[i];
    if(astreet.Name.toLowerCase().includes(searchfield))
    {
      foundlist.push(astreet);
    }
  }
  if(foundlist.length==1)
  {
    var astreet =  foundlist[0];
    var roadgroup = astreet.GroupCode;
    window.roadgroup = roadgroup;
    changeMypage("roadgroup", roadgroup)
    clearSearch();
  }
  else if (foundlist.length < 1)
  {
    alert(" No Match found: try another street name ");
  } else if (foundlist.length < 4)
  {
    var text = "Too many matches found "+"\n";
    for(var n =0; n<foundlist.length ; n++)
    {
      text += foundlist[n].Name +"\n";
    }
    alert(text);
  }else
  {
    alert( "too many matches found" + '\n' +
    " give more detail" + '\n'
    );
  }
}

function clearSearch()
{
  var fd = document.getElementById("searchfield");
  document.getElementById("searchfield").value = "" ;
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
};
