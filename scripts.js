

if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}


let doc;
xmlhttp.onload = function() {
    var xmlDoc = new DOMParser().parseFromString(xmlhttp.responseText,'text/xml');
    doc = xmlDoc;
    return;
    document.write("<table border='1'>");
    var x=xmlDoc.getElementsByTagName("steelbook");
    for (i=0;i<x.length;i++)
    { 
        document.write("<tr><td>");
        document.write(x[i].getElementsByTagName("c_id")[0].childNodes[0].nodeValue);
        document.write("</td><td>");
        document.write(x[i].getElementsByTagName("facebook_id")[0].childNodes[0].nodeValue);
        document.write("</td></tr>");
    }
    document.write("</table>");

}


xmlhttp.open("GET","books.xml",false);
xmlhttp.send();

document.addEventListener('DOMContentLoaded', function () {
    CreateList(doc);
});
function CreateList(xmlDoc)
{
    console.log(xmlDoc);
    let full = "";
    var books = xmlDoc.getElementsByTagName("steelbook");
    console.log(books);
    var itemsFound = 0;
    for(i = 0; i < books.length; i++)
    {
        var year = books[i].getElementsByTagName("release")[0].innerHTML;
        var alias = books[i].getElementsByTagName("alias")[0].innerHTML;
        if(alias == "") alias = "-";
        var format = books[i].getElementsByTagName("format")[0].innerHTML;
        var title = books[i].getElementsByTagName("title")[0].innerHTML;
        var img = books[i].getElementsByTagName("img")[0].innerHTML;
        var owned = books[i].getElementsByTagName("status")[0].innerHTML;
        if(title.length == 0 || title == "") continue;
        itemsFound++;
        let part = `
        <div class="sb-preview">
            <p class="sb-tag" title="${title}">${title}</p>
            <div class="sb-tag half" title="Release Year: ${year}">${year}</div>
            <div class="sb-tag half right">${alias}</div>
            <div class="sb-imageview">
                <img class="sb-image" src="images/steelbooks/${img}"/>
            </div>
            <div class="sb-tag half">${format}</div>
            <div class="sb-tag half right">${owned}</div>
        </div>
        `;
        full += part;
    }
    
    document.getElementById("bookparent").innerHTML = full;
    document.getElementById("found").innerHTML = "Steelbooks Found: " + itemsFound;
}

function SendRequest()
{
    var title;
    var release;
    var alias;
    var imgid;
    var format;
    var imgurl;
}

function AddSteelbook() 
{
    var el = doc.getElementsByTagName("steelbook");
   
    
    console.log(el);
    var title = "Carrie";
    var release = "1976";
    var alias = "Arrow";
    var imgid = "carrie.jpg";
    var format = "Blu-ray";
    var templateNode = doc.getElementsByTagName("steelbook")[0];
    templateNode.childNodes[1].innerHTML = title;
    templateNode.childNodes[3].innerHTML = alias;
    templateNode.childNodes[5].innerHTML = release;
    templateNode.childNodes[7].innerHTML = format;
    templateNode.childNodes[9].innerHTML = imgid;
    doc.getElementsByTagName("steelbooks").nodeValue = el;
    console.log(doc);
    var l = doc.getElementsByTagName("steelbook").length+1;
    doc.getElementsByTagName("steelbooks")[l] = `
    <title>${title}</title>
    <alias>${alias}</alias>
    <release>${release}</release>
    <format>${format}</format>
    <img>${imgid}</img>
    `;
    CreateList(doc);
   
}
