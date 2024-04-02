/**
 * This file is a Cloudflare Pages Function that acts as a proxy to the fileserver at home.
 * 
 * To access any file stored on the server in your user directory, you can use the following URL:
 * https://demilurii.art/share/<path_to_file>
 */

export async function onRequest(context) {
    // Figure out the request URL
    let url = new URL(context.request.url);
    let file_path = url.pathname;

    // Make a call to the analytics API to track this request
    let analytics_success = false;
    if ("GOATCOUNTER_API_KEY" in context.env) {
        await fetch(
            "https://analytics.demilurii.art/api/v0/count",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + context.env.GOATCOUNTER_API_KEY
                },
                body: JSON.stringify({
                    hits: {
                        location: context.request.cf.country,
                        path: file_path,
                        query: url.search,
                        ref: context.request.headers.get("Referer"),
                        user_agent: context.request.headers.get("User-Agent"),
                    }
                })
            }
        );
        analytics_success = true;
    }

    // Re-write URL to point to the real file server
    file_path = file_path.replace(/^\/share/, "");
    url.hostname = "share.ewu-home.com";
    url.pathname = `/miwu${file_path}`;

    // Request the file from the file server
    context.request.headers["X-GC-Success"] = analytics_success;
    return fetch(url.toString(), context.request);
}
