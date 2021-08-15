export function ensureIPFSPrefix (cidOrURI) {
    let uri = cidOrURI.toString()
    if (!uri.startsWith('ipfs://')) {
        uri = 'ipfs://' + cidOrURI
    }

    if (uri.startsWith('ipfs://ipfs/')) {
      uri = uri.replace('ipfs://ipfs/', 'ipfs://')
    }

    return uri
}

export function removeIPFSPrefix(cidOrURI) {
    if (cidOrURI.startsWith('ipfs://')) {
        return cidOrURI.slice('ipfs://'.length)
    }
    return cidOrURI
}
