'use strict'

function showDrafts(hexo) {
  const args = hexo.env.args || {}
  return Boolean(args.draft || args.drafts || hexo.config.render_drafts)
}

hexo.extend.helper.register('show_drafts', function () {
  const args = this.env.args || {}
  return Boolean(args.draft || args.drafts || this.config.render_drafts)
})

hexo.extend.helper.register('is_unpublished', function (post) {
  return Boolean(post && post.published === false)
})

hexo.on('generateBefore', () => {
  if (!showDrafts(hexo)) return

  const inject = hexo.theme.config.inject || (hexo.theme.config.inject = {})
  inject.head = inject.head || []
  inject.bottom = inject.bottom || []

  if (!inject.head.some(item => item.includes('local-draft.css'))) {
    inject.head.push('<link rel="stylesheet" href="/css/local-draft.css">')
  }

  if (!inject.bottom.some(item => item.includes('local-draft-mode-bar'))) {
    inject.bottom.push(
      '<div id="local-draft-mode-bar" role="status">本地预览模式 · 带「未发布」标记的文章不会部署到线上</div>'
    )
  }
})
