import { create as CreateIPFSClient } from "ipfs-http-client"
import config from "../configuration"

const useIPFS = () => {
	 const [ipfsClient, setIPFSClient] = useState(null)

	 useEffect(()=>{
			setIPFSClient(CreateIPFSClient(config.IPFS_HTTP_API_URL))
	 }, [ipfsClient])

	 return ipfsClient;
}

