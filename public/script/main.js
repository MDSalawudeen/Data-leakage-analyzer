function endsWithAny(suffixes, string) {
  for (let suffix of suffixes) {
    if (string.endsWith(suffix))
      return true;
  }
  return false;
}


$(function() {
  $(".getSitemap").on("click", function(e) {
    console.log("clicked")
    e.preventDefault();

    // Extracting form data
    const externalPages = [];
    const internalPages = [];
    const href = "/sitemap"
    const url = $(".url").val();
    const crawlerInterval = $(".crawlerInterval").val();
    const maxConcurrency = $(".maxConcurrency").val();
    const maxDepth = $(".maxDepth").val();

    console.log("URL enterred by user" + url);

    var urlCheck = ""
    const style1 = "style=color:green;"
    const style2 = "style=color:red;"

    if (url.startsWith("http://")) {
      urlCheck = url.substring(7);
    } else if (url.startsWith("https://")) {
      urlCheck = url.substring(8);
    }

    console.log("Url checker is " + urlCheck);

    $.get(href, {
      url: url,
      crawlerInterval: crawlerInterval,
      maxConcurrency: maxConcurrency,
      maxDepth: maxDepth
    }, function(data, status) {

      data.forEach(function(res) {
        if (res.includes(urlCheck)) {
          //internal pages section
          if (endsWithAny(['.jpg', '.png', '.css', '.svg', '.gif', '.mp3', '.mp4'], res)) {
            internalPages.push('<li><a ' + style1 + ' href=' + res + '>' + res + '</a></li>')
          } else if (endsWithAny(['.txt', '.csv', '.xlsx', 'xlsm', '.xml', '.json'], res)) {
            internalPages.push('<li><a ' + style2 + ' href=' + res + '>' + res + '</a></li>')
          } else {
            internalPages.push('<li><a href=' + res + '>' + res + '</a></li>')
          }
          //external pages section
        } else {

          if (endsWithAny(['.jpg', '.png', '.css', '.svg', '.gif', '.mp3', '.mp4'], res)) {
            externalPages.push('<li><a ' + style1 + ' href=' + res + '>' + res + '</a></li>')
          } else if (endsWithAny(['.txt', '.csv', '.xlsx', 'xlsm', '.xml', '.json'], res)) {
            externalPages.push('<li><a ' + style2 + ' href=' + res + '>' + res + '</a></li>')
          } else {
            externalPages.push('<li><a href=' + res + '>' + res + '</a></li>')
          }
        }


      })
      // console.log(internalPages);
      internalPages.forEach(function(a) {
        $(".internal").append(a)
      });
      externalPages.forEach(function(a) {
        $(".external").append(a)
      });
    });
  });
});


$(function() {
  $(".refresh").on("click", function(e) {
    $(".internal").empty();
    $(".external").empty();
  });
});
