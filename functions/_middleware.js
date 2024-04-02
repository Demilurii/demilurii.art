// If we are handling a request from `share.demilurii.art`, redirect to /share/...
async function rewrite_share_domain(context) {
    let url = new URL(context.request.url);

    // Redirect if needed
    if (url.hostname === "share.demilurii.art") {
        url.pathname = `/share${url.pathname}`;
        return Response.redirect(url, 302);
    }

    // Continue the chain
    return context.next();
}

// Hook up the handler chain
export const onRequest = [rewrite_share_domain];