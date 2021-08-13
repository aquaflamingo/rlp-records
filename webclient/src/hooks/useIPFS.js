import { create as CreateIPFSClient } from "ipfs-http-client"
import config from "../configuration"

const IPFS_ADD_OPTIONS = {
  cidVersion: 1,
  hashAlg: 'sha2-256'
}

export const useIPFS = () => {
	 const [ipfsClient, setIPFSClient] = useState(null)

	 useEffect(()=>{
			setIPFSClient(CreateIPFSClient(config.IPFS_HTTP_API_URL))
	 }, [ipfsClient])

	 return ipfsClient;
}

export const useIPFSContentUpload = () => {
	 const ipfs = useIPFS()

	 const upload = useCallback(async (data) => {
				const ipfsPath = '/nft/' + data.basename
        const { cid: assetCid } = await ipfs.add({ path: ipfsPath, data.content }, IPFS_ADD_OPTIONS)

        // Create the NFT metadata JSON
        const assetURI = ensureIPFSPrefix(assetCid) + '/' + basename
			const metadata = {...data.metadata, uri: assetURI}

        // add the metadata to IPFS
        const { cid: metadataCid } = await ipfs.add({ path: '/nft/metadata.json', content: JSON.stringify(metadata)}, IPFS_ADD_OPTIONS)
        const metadataURI = ensureIPFSPrefix(metadataCid) + '/metadata.json'

			return {
				 metadataURI: metadataURI,
				 assetURI: assetURI
			}
	 })

	 return upload
}


const ensureIPFSPrefix = (cidOrURI) => {
    let uri = cidOrURI.toString()
    if (!uri.startsWith('ipfs://')) {
        uri = 'ipfs://' + cidOrURI
    }

    if (uri.startsWith('ipfs://ipfs/')) {
      uri = uri.replace('ipfs://ipfs/', 'ipfs://')
    }

    return uri
}
