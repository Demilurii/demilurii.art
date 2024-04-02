/**
 * This file is a Cloudflare Pages Function that acts as a proxy to the fileserver at home.
 * 
 * To access any file stored on the server in your user directory, you can use the following URL:
 * https://demilurii.art/share/<path_to_file>
 */

export function onRequest(context) {
    // Figure out the request URL
    let url = new URL(context.request.url);
    let file_path = url.pathname;

    // Strip the leading /share from the path
    file_path = file_path.replace(/^\/share/, "");

    // Write a new domain
    url.hostname = "share.ewu-home.com";

    // Set a new path prefix
    url.pathname = `/miwu${file_path}`;

    // Request the file from the new domain
    return fetch(url.toString(), context.request);
}
