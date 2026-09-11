import React from 'react'

// Minimal renderer for Payload's Lexical rich-text JSON.
// Handles the common node types: paragraph, heading, list, listitem, link, image, text, quote.
type Node = any

function renderText(node: Node, key: number) {
  const format = node.format as number | undefined
  let el: React.ReactNode = node.text || ''
  if (format) {
    if (format & 1) el = <strong key={`b-${key}`}>{el}</strong>
    if (format & 2) el = <em key={`i-${key}`}>{el}</em>
    if (format & 4) el = <s key={`s-${key}`}>{el}</s>
    if (format & 8) el = <u key={`u-${key}`}>{el}</u>
    if (format & 16) el = <code key={`c-${key}`}>{el}</code>
  }
  return <React.Fragment key={key}>{el}</React.Fragment>
}

function renderChildren(children: Node[] | undefined): React.ReactNode {
  if (!Array.isArray(children)) return null
  return children.map((child, i) => renderNode(child, i))
}

function renderNode(node: Node, key: number): React.ReactNode {
  if (!node) return null
  const type = node.type
  switch (type) {
    case 'text':
      return renderText(node, key)
    case 'linebreak':
      return <br key={key} />
    case 'paragraph':
      return <p key={key}>{renderChildren(node.children)}</p>
    case 'heading': {
      const tag = (node.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return React.createElement(tag, { key }, renderChildren(node.children))
    }
    case 'quote':
      return <blockquote key={key}>{renderChildren(node.children)}</blockquote>
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return <Tag key={key}>{renderChildren(node.children)}</Tag>
    }
    case 'listitem':
      return <li key={key}>{renderChildren(node.children)}</li>
    case 'link': {
      const url = node.fields?.url || node.url || '#'
      return (
        <a key={key} href={url} target="_blank" rel="noreferrer noopener">
          {renderChildren(node.children)}
        </a>
      )
    }
    case 'upload': {
      const url = node.value?.url
      const alt = node.value?.alt || ''
      if (!url) return null
      // eslint-disable-next-line @next/next/no-img-element
      return <img key={key} src={url} alt={alt} />
    }
    case 'horizontalrule':
      return <hr key={key} />
    case 'root':
      return <React.Fragment key={key}>{renderChildren(node.children)}</React.Fragment>
    default:
      // Unknown node — try to render its children
      if (node.children) return <React.Fragment key={key}>{renderChildren(node.children)}</React.Fragment>
      return null
  }
}

export default function RichText({ content, html }: { content?: unknown; html?: string }) {
  if (html) {
    return (
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }
  if (!content) return null
  const root = (content as any)?.root || content
  return <div className="article-content">{renderNode(root, 0)}</div>
}
