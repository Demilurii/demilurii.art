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

    // Re-write URL to point to the real file server
    file_path = file_path.replace(/^\/share/, "");
    url.hostname = "share.ewu-home.com";
    url.pathname = `/miwu${file_path}`;

    // Fetch the underlying file
    let response = await fetch(url.toString(), context.request);

    // Make a call to the analytics API to track this request
    if (response.ok) {
        await fetch(
            "https://analytics.demilurii.art/api/v0/count",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + context.env.GOATCOUNTER_API_KEY
                },
                body: JSON.stringify({
                    hits: [
                        {
                            location: context.request.cf.country,
                            path: file_path,
                            title: file_path.split("/").pop(),
                            query: url.search,
                            ref: context.request.headers.get("Referer"),
                            user_agent: context.request.headers.get("User-Agent"),
                        }
                    ],
                    no_sessions: true
                })
            }
        );
    }

    // Request the file from the file server
    return response;
}
