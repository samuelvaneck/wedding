// function to get the value of a URL parameter
window.getUrlParameter = param => {
  let pageURL = decodeURIComponent(window.location.search).split("?")[1];
  if (pageURL != undefined) {
    const urlVariables = pageURL.split("&")
    let parameterName;

    for (i = 0; i < urlVariables.length; i++) {
      parameterName = urlVariables[i].split("=");

      if (parameterName[0] == param) {
        return parameterName[1] == undefined ? true : parameterName[1];
      }
    }
  }
}
