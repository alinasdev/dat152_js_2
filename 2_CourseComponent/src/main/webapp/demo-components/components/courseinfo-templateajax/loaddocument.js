export default function(url) {
    return new Promise(
        (resolve, reject) => {
            // The "fetch" api can not parse XML and HTML directly, but "XMLHttpRequest" can
            const xmlhttp = new XMLHttpRequest();

            xmlhttp.open("GET", url, true);
            xmlhttp.responseType = "document";

            xmlhttp.addEventListener("loadend", (event) => {
                try {
                    const request = event.target; // Could here have used variable "xmlhttp" instead of "event.target"
                    if (request.status === 200) {
                        const document = request.responseXML;
                        if (document !== null) {
                            resolve(document);
                        } else {
                            reject("Document is null");
                        }
                    } else { reject(`Response status: ${request.status}`) }
                } catch (e) { reject(`Error message: ${e}`) }
            });

            xmlhttp.send(null);
        }
    )
}
