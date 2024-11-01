

if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}


let doc;
let srch;

xmlhttp.onreadystatechange = function(v, a, d) {
    if(this.readyState == 4 && this.status == 200)
    {
        var tName = xmlhttp.responseXML.documentElement.tagName;
        var xmlDoc = new DOMParser().parseFromString(xmlhttp.responseText,'text/xml');
        if(tName == "steelbooks")
        {
            doc = xmlDoc;
        }
        else if(tName == "search")
        {
            srch = xmlDoc;
        }
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
}


xmlhttp.open("GET", "books.xml", false);
xmlhttp.send();

xmlhttp.open("GET", "search.xml", false);
xmlhttp.send();

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("simple").checked = false;
    CreateList(doc);
    CreateFilters(srch);
});

function CreateFilters(xmlDoc)
{
    console.log(xmlDoc);
    let full = "";
    var opts = xmlDoc.getElementsByTagName("name");
    console.log(opts);
    for(i = 0; i < opts.length; i++)
    {
        var n = opts[i].innerHTML;
        full += `<option value="${n}">${n}</option>`;
    }
    document.getElementById("Collection").innerHTML += full;
}
function CreateList(xmlDoc)
{
    console.log(xmlDoc);
    let full = "";
    var books = xmlDoc.getElementsByTagName("steelbook");
    console.log(books);
    var itemsFound = 0;
    var smpl = document.getElementById("simple").checked;
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
        var own = owned != "Owned" ? `style="background-color: var(--notowned) !important;"` : "";
        let part = "";
        if(smpl == false)
        {
            part = `
            <div class="sb-preview" ${own}>
                <p class="sb-tag full" title="${title}">${title}</p>
                <div class="sb-tag half" title="Release Year: ${year}">${year}</div>
                <div class="sb-tag half right">${alias}</div>
                <div class="sb-imageview">
                    <img class="sb-image" src="images/steelbooks/${img}" onerror="this.onerror=null; this.src='images/steelbooks/missigno.jpg'" />
                </div>
                <div class="sb-tag half">${format}</div>
                <div class="sb-tag half right">${owned}</div>
            </div>
            `;
        }
        else {
            part = `
            <div class="list-preview" ${own}>
                <div class="list-left">
                    <div class="list-imageview">
                        <img class="list-image" src="images/steelbooks/${img}" onerror="this.onerror=null; this.src='images/steelbooks/missigno.jpg'" />
                    </div>                  
                </div> 
                <div class="list-right">
                    <p class="list-tag list-full" title="${title}">${title}</p>
                    <div class="list-tag" title="Release Year: ${year}">${year}</div>
                    <div class="list-tag">${alias}</div>
                    <div class="list-tag">${format}</div>
                    <div class="list-tag">${owned}</div>
                </div>
            </div>
            `;
        }
        full += part;
    }
    
    document.getElementById("bookparent").innerHTML = full;
    document.getElementById("found").innerHTML = "Steelbooks Found: " + itemsFound;
}
function FilterList()
{
    let full = "";
    var books = doc.getElementsByTagName("steelbook");
    var itemsFound = 0;
    var o = document.getElementById("owned").checked;
    var no = document.getElementById("notowned").checked;
    var w = document.getElementById("wishlist").checked;
    var smpl = document.getElementById("simple").checked;
    var c = document.getElementById("Collection")
    for(i = 0; i < books.length; i++)
    {
        var title = books[i].getElementsByTagName("title")[0].innerHTML;
        if(title.length == 0 || title == "") continue;

        var owned = books[i].getElementsByTagName("status")[0].innerHTML;
        if((owned == "Owned" && o) || (owned == "Not Owned" && no) || (owned == "Wishlist" && w))
        {
            var alias = books[i].getElementsByTagName("alias")[0].innerHTML;
            if(c.value != "" && c.value != alias) continue;
            if(alias == "") alias = "-";
            var year = books[i].getElementsByTagName("release")[0].innerHTML;
            var format = books[i].getElementsByTagName("format")[0].innerHTML;
            
            var img = books[i].getElementsByTagName("img")[0].innerHTML;
           
            if(title.length == 0 || title == "") continue;
            itemsFound++;
            var own = owned != "Owned" ? `style="background-color: var(--notowned) !important;"` : "";
            let part = "";
            if(smpl == false)
            {
                part = `
                <div class="sb-preview" ${own}>
                    <p class="sb-tag full" title="${title}">${title}</p>
                    <div class="sb-tag half" title="Release Year: ${year}">${year}</div>
                    <div class="sb-tag half right">${alias}</div>
                    <div class="sb-imageview">
                        <img class="sb-image" src="images/steelbooks/${img}" onerror="this.onerror=null; this.src='images/steelbooks/missigno.jpg'" />
                    </div>
                    <div class="sb-tag half">${format}</div>
                    <div class="sb-tag half right">${owned}</div>
                </div>
                `;
            }
            else {
                part = `
                <div class="list-preview" ${own}>
                    <div class="list-left">
                        <div class="list-imageview">
                            <img class="list-image" src="images/steelbooks/${img}" onerror="this.onerror=null; this.src='images/steelbooks/missigno.jpg'" />
                        </div>                
                    </div> 
                    <div class="list-right">
                        <p class="list-tag" title="${title}">${title}</p>
                        <div class="list-tag" title="Release Year: ${year}">${year}</div>
                        <div class="list-tag">${alias}</div>
                        <div class="list-tag">${format}</div>
                        <div class="list-tag">${owned}</div>
                    </div>
                </div>
                `;
            }
            full += part;
        }
      
    }
    
    document.getElementById("bookparent").innerHTML = full;
    document.getElementById("found").innerHTML = "Steelbooks Found: " + itemsFound;
    OpenMenu();
}

async function SendRequest()
{
    const webhook = "https://discord.com/api/webhooks/1283317169920409641/PYbskH48csGE9NaAYQUn3NOACRSaHKqdwIWiCzcdRn8I5kC4xj4O4QOfFAGH0ZY4fzOF";
    var form = new FormData();

    var title = document.getElementById("movietitle").value;
    var release = document.getElementById("movierelease").value;
    var alias = document.getElementById("moviecollection").value;
    var format = document.getElementById("movieformat").value;
    var imdb = document.getElementById("movieimdb").value;
    var extrainfo = document.getElementById("movieextra").value;

    if(document.getElementById("movieimg").files.length == 0)
    {
        return;
    }
    var file = document.getElementById("movieimg").files[0];
    

    var info = `
    <steelbook>
        <title>${title}</title>
        <alias>${alias}</alias>
        <release>${release}</release>
        <format>${format}</format>
        <img>${file.name}</img>  
        <status>Not Owned</status>
        <imdb>${imdb}</imdb>
    </steelbook>   
    Extra:
    ${extrainfo}
    `;
    
    var form = new FormData();
    form.append("file", file, file.name);
    form.append("content", info);
    const request = new XMLHttpRequest();
    
    request.open("POST", webhook);
    request.send(form);
    document.getElementById("requesttab").hidden = true;
    document.getElementById("senttab").hidden = false;
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
function OpenMenu()
{
    var dc =  document.getElementsByClassName("navside")[0];
    if(dc.style.display == "flex")
        dc.style.display = "none";
    else
        dc.style.display = "flex";
}

function AddAnother()
{
    document.getElementById("").hidden = true;
}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}