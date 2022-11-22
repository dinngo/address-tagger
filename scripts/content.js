const addressRegex = /^0x[a-fA-F0-9]{40}$/

const appendTooltip = (name, parentNode) => {
  const { top, left, height } = parentNode.getBoundingClientRect()

  const tooltip = document.createElement("div")
  document.body.appendChild(tooltip)

  tooltip.textContent = name

  tooltip.style.borderColor = "#fff"
  tooltip.style.background = "rgba(0, 200, 160, 0.5)"
  tooltip.style.boxShadow = "0 0 5px #999999"
  tooltip.style.zIndex = 9999999
  tooltip.style.position = "absolute"
  tooltip.style.padding = "2px 10px"

  tooltip.style.top = `${
    window.pageYOffset + top - height - tooltip.clientHeight / 2
  }px`
  tooltip.style.left = `${left}px`

  setTimeout(() => tooltip.remove(), 3000)
}

const handleSelectionchange = () => {
  const selection = window.getSelection()
  const parentNode = selection?.focusNode?.parentElement
  const selectedText = selection.toString().trim().toLowerCase()
  if (!parentNode || selectedText.length === 0) return

  try {
    chrome.storage.local.get(["addressList"], ({ addressList }) => {
      const name = addressList?.[selectedText]?.name
      if (name) appendTooltip(name, parentNode)
    })
  } catch (e) {
    console.error("[Address Tagger] Selectionchange: " + e.message)
  }
}

// Auto scan text when mouse over on a or span tag
const handleMouseOver = (e) => {
  const parentNode = e.target
  if (["a", "span", "p"].includes(parentNode?.tagName?.toLowerCase())) {
    let selectedText = parentNode?.text || parentNode?.textContent || ""
    if (selectedText.length === 0) return

    if (selectedText.includes(":")) selectedText = selectedText.split(":").pop()
    if (!selectedText.match(addressRegex)) return

    try {
      chrome.storage.local.get(
        ["addressList", "isAutoScan"],
        ({ addressList, isAutoScan }) => {
          if (!isAutoScan) return

          const name = addressList?.[selectedText.toLowerCase()]?.name
          if (name) appendTooltip(name, parentNode)
        }
      )
    } catch (e) {
      console.error("[Address Tagger] MouseOver: " + e.message)
    }
  }
}

document.addEventListener("selectionchange", handleSelectionchange)
document.addEventListener("mouseover", handleMouseOver)
