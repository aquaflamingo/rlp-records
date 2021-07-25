import React, { useEffect, useState, useCallback } from "react";
import { ethers } from "ethers";
import { useEthersJs, useHardhat } from "./useEthers";

import RLPRecord from "../contracts/RLPRecord.json"
import contractAddresses from "../contracts/contractAddresses.json"

const useContract = () => {
	 const ethersjsInstance = useEthersJs();
	 const [contract, setContract] = useState([]);

	 useEffect(() => {
			if (ethersjsInstance === null)
				 return;

	 const rlpRecordContract = new ethers.Contract(
				 contractAddresses.RLPRecord,
				 RLPRecord.abi,
				 ethersjsInstance.getSigner(0)
			 );

			setContract(rlpRecordContract)

	 }, [ethersjsInstance])

	 return contract;
}


const useMint = () => {
	 // Get RLPRecord Contract Instance
	 // Call Mint on It
	 // Return Minted NFT address

	 const contract = useContract();
	 const ethersjsInstance = useEthersJs();

	 const mintRequest = useCallback(async () => {
			console.log("Inside Mint Request")

			if (ethersjsInstance === null)
				 return;

			const fakeOwner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
			const fakeIpfsMetadataURI = "ipfs://0xdeadbeef"

			console.log("What is contract")
			console.log(contract)


			// TODO add mintToken with metadata 
			const tx = await contract.mintToken(fakeOwner, fakeIpfsMetadataURI)

        // The transaction receipt contains events emitted while processing the transaction.
        const receipt = await tx.wait()
        for (const event of receipt.events) {
            if (event.event !== 'Transfer') {
                console.log('ignoring unknown event type ', event.event)
                continue
            }
				 
					 // return nft id
            return event.args.tokenId.toString()
        }
	 }, [ethersjsInstance]);

	 return mintRequest;
};

export default useMint
