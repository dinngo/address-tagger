// regex - \u4E00-\u9FFF - Chinese characters
const csvWhitelistRegex = /[^a-zA-Z0-9",.-\s\u4E00-\u9FFF]/
const addressRegex = /^0x[a-fA-F0-9]{40}$/
const nameRegex = /^[a-zA-Z0-9,.-\s\u4E00-\u9FFF]{1,30}$/

const generateTable = (addressList) => {
  const table = document.createElement("table")
  const thead = document.createElement("thead")
  const tbody = document.createElement("tbody")

  // thead
  const tr = document.createElement("tr")

  for (const header of ["address", "name", "chainId"]) {
    const th = document.createElement("th")
    th.textContent = header
    tr.appendChild(th)
  }
  thead.appendChild(tr)

  // tbody
  for (const [address, { name, chainId }] of Object.entries(addressList)) {
    const tr = document.createElement("tr")

    for (const text of [address, name, chainId]) {
      const td = document.createElement("td")
      td.textContent = text
      tr.appendChild(td)
    }

    tbody.appendChild(tr)
  }

  table.appendChild(thead)
  table.appendChild(tbody)
  table.className = "table is-bordered is-fullwidth is-size-7"

  return table
}

const toastMsg = (msg, isError) => {
  Toastify({
    text: msg,
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: isError && "red",
    },
  }).showToast()
}

const csvToJSON = (csv) => {
  if (csv.match(csvWhitelistRegex)) return false

  let jsonObj = {}
  const rows = csv.split(/\r\n|\n|\r/)

  rows.slice(1).forEach((row) => {
    const [address, name, chainId] = row.split(",")
    const _address = address?.replaceAll('"', "").toLowerCase()
    const _name = name?.replaceAll('"', "")
    const _chainId = chainId?.replaceAll('"', "")
    if (_address?.match(addressRegex) && _name?.match(nameRegex)) {
      jsonObj[_address] = {
        name: _name,
        chainId: Number(_chainId),
      }
    }
  })

  return jsonObj
}

const jsonToCsv = (jsonObj) => {
  let csvString = "address,name,chainId\n"

  for (const [address, { name, chainId }] of Object.entries(jsonObj)) {
    csvString += `${address},${name},${chainId}\n`
  }
  return csvString
}

document.addEventListener("DOMContentLoaded", () => {
  const inputFile = document.getElementById("input-file")
  const inputAddress = document.getElementById("input-address")
  const inputName = document.getElementById("input-name")
  const checkboxAutoScan = document.getElementById("input-checkbox-auto-scan")
  const btnImport = document.getElementById("btn-import")
  const btnExport = document.getElementById("btn-export")
  const btnSubmit = document.getElementById("btn-submit")
  const btnClean = document.getElementById("btn-clean")
  const boxAddressList = document.getElementById("address-list")

  // onChange event - Input file
  inputFile.addEventListener("change", () => {
    const isInputFile = !!inputFile?.files?.length
    btnImport.disabled = !isInputFile
  })

  // Import
  btnImport.addEventListener("click", () => {
    const file = inputFile?.files?.[0]
    if (!file) return

    try {
      const reader = new FileReader()

      reader.onload = (e) => {
        const addressList = csvToJSON(e.target.result)
        if (addressList && Object.keys(addressList).length) {
          chrome.storage.local.set({ addressList: addressList }, () => {
            boxAddressList.innerHTML = ""
            boxAddressList.appendChild(generateTable(addressList))
          })
          toastMsg("CSV File Uploaded!")
        } else {
          toastMsg("CSV File format Invalid", true)
        }
      }
      reader.readAsText(file)
    } catch (e) {
      console.error("[Address Tagger] Import" + e)
      toastMsg("CSV File Import Failed", true)
    }
  })

  // Export
  btnExport.addEventListener("click", () => {
    chrome.storage.local.get(["addressList"], ({ addressList }) => {
      const csvString = jsonToCsv(addressList)
      const hiddenLink = document.createElement("a")
      hiddenLink.href = "data:text/csv;charset=utf-8," + encodeURI(csvString)
      hiddenLink.target = "_blank"
      hiddenLink.download = "address-list.csv"
      hiddenLink.click()
    })
  })

  // Submit
  btnSubmit.addEventListener("click", () => {
    const address = inputAddress.value.toString()
    const name = inputName.value.toString()
    const chainId = 1

    if (!address.match(addressRegex) || !name.match(nameRegex)) {
      toastMsg("Invalid Address Or Name", true)
      return
    }

    chrome.storage.local.get(["addressList"], ({ addressList }) => {
      if (!addressList) addressList = {}
      addressList[address.toLowerCase()] = { name, chainId }

      chrome.storage.local.set({ addressList: addressList }, () => {
        boxAddressList.innerHTML = ""
        boxAddressList.appendChild(generateTable(addressList))
        toastMsg("New Address Added!")
      })
    })
  })

  // Clean
  btnClean.addEventListener("click", () => {
    const result = confirm("Are you sure?")
    if (!result) return

    chrome?.storage?.local?.clear()
    boxAddressList.innerHTML = ""

    toastMsg("Address List Cleaned!")
  })

  // Checkbox auto scan
  checkboxAutoScan.addEventListener("change", () => {
    chrome.storage.local.set({ isAutoScan: checkboxAutoScan.checked }, () => {})
    toastMsg(
      checkboxAutoScan.checked ? "Enable Auto Scan" : "Disable Auto Scan"
    )
  })

  // Default display
  chrome.storage.local.get(
    ["addressList", "isAutoScan"],
    ({ addressList, isAutoScan }) => {
      try {
        if (addressList) boxAddressList.appendChild(generateTable(addressList))
        if (isAutoScan) checkboxAutoScan.checked = true
      } catch (e) {
        console.error("[Address Tagger] Display address", e)
        toastMsg("Display address error", true)
      }
    }
  )
})
