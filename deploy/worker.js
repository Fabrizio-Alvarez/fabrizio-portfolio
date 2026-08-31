// www → apex 301 redirect, handled in-code so no dashboard Redirect Rule is
// needed. Only www traffic runs through this worker (see `run_worker_first`
// in wrangler.toml); apex traffic serves static assets directly.
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.hostname === "www.falvarez.dev") {
      url.hostname = "falvarez.dev"
      url.protocol = "https:"
      return Response.redirect(url.toString(), 301)
    }
    return env.ASSETS.fetch(request)
  },
}
